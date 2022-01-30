const express = require('express');
const app = express();
const http = require('http');
const server = require('http').Server(app);
const io = require('socket.io')(server);
const fs = require('fs');
const request = require('request');
const favicon = require('serve-favicon');

app.use(express.static('public'));
app.use(favicon('favicon.ico'));

const config = require('./nsgsi/config.js')('config.json');
const teaminfo = require('./nsgsi/teaminfo.js')(config.team_info);

let gamestate = require('./nsgsi/gamestate.js');


const hudport = process.env.PORT || 8000;
const csgoport = 3001;



const dummydataFile = fs.readFileSync('debug/dummy.json');
const dummydata = JSON.parse(dummydataFile);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');

    // write raw game state (as received by game) to a file in folder 'debug'
    socket.on('print-gsi', () => {
        console.log(gamestate.raw);
        const data = JSON.stringify(gamestate.raw);
        if (!fs.existsSync('./debug')) {
            fs.mkdirSync('./debug');
        }
        fs.writeFileSync(`debug/gamestate_${Date.now()}.json`, data);
    });

    socket.on('send-avatar', steamid =>{
        if(!("steam_api_key" in config)){
            return;
        }
        let url = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${config.steam_api_key}&steamids=${steamid}`;
        request.get(url, function(error, steamHttpResponse, steamHttpBody) {
            try {
                let info = JSON.parse(steamHttpBody);
                let avatar_url = info.response.players['0'].avatarfull;
                io.emit('get-avatar', {id: steamid, url: avatar_url});
            } catch (error) {
                console.error(`Error in reading avatar url from steam api. Error: ${error}`);
            }
        });
    })

    io.emit('config', config);
    io.emit('teaminfo', teaminfo);

    //gamestate.update(dummydata, config);
    //io.emit('dummy-update', gamestate);
});


server.listen(hudport, () => {
    console.log(`Socket.IO server running at http://localhost:${hudport}/`);
});


http.createServer(function (req, res) {

    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();
    // prints date & time in YYYY-MM-DD HH:MM:SS format
    //console.log('Receiving data: ' + year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);
    if (req.method == 'POST') {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });

        var body = '';
        req.on('data', function (data) {
            body += data;
        });
        req.on('end', function () {
            gamestate.update(JSON.parse(body), config);
            io.emit("csgo-gsi-update", gamestate);
            res.end('');
        });

    } else {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        var html = 'yes';
        res.end(html);
    }

}).listen(csgoport);