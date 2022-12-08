function addPlayerBox(observer_slot, right2left = false) {
    const id = observer_slot;

    if (document.getElementById(`player_${id}`)) {
        console.error(`Player box for observer slot ${id} already exists`);
        return;
    }

    let li = $("<li></div>").prop("id", `player_${id}`);
    let container = $("<div></div>").addClass("player-container");
    $(li).append(container);

    container.append($("<div></div>").addClass("avatar"));

    let row1_background = $("<div></div>").addClass("row1-background").prop("id", `row1_background_${id}`);
    row1_background.append($("<div></div>").addClass("row1-teamcolor").prop("id", `row1_teamcolor_${id}`));
    row1_background.append($("<div></div>").addClass("row1-red").prop("id", `row1_red_${id}`));
    container.append(row1_background);

    let row1 = $("<div></div>").addClass("player-container-row one").prop("id", `player_${id}_tr1`);
    row1_background.append(row1);

    let row2 = $("<div></div>").addClass("player-container-row two").prop("id", `player_${id}_tr2`);
    container.append(row2);

    // 1st row
    row1.append($("<div></div>").addClass("health").prop("id", `health_${id}`));
    row1.append($("<div></div>").addClass("player-id").prop("id", `player_id_${id}`));
    row1.append($("<div></div>").addClass("player-name").prop("id", `player_name_${id}`));
    row1.append($("<div></div>").addClass("round-kills").prop("id", `round_kills_${id}`));
    row1.append($("<div></div>").addClass("primary").prop("id", `primary_weapon_${id}`));

    // 2nd row
    row2.append($("<div></div>").addClass("armor-bomb-kit").prop("id", `kevlar_${id}`));

    let money_container = $("<div></div>").addClass("money-container");
    money_container.append($("<div></div>").addClass("dollar").html("$"));
    money_container.append($("<div></div>").addClass("money").prop("id", `money_${id}`));
    row2.append(money_container);

    let kd_container = $("<div></div>").addClass("kd-container");
    kd_container.append($("<div></div>").addClass("K").html("K"));
    kd_container.append($("<div></div>").addClass("kills").prop("id", `kills_${id}`));
    kd_container.append($("<div></div>").addClass("D").html("D"));
    kd_container.append($("<div></div>").addClass("deaths").prop("id", `deaths_${id}`));
    row2.append(kd_container);
    row2.append($("<div></div>").addClass("taser").prop("id", `taser_${id}`));

    let nade_container = $("<div></div>").addClass("nade-container");
    nade_container.append($("<div></div>").addClass("nade").prop("id", `n0_${id}`));
    nade_container.append($("<div></div>").addClass("nade").prop("id", `n1_${id}`));
    nade_container.append($("<div></div>").addClass("nade").prop("id", `n2_${id}`));
    nade_container.append($("<div></div>").addClass("nade").prop("id", `n3_${id}`));
    row2.append(nade_container);
    row2.append($("<div></div>").addClass("secondary").prop("id", `secondary_${id}`));

    if (right2left) {
        // 1st row
        row1.append(row1.children('div').get().reverse());
        row2.append(row2.children('div').get().reverse());
    }

    return li;
}

function addAllPlayerBoxes() {
    // init player boxes
    $("#team_left").empty();
    $("#team_right").empty();

    for (let i = 1; i < 3; ++i) {
        $("#team_left").append(addPlayerBox(i, false));
    }
    for (let i = 3; i < 5; ++i) {
        $("#team_right").append(addPlayerBox(i, true));
    }
    //$("#team_right").append(addPlayerBox(0, true));
}

addAllPlayerBoxes();

//$("#player_box_1").clone().prop('id', "mynewpb").appendTo("#team_left");


function updateHealthBar(id, h, team_t = false, right2left = false) {
    const c1 = team_t ? colors.t1 : colors.ct1;
    const c2 = team_t ? colors.t2 : colors.ct2;
    const dir = right2left ? '315deg' : '45deg';
    const dirDead = right2left ? '270deg' : '90deg';

    const bg_dead = `linear-gradient(${dirDead}, ${colors.dead1} 50%, ${colors.dead2} 100%`;

    $(`#row1_background_${id}`).css("background", colors.player_box);
    $(`#row1_teamcolor_${id}`).css("background", `linear-gradient(${dir}, ${c1} 30%, ${c2} 100%`);

    if (h === 0) {
        $(`#row1_background_${id}`).css("background", bg_dead);
        $(`#player_${id}_tr2`).css("background", bg_dead);
        $(`#row1_teamcolor_${id}`).css("visibility", "hidden");
        $(`#row1_red_${id}`).css("visibility", "hidden");
        return;
    } else if (h === 100) {
        $(`#row1_teamcolor_${id}`).css("visibility", "visible");
        $(`#row1_red_${id}`).css("visibility", "visible");
    }

    $(`#row1_teamcolor_${id}`).css("width", `${h}%`);
    $(`#row1_red_${id}`).css("width", `${h}%`);

    return;
}

function updatePlayerBox(p, right2left = false) {
    const id = p.observer_slot;

    if (right2left) {
        $(`#player_id_${id}`).html(`|${id}`);
    } else {
        $(`#player_id_${id}`).html(`${id}|`);
    }

    $(`#player_name_${id}`).html(`${p.name}`);

    if ('health' in p.state) {
        updateHealthBar(id, p.state.health, p.team === "T", right2left);
        if (p.state.health === 0) {
            $(`#health_${id}`).html('');
        } else {
            $(`#health_${id}`).html(p.state.health);
        }
    } else {
        updateHealthBar(id, 0, p.team === "T", right2left);
        $(`#health_${id}`).html('');
    }

    $(`#primary_weapon_${id}`).empty();

    let nades = [];
    for (let i = 0; i < 4; ++i) {
        nades[i] = document.getElementById(`n${i}_${p.observer_slot}`);
        nades[i].innerHTML = "";
    }
    let secondary = document.getElementById(`secondary_${p.observer_slot}`);
    secondary.innerHTML = "";

    $(`#money_${id}`).empty();
    if ('money' in p.state) {
        $(`#money_${id}`).text(`${p.state.money}`);
    } else {
        $(`#money_${id}`).text(`$$$$$`);
    }
    if ('kills' in p.match_stats) {
        $(`#kills_${id}`).html(`${p.match_stats.kills}`);
        $(`#deaths_${id}`).html(`${p.match_stats.deaths}`);
    } else {
        $(`#kills_${id}`).html(`?`);
        $(`#deaths_${id}`).html(`?`);
    }

    $(`#round_kills_${id}`).empty();
    if ('round_kills' in p.state && p.state.round_kills > 0) {
        $(`#round_kills_${id}`).append(getIcon('skull'));
        $(`#round_kills_${id}`).appendText(` ${p.state.round_kills}`);
    }

    if (p.state.health === 0) {
        return;
    }

    let kevlar_img;
    if ('armor' in p.state) {
        if (p.state.armor > 0) {
            kevlar_img = getIcon(p.state.helmet ? 'kevlar_helmet' : 'kevlar');
        } else {
            kevlar_img = document.createTextNode(" ");
        }
    } else {
        kevlar_img = document.createTextNode("?");
    }
    // c4 and defuse kit
    $(`#kevlar_${id}`).empty();
    let kevlar_add = (e) => { right2left ? $(`#kevlar_${id}`).append(e) : $(`#kevlar_${id}`).prepend(e); };
    let kevlar_add_text = (e) => { right2left ? $(`#kevlar_${id}`).appendText(e) : $(`#kevlar_${id}`).prepend(e); };
    if (p.weapon_c4) {
        kevlar_add(getIcon("c4"));
        kevlar_add_text(" ");
    } else if (p.state.defusekit) {
        kevlar_add(getIcon("kit"));
        kevlar_add_text(" ");
    }
    kevlar_add(kevlar_img);

    // weapons
    // primary
    if (p.weapon_primary.name !== undefined) {
        let weapon_primary_img = getIcon(p.weapon_primary.name, right2left);
        if (p.weapon_primary.state === "holstered") {
            weapon_primary_img.style.filter = 'brightness(0.8)';
        }
        $(`#primary_weapon_${id}`).append(weapon_primary_img);
    }

    // secondary
    if (p.weapon_secondary.name !== undefined) {
        let secondary_img = getIcon(p.weapon_secondary.name, right2left);
        if (p.weapon_secondary.state === "holstered") {
            secondary_img.style.filter = 'brightness(0.8)';
        }
        secondary.appendChild(secondary_img);
    }

    // nades
    p.weapon_grenades.forEach((w, i) => {
        if(i > 3){
            return;
        }
        if (w.name !== undefined) {
            let nade_img = getIcon(w.name, right2left);
            nade_img.className = `nade-img ${w.state} ${w.name}`;
            
            nades[i].appendChild(nade_img);
        }
    });

    $(`#taser_${id}`).empty();
    if ("weapon_taser" in p) {
        if (p.weapon_taser.name !== undefined) {
            let taser_img = getIcon(p.weapon_taser.name);
            if (p.weapon_taser.state === "holstered") {
                taser_img.style.filter = 'brightness(0.8)';
            }
            $(`#taser_${id}`).append(taser_img);
        }
    }
}

function updateAllPlayerBoxes(data) {
    if (data === undefined || !("players" in data)) {
        return;
    }
    for (let i = 1; i < 3; ++i) {
        updatePlayerBox(data.players[i], false);
    }
    for (let i = 3; i < 5; ++i) {
        updatePlayerBox(data.players[i], true);
    }
    //updatePlayerBox(data.players[0], true);
}