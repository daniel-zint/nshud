function updateSpectatorBox() {
    if (gamestate === undefined) {
        return;
    }

    const id = gamestate.observed_player;

    const p = gamestate.players[id];

    if(p === undefined){
        return;
    }

    let name = document.getElementById("spec_name");
    name.innerHTML = `${p.observer_slot}| ${p.name}`;


    let td_health = document.getElementById("spec_health");
    if ('health' in p.state) {
        td_health.innerHTML = '';
        let health_img = getIcon("health");
        health_img.style.height = '0.7em';
        td_health.appendChild(health_img);
        td_health.appendChild(document.createTextNode(` ${p.state.health}`));
    } else {
        td_health.innerHTML = '';
    }

    let td_kevlar = document.getElementById(`spec_kevlar`);
    td_kevlar.innerHTML = "";
    let kills = document.getElementById(`spec_kills`);
    kills.innerHTML = "";
    let deaths = document.getElementById(`spec_deaths`);
    deaths.innerHTML = "";
    let assists = document.getElementById(`spec_assists`);
    assists.innerHTML = "";
    let nades = [];
    for (let i = 0; i < 4; ++i) {
        nades[i] = document.getElementById(`spec_n${i}`);
        nades[i].innerHTML = "";
    }

    if ('kills' in p.match_stats) {
        kills.innerHTML = `${p.match_stats.kills}`;
        deaths.innerHTML = `${p.match_stats.deaths}`;
        assists.innerHTML = `${p.match_stats.assists}`;
    } else {
        kills.innerHTML = `?`;
        deaths.innerHTML = `?`;
        assists.innerHTML = `?`;
    }

    let rk = document.getElementById(`spec_round_kills`);
    rk.innerHTML = '';
    if ('round_kills' in p.state && p.state.round_kills > 0) {
        rk.appendChild(getIcon('skull'));
        rk.appendChild(document.createTextNode(` ${p.state.round_kills}`));
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
    td_kevlar.appendChild(kevlar_img);
    td_kevlar.appendChild(document.createTextNode(kevlar_str));
    // c4 and defuse kit

    let defuse_bomb = document.getElementById("spec_defuse_bomb");
    defuse_bomb.innerHTML = "";
    if ("weapon_c4" in p) {
        defuse_bomb.appendChild(getIcon("c4"));
    } else if (p.state.defusekit) {
        defuse_bomb.appendChild(getIcon("kit"));
    }

    // weapons //
    let ammo = document.getElementById("spec_ammo");
    ammo.innerHTML = '';
    if (p.weapon_primary.state === "active") {
        let a = p.weapon_primary.ammo_clip;
        let b = p.weapon_primary.ammo_reserve;
        ammo.innerHTML = `${a}/${b}`;
    } else if (p.weapon_secondary.state === "active") {
        let a = p.weapon_secondary.ammo_clip;
        let b = p.weapon_secondary.ammo_reserve;
        ammo.innerHTML = `${a}/${b}`;
    }

    // nades
    p.weapon_grenades.forEach((w, i) => {
        let nade_img = getIcon(w.name);
        if (w.state === "holstered") {
            nade_img.style.filter = 'brightness(0.8)';
        }
        nades[i].appendChild(nade_img);
    });

    let row1 = document.getElementById("spec_row_one");
    if (p.team === "T") {
        row1.style.background = `linear-gradient(30deg, ${colors.t} 50%, rgba(0,0,0,1) 130%`;
    } else {
        row1.style.background = `linear-gradient(30deg, ${colors.ct} 50%, rgba(0,0,0,1) 130%`;
    }

    if(config.show_player_avatars){
        // avatar is taken from steam api
        const steamid = gamestate.observed_player_steamid;
        if (steamid in avatars) {
            let avatar = document.getElementById("spec_avatar");
            avatar.innerHTML = "";
            avatar.appendChild(avatars[steamid].img);
        }
        let spectator_box = document.getElementById("spectator_box");
        spectator_box.style["grid-template-columns"] = "var(--spectate-avatar-size) 1fr";
    } else {
        let spectator_box = document.getElementById("spectator_box");
        spectator_box.style["grid-template-columns"] = "0em 1fr";
    }

}