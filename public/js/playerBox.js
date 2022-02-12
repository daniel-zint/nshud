function addPlayerBoxList(observer_slot, right2left = false) {
    let id_playerBox = `player_box_${observer_slot}`;

    if (document.getElementById(id_playerBox)) {
        console.error(`Player box for observer slot ${id_playerBox} already exists`);
        return;
    }

    let li = document.createElement("li");
    let table = document.createElement("table");
    table.id = id_playerBox;
    li.appendChild(table);

    let tr1 = table.insertRow();
    tr1.id = `player_${observer_slot}_tr1`;
    let tr2 = table.insertRow();
    tr2.id = `player_${observer_slot}_tr2`;

    //let td_avatar;
    let td_health, td_player_name, td_primary_weapon;
    let td_kevlar, td_money, td_kda, td_others;
    if (right2left) {
        // 1st row
        td_primary_weapon = tr1.insertCell();
        td_player_name = tr1.insertCell();
        td_health = tr1.insertCell()

        // 2nd row
        td_others = tr2.insertCell();
        td_kda = tr2.insertCell();
        td_money = tr2.insertCell();
        td_kevlar = tr2.insertCell();
    } else {
        // 1st row

        td_health = tr1.insertCell()
        td_player_name = tr1.insertCell();
        td_primary_weapon = tr1.insertCell();

        // 2nd row
        td_kevlar = tr2.insertCell();
        td_money = tr2.insertCell();
        td_kda = tr2.insertCell();
        td_others = tr2.insertCell();
    }

    td_health.id = `health_${observer_slot}`;
    td_health.appendChild(document.createTextNode(''));

    td_player_name.id = `player_name_${observer_slot}`;
    td_player_name.setAttribute('colSpan', '2');
    td_player_name.appendChild(document.createTextNode(''));

    td_primary_weapon.id = `primary_weapon_${observer_slot}`;
    td_kevlar.id = `kevlar_${observer_slot}`;
    td_money.id = `money_${observer_slot}`;
    td_kda.id = `kda_${observer_slot}`;

    let others_list = document.createElement("ul");
    if (right2left) {
        others_list.style = "list-style-type:arabic-indic;padding: 0;direction:RTL";
    } else {
        others_list.style = "list-style-type: none;padding: 0;";
    }
    others_list.id = `other_weapons_${observer_slot}`;
    td_others.appendChild(others_list);

    return li;
}

function addPlayerBox(observer_slot, right2left = false) {
    let id_playerBox = `player_box_${observer_slot}`;

    if (document.getElementById(id_playerBox)) {
        console.error(`Player box for observer slot ${id_playerBox} already exists`);
        return;
    }

    let li = document.createElement("li");
    let container = document.createElement("div");
    container.className = "player-container";
    li.appendChild(container);

    let avatar = document.createElement("div");
    avatar.className = "avatar";
    container.appendChild(avatar);

    let row1_background = document.createElement("div");
    row1_background.className = "row1-background";
    row1_background.id = `row1_background_${observer_slot}`;
    container.appendChild(row1_background);
    let row1_teamcolor = document.createElement("div");
    row1_teamcolor.className = "row1-teamcolor";
    row1_teamcolor.id = `row1_teamcolor_${observer_slot}`;
    row1_background.appendChild(row1_teamcolor);
    let row1_red = document.createElement("div");
    row1_red.className = "row1-red";
    row1_red.id = `row1_red_${observer_slot}`;
    row1_background.appendChild(row1_red);

    let row1 = document.createElement("div");
    row1.className = "player-container-row one";
    row1.id = `player_${observer_slot}_tr1`;
    row1_background.appendChild(row1);

    let row2 = document.createElement("div");
    row2.className = "player-container-row two";
    row2.id = `player_${observer_slot}_tr2`;
    container.appendChild(row2);

    let health = document.createElement("div");
    health.className = "health";
    health.id = `health_${observer_slot}`;
    let player_name = document.createElement("div");
    player_name.className = "player-name";
    player_name.id = `player_name_${observer_slot}`;
    let player_id = document.createElement("div");
    player_id.className = "player-id";
    player_id.id = `player_id_${observer_slot}`;
    let round_kills = document.createElement("div");
    round_kills.className = "round-kills"
    round_kills.id = `round_kills_${observer_slot}`;
    let primary = document.createElement("div");
    primary.className = "primary";
    primary.id = `primary_weapon_${observer_slot}`;

    let armor_bomb_kit = document.createElement("div");
    armor_bomb_kit.className = "armor-bomb-kit";
    armor_bomb_kit.id = `kevlar_${observer_slot}`;

    let money_container = document.createElement("div");
    money_container.className = "money-container";
    let dollar = document.createElement("div");
    dollar.className = "dollar";
    dollar.innerHTML = "$";
    money_container.appendChild(dollar);
    let money = document.createElement("div");
    money.className = "money";
    money.id = `money_${observer_slot}`;
    money_container.appendChild(money);

    // kills / deaths
    let kd_container = document.createElement("div");
    kd_container.className = "kd-container";
    let K = document.createElement("div");
    K.className = "K";
    K.innerHTML = "K";
    kd_container.appendChild(K);
    let kills = document.createElement("div");
    kills.className = "kills";
    kills.id = `kills_${observer_slot}`;
    kd_container.appendChild(kills);
    let D = document.createElement("div");
    D.className = "D";
    D.innerHTML = "D";
    kd_container.appendChild(D);
    let deaths = document.createElement("div");
    deaths.className = "deaths";
    deaths.id = `deaths_${observer_slot}`;
    kd_container.appendChild(deaths);
    let taser = document.createElement("div");
    taser.className = "taser";
    taser.id = `taser_${observer_slot}`;

    let nade_container = document.createElement("div");
    nade_container.className = "nade-container";

    let n0 = document.createElement("div");
    n0.className = "nade";
    n0.id = `n0_${observer_slot}`;
    nade_container.appendChild(n0);
    let n1 = document.createElement("div");
    n1.className = "nade";
    n1.id = `n1_${observer_slot}`;
    nade_container.appendChild(n1);
    let n2 = document.createElement("div");
    n2.className = "nade";
    n2.id = `n2_${observer_slot}`;
    nade_container.appendChild(n2);
    let n3 = document.createElement("div");
    n3.className = "nade";
    n3.id = `n3_${observer_slot}`;
    nade_container.appendChild(n3);
    let secondary = document.createElement("div");
    secondary.className = "secondary";
    secondary.id = `secondary_${observer_slot}`;

    if (right2left) {
        // 1st row
        row1.appendChild(primary);
        row1.appendChild(round_kills);
        row1.appendChild(player_name);
        row1.appendChild(player_id);
        row1.appendChild(health);

        // 2nd row
        row2.appendChild(secondary);
        row2.appendChild(nade_container);
        row2.appendChild(taser);
        row2.appendChild(kd_container);
        row2.appendChild(money_container);
        row2.appendChild(armor_bomb_kit);
    } else {
        // 1st row
        row1.appendChild(health);
        row1.appendChild(player_id);
        row1.appendChild(player_name);
        row1.appendChild(round_kills);
        row1.appendChild(primary);

        // 2nd row
        row2.appendChild(armor_bomb_kit);
        row2.appendChild(money_container);
        row2.appendChild(kd_container);
        row2.appendChild(taser);
        row2.appendChild(nade_container);
        row2.appendChild(secondary);
    }

    return li;
}

function addAllPlayerBoxes() {
    // init player boxes
    document.getElementById("team_left").innerHTML = "";
    document.getElementById("team_right").innerHTML = "";

    for (let i = 1; i < 6; ++i) {
        document.getElementById("team_left").appendChild(addPlayerBox(i, false));
    }
    for (let i = 6; i < 10; ++i) {
        document.getElementById("team_right").appendChild(addPlayerBox(i, true));
    }
    document.getElementById("team_right").appendChild(addPlayerBox(0, true));
}

addAllPlayerBoxes();


function updateHealthBar(id, h, team_t = false, right2left = false) {
    let statBar = document.getElementById(`player_${id}_tr2`);

    const baseColor = team_t ? colors.t : colors.ct;
    const healthBarDir = right2left ? '270deg' : '90deg';

    let row1_background = document.getElementById(`row1_background_${id}`);
    let row1_teamcolor = document.getElementById(`row1_teamcolor_${id}`);
    let row1_red = document.getElementById(`row1_red_${id}`);

    row1_background.style["background-color"] = colors.player_box;
    row1_teamcolor.style["background-color"] = baseColor;

    if (h === 0) {
        row1_background.style.background = `linear-gradient(${healthBarDir}, ${colors.dead1} 50%, ${colors.dead2} 100%`;
        statBar.style.background = `linear-gradient(${healthBarDir}, ${colors.dead1} 50%, ${colors.dead2} 100%`;
        row1_teamcolor.style.visibility = "hidden";
        row1_red.style.visibility = "hidden";
        return;
    } else if (h === 100) {
        row1_teamcolor.style.visibility = "visible";
        row1_red.style.visibility = "visible";
    }

    row1_teamcolor.style["width"] = `${h}%`;
    row1_red.style["width"] = `${h}%`;

    return;
}

function updatePlayerBox(p, right2left = false) {

    let td_player_id = document.getElementById(`player_id_${p.observer_slot}`);
    if (right2left) {
        td_player_id.innerHTML = `|${p.observer_slot}`;
    } else {
        td_player_id.innerHTML = `${p.observer_slot}|`;
    }

    let td_player_name = document.getElementById(`player_name_${p.observer_slot}`);
    td_player_name.innerHTML = `${p.name}`;
    
    let td_health = document.getElementById(`health_${p.observer_slot}`);
    if ('health' in p.state) {
        updateHealthBar(p.observer_slot, p.state.health, p.team === "T", right2left);
        if (p.state.health === 0) {
            td_health.innerHTML = '';
        } else {
            td_health.innerHTML = p.state.health;
        }
    } else {
        td_health.innerHTML = '';
    }

    let td_primary_weapon = document.getElementById(`primary_weapon_${p.observer_slot}`);
    td_primary_weapon.innerHTML = "";

    let td_kevlar = document.getElementById(`kevlar_${p.observer_slot}`);
    td_kevlar.innerHTML = "";
    let td_money = document.getElementById(`money_${p.observer_slot}`);
    td_money.innerHTML = "";
    let kills = document.getElementById(`kills_${p.observer_slot}`);
    kills.innerHTML = "";
    let deaths = document.getElementById(`deaths_${p.observer_slot}`);
    deaths.innerHTML = "";
    let taser = document.getElementById(`taser_${p.observer_slot}`);
    taser.innerHTML = "";
    let nades = [];
    for (let i = 0; i < 4; ++i) {
        nades[i] = document.getElementById(`n${i}_${p.observer_slot}`);
        nades[i].innerHTML = "";
    }
    let secondary = document.getElementById(`secondary_${p.observer_slot}`);
    secondary.innerHTML = "";

    if ('money' in p.state) {
        td_money.appendChild(document.createTextNode(`${p.state.money}`));
    } else {
        td_money.appendChild(document.createTextNode(`$$$$$`));
    }
    if ('kills' in p.match_stats) {
        kills.innerHTML = `${p.match_stats.kills}`;
        deaths.innerHTML = `${p.match_stats.deaths}`;
    } else {
        kills.innerHTML = `?`;
        deaths.innerHTML = `?`;
    }

    let rk = document.getElementById(`round_kills_${p.observer_slot}`);
    rk.innerHTML = '';
    if ('round_kills' in p.state && p.state.round_kills > 0) {
        rk.appendChild(getIcon('skull'));
        rk.appendChild(document.createTextNode(` ${p.state.round_kills}`));
    }

    if (p.state.health === 0) {
        return;
    }

    let kevlar_img;
    if ('armor' in p.state) {
        if (p.state.armor > 0) {
            if (p.state.helmet) {
                kevlar_img = getIcon("kevlar_helmet");
            } else {
                kevlar_img = getIcon("kevlar");
            }
        } else {
            kevlar_img = document.createTextNode(" ");
        }
    } else {
        kevlar_img = document.createTextNode("?");
    }
    // c4 and defuse kit
    if (right2left) {
        if (p.weapon_c4) {
            td_kevlar.appendChild(getIcon("c4"));
            td_kevlar.appendChild(document.createTextNode(" "));
        } else if (p.state.defusekit) {
            td_kevlar.appendChild(getIcon("kit"));
            td_kevlar.appendChild(document.createTextNode(" "));
        }
        td_kevlar.appendChild(kevlar_img);
    } else {
        td_kevlar.appendChild(kevlar_img);
        if ("weapon_c4" in p) {
            td_kevlar.appendChild(document.createTextNode(" "));
            td_kevlar.appendChild(getIcon("c4"));
        } else if (p.state.defusekit) {
            td_kevlar.appendChild(document.createTextNode(" "));
            td_kevlar.appendChild(getIcon("kit"));
        }
    }

    // weapons
    // primary
    let weapon_primary_img = getIcon(p.weapon_primary.name, right2left);
    if (p.weapon_primary.state === "holstered") {
        weapon_primary_img.style.filter = 'brightness(0.8)';
    }
    td_primary_weapon.appendChild(weapon_primary_img);

    // secondary
    let secondary_img = getIcon(p.weapon_secondary.name, right2left);
    if (p.weapon_secondary.state === "holstered") {
        secondary_img.style.filter = 'brightness(0.8)';
    }
    secondary.appendChild(secondary_img);

    // nades
    p.weapon_grenades.forEach((w, i) => {
        let nade_img = getIcon(w.name, right2left);
        if (w.state === "holstered") {
            nade_img.style.filter = 'brightness(0.8)';
        }
        nades[i].appendChild(nade_img);
    });

    if ("weapon_taser" in p) {
        let taser_img = getIcon(p.weapon_taser.name);
        if (p.weapon_taser.state === "holstered") {
            taser_img.style.filter = 'brightness(0.8)';
        }
        taser.appendChild(taser_img);
    }
}

function updateAllPlayerBoxes(data) {
    if (data === undefined || !("players" in data)) {
        return;
    }
    for (let i = 1; i < 6; ++i) {
        updatePlayerBox(data.players[i], false);
    }
    for (let i = 6; i < 10; ++i) {
        updatePlayerBox(data.players[i], true);
    }
    updatePlayerBox(data.players[0], true);
}