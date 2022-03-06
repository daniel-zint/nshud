function updateTeaminfo() {
    document.getElementById("team_name_left").innerHTML = getSafe(() => teaminfo.team1.name, 'Team 1');
    document.getElementById("team_name_right").innerHTML = getSafe(() => teaminfo.team2.name, 'Team 2');
    let avatar1 = document.getElementById("team_left_avatar");
    avatar1.innerHTML = "";
    let avatar1_img = document.createElement("img");
    if (config.show_team_avatars) {
        let avatar1_file = getSafe(() => teaminfo.team1.avatar, '');
        avatar1_img.src = avatar1_file;
    } else {
        avatar1_img.src = '';
    }
    avatar1_img.alt = '';
    avatar1.appendChild(avatar1_img);

    let avatar2 = document.getElementById("team_right_avatar");
    avatar2.innerHTML = "";
    let avatar2_img = document.createElement("img");
    if (config.show_team_avatars) {
        let avatar2_file = getSafe(() => teaminfo.team2.avatar, '');
        avatar2_img.src = avatar2_file;
    } else {
        avatar2_img.src = '';
    }
    avatar2_img.alt = '';
    avatar2.appendChild(avatar2_img);

    // update maps
    if (teaminfo.maps !== undefined && config.show_team_avatars) {
        const maps_table = document.getElementById("maps");
        maps_table.innerHTML = "<th>MAP</th><th>PICK</th><th>WIN</th>";
        //maps_table.innerHTML = '';
        for (let i = 0; i < 7; ++i) {
            if (i in teaminfo.maps) {
                const m = teaminfo.maps[i];
                // new tr
                let tr = document.createElement("tr");
                let td_mn = document.createElement("td");
                td_mn.innerHTML = m.name;
                tr.appendChild(td_mn);
                let td_pick = document.createElement("td");
                let img_pick = document.createElement("img");
                img_pick.alt = '';
                if (m.pick === "1") {
                    if(teaminfo.switch_teams == "1"){
                        img_pick.src = getSafe(() => teaminfo.team2.avatar, '');
                    } else {
                        img_pick.src = getSafe(() => teaminfo.team1.avatar, '');
                    }
                    td_pick.appendChild(img_pick);
                } else if (m.pick === "2") {
                    if(teaminfo.switch_teams == "1"){
                        img_pick.src = getSafe(() => teaminfo.team1.avatar, '');
                    } else {
                        img_pick.src = getSafe(() => teaminfo.team2.avatar, '');
                    }
                    td_pick.appendChild(img_pick);
                } else {
                    td_pick.innerHTML = m.pick;
                }
                tr.appendChild(td_pick);
                let td_win = document.createElement("td");
                let img_win = document.createElement("img");
                img_win.alt = '';
                if (m.win === "1") {
                    if(teaminfo.switch_teams == "1"){
                        img_win.src = getSafe(() => teaminfo.team2.avatar, '');
                    } else {
                        img_win.src = getSafe(() => teaminfo.team1.avatar, '');
                    }
                    td_win.appendChild(img_win);
                } else if (m.win === "2") {
                    if(teaminfo.switch_teams == "1"){
                        img_win.src = getSafe(() => teaminfo.team1.avatar, '');
                    } else {
                        img_win.src = getSafe(() => teaminfo.team2.avatar, '');
                    }
                    td_win.appendChild(img_win);
                } else {
                    td_win.innerHTML = m.win;
                }
                tr.appendChild(td_win);
                maps_table.appendChild(tr);
            }
        }

    }
}

function updateScoreBar(data) {

    if (data === undefined) {
        return;
    }

    const scoreLeft = document.getElementById("score_team_left");
    const scoreRight = document.getElementById("score_team_right");
    //const time = document.getElementById("time");

    if (!(('phase' in data.phase_countdowns) && ('phase_ends_in' in data.phase_countdowns))) {
        scoreLeft.innerHTML = '';
        scoreRight.innerHTML = '';
    }

    // score
    if (data.players[1].team === "CT") {
        scoreLeft.innerHTML = data.team_ct.score;
        scoreLeft.className = 'color_ct';
        scoreRight.innerHTML = data.team_t.score;
        scoreRight.className = 'color_t';
    } else {
        scoreLeft.innerHTML = data.team_t.score;
        scoreLeft.className = 'color_t';
        scoreRight.innerHTML = data.team_ct.score;
        scoreRight.className = 'color_ct';
    }

    const time = data.phase_countdowns.phase_ends_in;
    const timeSeconds = Math.ceil(time);
    //const timeTimeout = Math.round(Math.abs(timeSeconds - time) * 1000); // time to the next full second in milliseconds
    if (timeSeconds !== roundTimer.time && data.phase_countdowns.phase !== 'defuse') {
        //console.log(`update time from ${roundTimer.time} to ${time}. Timeout: ${timeTimeout}`);
        //setTimeout(() => roundTimer.start(timeSeconds), timeTimeout);
        roundTimer.start(timeSeconds)
    }

    // show game phase (for debugging)
    //document.getElementById('HelloWorld').innerHTML = data.phase_countdowns.phase;
    let def = document.getElementById('defuse');
    if (getSafe(() => data.bomb.state) === 'defusing' && data.bomb.countdown != undefined) {
        def.innerHTML = `${data.bomb.countdown}`;
        const time_perc = data.bomb.countdown * 10; // this is 100 for a 10 seconds defuse
        def.style.background = `linear-gradient(270deg, ${colors.background_default} ${time_perc}%, ${colors.round_defuse_background} ${time_perc}%`;
    } else {
        def.innerHTML = '';
        def.style = '';
    }

    //document.getElementById('HelloWorld').innerHTML = data.phase_countdowns.phase;

    // show maps in freezetime
    const maps_table = document.getElementById("maps");
    if (data.phase_countdowns.phase === "freezetime") {
        maps_table.style.top = "0";
    } else {
        maps_table.style.top = "-40em";
    }
}