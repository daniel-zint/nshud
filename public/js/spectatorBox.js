function updateSpectatorBox() {
  if (gameState === undefined) {
    return;
  }

  const id = gameState.observed_player;
  const p = gameState.players[id];

  if (p === undefined) {
    return;
  }

  $("#spec_name").html(`${p.observer_slot}| <b>${p.name}</b>`);

  $("#spec_health").empty();
  if ("health" in p.state) {
    $("#spec_health")
      .append(getIcon("health"))
      .appendText(` ${p.state.health}`);
  }

  if ("kills" in p.match_stats) {
    $(`#spec_kills`).html(`${p.match_stats.kills}`);
    $(`#spec_deaths`).html(`${p.match_stats.deaths}`);
    $(`#spec_assists`).html(`${p.match_stats.assists}`);
  } else {
    $(`#spec_kills`).html(`?`);
    $(`#spec_deaths`).html(`?`);
    $(`#spec_assists`).html(`?`);
  }

  $("#spec_round_kills").empty();
  if ("round_kills" in p.state && p.state.round_kills > 0) {
    $("#spec_round_kills").append(getIcon("skull"));
    $("#spec_round_kills").appendText(` ${p.state.round_kills}`);
  }

  if (p.state.health === 0) {
    return;
  }

  let kevlar_img;
  let kevlar_str = "";
  if ("armor" in p.state) {
    if (p.state.armor > 0) {
      kevlar_img = getIcon(p.state.helmet ? "kevlar_helmet" : "kevlar");
      kevlar_str = ` ${p.state.armor}`;
    } else {
      kevlar_img = document.createTextNode(" ");
    }
  } else {
    kevlar_img = document.createTextNode("?");
  }
  $("#spec_kevlar").html(kevlar_img).appendText(kevlar_str);
  // c4 and defuse kit

  $("#spec_defuse_bomb").empty();
  if ("weapon_c4" in p) {
    $("#spec_defuse_bomb").append(getIcon("c4"));
  } else if (p.state.defusekit) {
    $("#spec_defuse_bomb").append(getIcon("kit"));
  }

  // weapons //
  if (p.weapon_primary.state === "active") {
    $("#spec_ammo").html(
      `${p.weapon_primary.ammo_clip}/${p.weapon_primary.ammo_reserve}`
    );
  } else if (p.weapon_secondary.state === "active") {
    $("#spec_ammo").html(
      `${p.weapon_secondary.ammo_clip}/${p.weapon_secondary.ammo_reserve}`
    );
  } else {
    $("#spec_ammo").html("");
  }

  // nades
  for (let i = 0; i < 4; ++i) {
    $(`#spec_n${i}`).empty();
  }
  p.weapon_grenades.forEach((w, i) => {
    let nade_img = getIcon(w.name);
    nade_img.className = `nade-img ${w.state} ${w.name}`;
    $(`#spec_n${i}`).html(nade_img);
  });

  $("#spec_row_one").css(
    "background",
    `linear-gradient(30deg, ${
      p.team === "T" ? colors.t : colors.ct
    } 50%, rgba(0,0,0,1) 130%`
  );

  if (config.show_player_avatars) {
    // avatar is taken from steam api
    const steamId = gameState.observed_player_steamid;
    if (steamId in avatars) {
      $("#spec_avatar").html(avatars[steamId].img);
    }
    $("#spectator_box").css(
      "grid-template-columns",
      "var(--spectate-avatar-size) 1fr"
    );
  } else {
    $("#spectator_box").css("grid-template-columns", "0em 1fr");
  }
}
