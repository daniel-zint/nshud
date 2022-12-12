function updateTeamInfo() {
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

    // update maps
    if (teamInfo.maps !== undefined && config.show_team_avatars) {
        let avatar1 = getSafe(() => teamInfo.team1.avatar, '');
        let avatar2 = getSafe(() => teamInfo.team2.avatar, '');
        if (teamInfo.switch_teams == "1") {
            [avatar1, avatar2] = [avatar2, avatar1];
        }

        const maps_table = $("#maps")
            .html("<th>MAP</th><th>PICK</th><th>WIN</th><th>SCORE</th>");
        for (let i = 0; i < 8; ++i) {
            if (i in teamInfo.maps) {
                const m = teamInfo.maps[i];
                let tr = $("<tr></tr>")
                    .append($("<td></td>")
                        .text(m.name));
                // pick
                let td_pick = $("<td></td>");
                let img_pick = $("<img></img>");
                img_pick.prop('alt', '');
                if (m.pick === "1") {
                    img_pick.prop('src', avatar1);
                    td_pick.append(img_pick);
                } else if (m.pick === "2") {
                    img_pick.prop('src', avatar2);
                    td_pick.append(img_pick);
                } else {
                    td_pick.html(m.pick);
                }
                // win
                tr.append(td_pick);
                let td_win = $("<td></td>");
                let img_win = $("<img></img>");
                img_win.prop('alt', '');
                if (m.win === "1") {
                    img_win.prop('src', avatar1);
                    td_win.append(img_win);
                } else if (m.win === "2") {
                    img_win.prop('src', avatar2);
                    td_win.append(img_win);
                } else {
                    td_win.text(m.win);
                }
                tr.append(td_win);
                // score
                tr.append($("<td></td>").appendText(m.score));
                maps_table.append(tr);
            }
        }


    } else {
        $('.map-win').css('visibility', 'hidden');
    }
}

function updateScoreBar(data) {

    if (data === undefined) {
        return;
    }

    if (!(('phase' in data.phase_countdowns) && ('phase_ends_in' in data.phase_countdowns))) {
        $("#score_team_left").html('');
        $("#score_team_right").html('');
    }

    // score
    if (data.players[1].team === "CT") {
        $("#score_team_left")
            .html(data.team_ct.score)
            .removeClass().addClass('color_ct');
        $("#score_team_right")
            .html(data.team_t.score)
            .removeClass().addClass('color_t');
    } else {
        $("#score_team_left")
            .html(data.team_t.score)
            .removeClass().addClass('color_t');
        $("#score_team_right")
            .html(data.team_ct.score)
            .removeClass().addClass('color_ct');
    }

    // map win dots
    for (let i = 1; i < 3; ++i) {
        if (i in teamInfo.maps) {
            const m = teamInfo.maps[i];
            if (m.win === "1") {
                $(`#team_left_map_${i}`).find('.dot-win').removeClass()
                    .addClass('dot-win')
                    .addClass(data?.players[1]?.team === "CT" ? "color_ct" : "color_t");
            } else {
                $(`#team_left_map_${i}`).find('.dot-win').removeClass()
                    .addClass('dot-win color_white');
            }
            if (m.win === "2") {
                $(`#team_right_map_${i}`).find('.dot-win').removeClass()
                    .addClass('dot-win')
                    .addClass(data?.players[3]?.team === "CT" ? "color_ct" : "color_t");
            } else {
                $(`#team_right_map_${i}`).find('.dot-win').removeClass()
                    .addClass('dot-win color_white');
            }
        }
    }

    const timeSeconds = Math.ceil(data.phase_countdowns.phase_ends_in);
    if (timeSeconds !== roundTimer.time && data.phase_countdowns.phase !== 'defuse') {
        roundTimer.start(timeSeconds)
    }

    // defuse
    if (getSafe(() => data.bomb.state) === 'defusing' && data.bomb.countdown != undefined) {
        const time_perc = data.bomb.countdown * 10; // this is 100 for a 10 seconds defuse
        $('#defuse')
            .html(`${data.bomb.countdown}`)
            .css('background', `linear-gradient(270deg, ${colors.background_default} ${time_perc}%, ${colors.round_defuse_background} ${time_perc}%`);
    } else {
        $('#defuse')
            .html('')
            .css('background', '');
    }

    // round wins
    if (data.phase_countdowns.phase === "freezetime" && data.team_ct.score + data.team_t.score < 16) {
        for (const [key, value] of Object.entries(data.round_wins)) {
            $(`#round_wins_${key}`).find('span').css('background-color', value[0] === 't' ? colors.t : colors.ct);
        }
        $("#round_wins").removeClass().addClass('visible');
    } else {
        $("#round_wins").removeClass().addClass('invisible');
    }

    // show maps in freezetime
    $("#maps").css('top', data.phase_countdowns.phase === "freezetime" ? '0' : '-40em');
}