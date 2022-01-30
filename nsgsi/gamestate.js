const Player = require('./player.js');



const ROUND_WIN_TYPES = {
    "t_win_elimination": 0,
    "t_win_bomb": 1,
    "ct_win_elimination": 2,
    "ct_win_defuse": 3
    // ct_win_time is missing
};

class GameState {
    constructor() {
        this.raw = {};  // raw gsi data from game

        this.map = "";
        this.round = 0;
        this.team_ct = {
            score: 0,
            consecutive_round_losses: 0,
            timeouts_remaining: 0,
            matches_won_this_series: 0
        };
        this.team_t = {
            score: 0,
            consecutive_round_losses: 0,
            timeouts_remaining: 0,
            matches_won_this_series: 0
        };
        this.round_wins = [];
        this.phase_countdowns = {};
        this.players = [];
        for (let i = 0; i < 10; ++i) {
            this.players.push(new Player(i));
        }
        this.bomb = {};
    }

    update(gsi) {
        if (typeof (gsi) !== "object") {
            console.log(`game state integration object (gsi) is not correctly formatted\ngsi=${gsi}`);
            return;
        }
        this.raw = gsi;

        this.round_wins = [];
        if ("map" in gsi) {
            this.map = gsi.map.name;
            this.round = gsi.map.round;
            this.team_ct = gsi.map.team_ct;
            this.team_t = gsi.map.team_t;
            for (const k in gsi.map.round_wins) {
                this.round_wins.push(ROUND_WIN_TYPES[gsi.map.round_wins[k]]);
            }
        }
        if ("phase_countdowns" in gsi) {
            this.phase_countdowns = gsi.phase_countdowns;
        }
        if ("allplayers" in gsi) {
            for (const k in gsi.allplayers) {
                if (!("observer_slot" in gsi.allplayers[k])) {
                    continue;
                }
                if (gsi.allplayers[k].observer_slot < 0 || gsi.allplayers[k].observer_slot > 9) {
                    continue;
                }
                this.players[gsi.allplayers[k].observer_slot].update(k, gsi.allplayers[k]);
            }
        }
        if ("player" in gsi) {
            // TODO add observer_slot of spectated player to gamestate
            this.observed_player = gsi.player.observer_slot;
            this.observed_player_steamid = gsi.player.steamid;
        }
        if ("bomb" in gsi) {
            this.bomb = gsi.bomb;
        }
    }
}

module.exports = new GameState;