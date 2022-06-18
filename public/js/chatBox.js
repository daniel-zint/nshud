function displayMessage(name, msg, is_t) {
    let name_span = $("<span></span>")
        .addClass("name")
        .html(name);
    if (is_t === undefined) { }
    else if (is_t) {
        name_span.addClass("t");
    } else {
        name_span.addClass("ct");
    }
    let msg_p = $("<p></p>")
        .addClass("chat-msg")
        .append(name_span)
        .append(document.createTextNode(msg));
    $("#chat_box").append(msg_p);
    setTimeout(() => { msg_p.remove(); }, 10000);   // remove message from chat box
}

function receiveMsg(msg) {
    console.log(msg);
    // find name in gamestate
    if (gameState.players === undefined)
        return;

    // try to find name. If name cannot be found just split at the first colon
    const idxMax = 10000;
    let idx = idxMax;
    let name = '';
    let is_t = undefined;
    for (let i = 0; i < gameState.players.length; ++i) {
        if (gameState.players[i].name.length == 0) {
            continue;
        }
        let this_idx = msg.indexOf(gameState.players[i].name);
        if (this_idx < idx && this_idx !== -1) {
            idx = this_idx;
            name = gameState.players[i].name;
            is_t = (gameState.players[i].team === "T");
        }
    }

    if (idx === idxMax) {
        // idx was not found --> split at colon
        name = msg.substring(0, msg.search(':'));
        idx = 0;
    }
    // split into name and message
    const m = msg.substring(idx + name.length);
    displayMessage(name, m, is_t);
}