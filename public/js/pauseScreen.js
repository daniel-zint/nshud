let socket = io();

let gameState = {};
let teamInfo = {};
let config = {};

socket.on('csgo-gsi-update', (gs) => {
    gameState = gs;
    //updateScore();
});

socket.on('teaminfo', (data) => {
    teamInfo = data;
    if (data.switch_teams == 1) {
        [teamInfo.team1, teamInfo.team2] = [teamInfo.team2, teamInfo.team1];
    }
    updateScore();
});

socket.on('config', (data) => {
    config = data;
});

socket.on("chat-msg", (data) => {
    //receiveMsg(data);
});

let addMap = (map) => {
    const maps = $("#maps");

    const s1 = $("<div></div>").addClass("score right");
    const name = $("<div></div>").addClass("map-name");
    const s2 = $("<div></div>").addClass("score left");

    name.html(getSafe(() => map.name, '-'));

    const score = getSafe(() => map.score, '-');

    // divide string at colon
    const scores = score.split(":");

    if(scores.length != 2){
        s1.html("-");
        s2.html("-");
    } else {
        s1.html(scores[0]);
        s2.html(scores[1]);
        if(Number(scores[0]) > Number(scores[1])){
            s1.addClass("win");
            s2.addClass("loose");
        } else{
            s1.addClass("loose");
            s2.addClass("win");
        }
    }

    maps.append(s1);
    maps.append(name);
    maps.append(s2);
}

let updateScore = () => {

    $("#team_name_left").html(getSafe(() => teamInfo.team1.name, 'Team 1'));
    $("#team_name_right").html(getSafe(() => teamInfo.team2.name, 'Team 2'));
    $("#team_left_avatar").html(
        $("<img></img>")
            .prop('src', config.show_team_avatars ? getSafe(() => teamInfo.team1.avatar, '') : '')
            .prop('alt', '')
    );

    $("#team_right_avatar").html(
        $("<img></img>")
            .prop('src', config.show_team_avatars ? getSafe(() => teamInfo.team2.avatar, '') : '')
            .prop('alt', '')
    );

    $("#maps").empty();
    for (let i = 0; i < 8; ++i) {
        if (i in teamInfo.maps) {
            addMap(teamInfo.maps[i]);
        }
    }
};