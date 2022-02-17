'use strict'

const { Telnet } = require('telnet-client');

const params = {
    host: '127.0.0.1',
    port: 2121,
    negotiationMandatory: false,
    execTimeout: 0,
    timeout: 2 * 60 * 60 * 1000   // 2 hours until timeout
}

class CsgoConsole extends Telnet {
    constructor() {
        super(params);

        this.on('timeout', () => {
            console.log('Telnet connection timeout');
            this.end();
        })

        this.on('close', () => {
            console.log('Telnet connection closed');
        })

        this.connect(params)
            .then(() => {
                console.log("Telnet connection successful.");
                this.emit('connection-success');
            })
            .catch((err) => {
                console.log("Cannot connect via telnet. Maybe CS:GO launch options are wrong or game is not running.");
                //console.log(`Error: ${err}`);
                this.end();
                this.emit('connection-fail');
            });

        this.on("data", function (data) {
            let arr = []
            data.forEach(e => {
                arr.push(e);
            });
            let nameEnd = -1;
            let messageIdx = -1;
            for (let i = 0; i < arr.length - 8; ++i) {
                if (arr[i] == 226 &&
                    arr[i + 1] == 128 &&
                    arr[i + 2] == 142 &&
                    arr[i + 3] == 32 &&
                    arr[i + 4] == 58 &&
                    arr[i + 5] == 32) {
                    nameEnd = i;
                    messageIdx = i + 6;
                    break;
                }
            }
            if (messageIdx > 0) {
                const str = data.toString();
                const name = str.substring(0, nameEnd);
                let message = '';
                for (let i = messageIdx; i < arr.length - 2; ++i) {
                    message += String.fromCharCode(arr[i]);
                }
                //console.log(name);
                //console.log(message);
                this.emit('chat-msg', { 'name': name, 'msg': message });
            }

        });
    }

    reconnect(){
        this.connect(params)
            .then(() => {
                console.log("Telnet connection successful.");
                this.emit('connection-success');
            })
            .catch((err) => {
                console.log("Cannot connect via telnet. Maybe CS:GO launch options are wrong.");
                //console.log(`Error: ${err}`);
                this.end();
                this.emit('connection-fail');
            });
    }
}

module.exports = CsgoConsole;