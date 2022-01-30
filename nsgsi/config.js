const fs = require('fs');

class Config {
    constructor(configFile) {
        try {
            const f = fs.readFileSync(configFile);
            const c = JSON.parse(f);

            this.team_info = c.team_info;
            this.show_team_avatars = c.show_team_avatars;
            this.show_player_avatars = c.show_player_avatars;
            this.steam_api_key = c.steam_api_key;
        } catch (error) {
            console.error("ERROR: Cannot read config file. Using default config settings.");

            this.team_info = 'teaminfo.json';
            this.show_team_avatars = false;
            this.show_player_avatars = false;
            this.steam_api_key = '';
        }

    }
}

module.exports = (configFile) => { return new Config(configFile) };