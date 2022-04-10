function updateSpectatorBox() {
    if (gamestate === undefined) {
        return;
    }

    const id = gamestate.observed_player;

    const p = gamestate.players[id];

    if(p === undefined){
        return;
    }

    let name = $("#spec_name");
    name.html(`${p.observer_slot}| ${p.name}`);


    $("#spec_health").empty();
    if ('health' in p.state) {
        let health_img = getIcon("health");
        health_img.style.height = '0.7em';
        $("#spec_health").append(health_img).appendText(` ${p.state.health}`);
    }

    if ('kills' in p.match_stats) {
        $(`#spec_kills`).html(`${p.match_stats.kills}`);
        $(`#spec_deaths`).html(`${p.match_stats.deaths}`);
        $(`#spec_assists`).html(`${p.match_stats.assists}`);
    } else {
        $(`#spec_kills`).html(`?`);
        $(`#spec_deaths`).html(`?`);
        $(`#spec_assists`).html(`?`);
    }

    $('#spec_round_kills').empty();
    if ('round_kills' in p.state && p.state.round_kills > 0) {
        $('#spec_round_kills').append(getIcon('skull'));
        $('#spec_round_kills').appendText(` ${p.state.round_kills}`);
    }

    if (p.state.health === 0) {
        return;
    }

    let kevlar_img;
    let kevlar_str = '';
    if ('armor' in p.state) {
        if (p.state.armor > 0) {
            if (p.state.helmet) {
                kevlar_img = getIcon("kevlar_helmet");
            } else {
                kevlar_img = getIcon("kevlar");
            }
            kevlar_str = ` ${p.state.armor}`;
        } else {
            kevlar_img = document.createTextNode(" ");
        }
    } else {
        kevlar_img = document.createTextNode("?");
    }
    $('#spec_kevlar').empty();
    $('#spec_kevlar').append(kevlar_img);
    $('#spec_kevlar').appendText(kevlar_str);
    // c4 and defuse kit

    $('#spec_defuse_bomb').empty();
    if ("weapon_c4" in p) {
        $('#spec_defuse_bomb').append(getIcon("c4"));
    } else if (p.state.defusekit) {
        $('#spec_defuse_bomb').append(getIcon("kit"));
    }

    // weapons //
    $('#spec_ammo').empty();
    if (p.weapon_primary.state === "active") {
        let a = p.weapon_primary.ammo_clip;
        let b = p.weapon_primary.ammo_reserve;
        $('#spec_ammo').html(`${a}/${b}`);
    } else if (p.weapon_secondary.state === "active") {
        let a = p.weapon_secondary.ammo_clip;
        let b = p.weapon_secondary.ammo_reserve;
        $('#spec_ammo').html(`${a}/${b}`);
    }

    // nades
    for(let i = 0; i < 4; ++i){
        $(`#spec_n${i}`).empty();
    }
    p.weapon_grenades.forEach((w, i) => {
        let nade_img = getIcon(w.name);
        if (w.state === "holstered") {
            nade_img.style.filter = 'brightness(0.8)';
        }
        $(`#spec_n${i}`).append(nade_img);
    });

    if (p.team === "T") {
        $('#spec_row_one').css("background", `linear-gradient(30deg, ${colors.t} 50%, rgba(0,0,0,1) 130%`);
    } else {
        $('#spec_row_one').css("background", `linear-gradient(30deg, ${colors.ct} 50%, rgba(0,0,0,1) 130%`);
    }

    if(config.show_player_avatars){
        // avatar is taken from steam api
        const steamid = gamestate.observed_player_steamid;
        if (steamid in avatars) {
            $("#spec_avatar").empty().append(avatars[steamid].img);
        }
        $('#spectator_box').css("grid-template-columns", "var(--spectate-avatar-size) 1fr");
    } else {
        $('#spectator_box').css("grid-template-columns", "0em 1fr");
    }

}