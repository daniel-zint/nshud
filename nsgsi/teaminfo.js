const fs = require('fs');

class TeamInfo {
    constructor(teamInfoFile) {
        try {
            const f = fs.readFileSync(teamInfoFile);
            const c = JSON.parse(f);

            this.team1 = c.team1;
            this.team2 = c.team2;
            this.maps = c.maps;
        } catch (error) {
            console.error("ERROR: Cannot read team info file.");

            this.team1 = { "name": '', "avatar": '' };
            this.team2 = { "name": '', "avatar": '' };
            this.maps = {};
        }
        //console.log(this);
    }
}

module.exports = (teamInfoFile) => { return new TeamInfo(teamInfoFile) };