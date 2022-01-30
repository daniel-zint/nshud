const request = require('request');

class Player {
    constructor(observer_slot) {
        this.steam_id = -1;
        this.observer_slot = observer_slot;
        this.name = `player ${observer_slot}`;
        this.team = "";
        this.state = {};

        this.match_stats = {};

        this.weapon_primary = {};
        this.weapon_secondary = {};
        this.weapon_grenades = [];
    }

    update(steam_id, data) {
        this.steam_id = steam_id;
        this.name = data.name;
        this.observer_slot = data.observer_slot;
        this.team = data.team;
        this.state = data.state;
        delete this.state.burning;
        delete this.state.round_totaldmg;

        this.match_stats = data.match_stats;
        delete this.match_stats.mvps;
        delete this.match_stats.score;

        this.weapon_primary = { name: "" };
        this.weapon_secondary = { name: "" };
        this.weapon_grenades = [];
        delete this.weapon_taser;
        delete this.weapon_c4;
        for (const k in data.weapons) {
            let w = data.weapons[k];
            delete w.paintkit;
            if (w.type === "Pistol") {
                this.weapon_secondary = w;
            } else if (w.type === "C4") {
                this.weapon_c4 = w;
            } else if (w.type === "Grenade") {
                switch (w.name) {
                    case "weapon_flashbang":
                        w.id = 1;
                        break;
                    case "weapon_smokegrenade":
                        w.id = 2;
                        break;
                    case "weapon_molotov":
                        w.id = 3;
                        break;
                    case "weapon_incgrenade":
                        w.id = 4;
                        break;
                    case "weapon_hegrenade":
                        w.id = 5;
                        break;
                    case "weapon_decoy":
                        w.id = 6;
                        break;
                    default:
                        break;
                }
                this.weapon_grenades.push(w);
                if (w.ammo_reserve === 2) {
                    this.weapon_grenades.push(w);
                }
            } else if (w.type == "Knife") {

            } else if (w.name === 'weapon_taser') {
                this.weapon_taser = w;
            } else {
                this.weapon_primary = w;
            }
        }

        this.weapon_grenades.sort((a, b) => { return a.id - b.id; });
    }
}

module.exports = Player;