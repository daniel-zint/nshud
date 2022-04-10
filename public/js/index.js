let socket = io();

let gamestate = {};
let avatars = {};   // id{url, img}

let teaminfo = {};
let maps = {};
let config = {};

// keyboard input
document.addEventListener('keydown', (e) => {
    if (e.code === "KeyS") {
        [teaminfo.team1, teaminfo.team2] = [teaminfo.team2, teaminfo.team1];
        if(teaminfo.switch_teams == "0"){
            teaminfo.switch_teams = "1";
        } else {
            teaminfo.switch_teams = "0";
        }
        updateTeaminfo();
    } else if (e.code == "KeyR") {
        window.location.reload();
    } else if (e.code == "KeyD") {
        socket.emit('print-gsi');   // tell server to print current game-state to file (for debugging)
    }
})


socket.on('csgo-gsi-update', (gs) => {
    gamestate = gs;
    // avatars
    gamestate.players.forEach(p => {
        if ((p.steam_id !== -1) && !(p.steam_id in avatars)) {
            socket.emit('send-avatar', p.steam_id);
        }
    });
    updateAllPlayerBoxes(gamestate);
    updateScoreBar(gamestate);
    updateSpectatorBox();
});

socket.on('teaminfo', (data) => {
    teaminfo = data;
    if(data.switch_teams == 1){
        [teaminfo.team1, teaminfo.team2] = [teaminfo.team2, teaminfo.team1];
    }
    updateTeaminfo();
});

socket.on('config', (data) => {
    config = data;
    if(!config.show_player_avatars){
        let a = document.getElementById("spec_avatar");
        a.innerHTML = '';
    }
});

socket.on('get-avatar', (data) => {
    if(!(data.id in avatars)){
        let id = data.id
        let spectator_avatar_url = data.url;
        let avatar_img = document.createElement("img");
        avatar_img.src = spectator_avatar_url;
        avatar_img.alt = '';
        avatars[id] = {url: spectator_avatar_url, img: avatar_img};
    }
});

socket.on("chat-msg", (data) => {
    receiveMsg(data);
});

// Print out the whole gamestate
function treeView(items) {
    let str = '';
    const is_obj = typeof (items) === "object";
    if (is_obj) {
        str += '<ul>';
        for (const key in items) {
            str += '<li>';
            str += key + ': ';
            str += treeView(items[key]);
            str += '</li>';
        }
        str += '</ul>';
    } else {
        str += JSON.stringify(items, null, 2);
    }
    return str;
}