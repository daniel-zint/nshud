function displayMessage(name, msg, is_t) {
    let chat = document.getElementById("chat_box");
    let msg_p = document.createElement("p");
    msg_p.className = "chat-msg";
    let name_span = document.createElement("span");
    if (is_t === undefined) {
        name_span.classList = "name";
    }
    else if (is_t) {
        name_span.classList = "name t";
    } else {
        name_span.classList = "name ct";
    }
    name_span.innerHTML = name;
    msg_p.appendChild(name_span);
    msg_p.appendChild(document.createTextNode(`${msg}`));
    chat.appendChild(msg_p);
    setTimeout(() => { chat.removeChild(msg_p); }, 10000);
}

function receiveMsg(msg) {
    // find name in gamestate
    if (gamestate.players === undefined)
        return;

    // try to find name. If name cannot be found just split at the first colon
    const idxMax = 10000;
    let idx = idxMax;
    let name = '';
    let is_t = undefined;
    for (let i = 0; i < gamestate.players.length; ++i) {
        if(gamestate.players[i].name.length == 0){
            continue;
        }
        let this_idx = msg.indexOf(gamestate.players[i].name);
        if(this_idx < idx && this_idx !== -1){
            idx = this_idx;
            name = gamestate.players[i].name;
            is_t = (gamestate.players[i].team === "T");
        }
    }

    // split into name and message
    let m = msg.substring(idx + name.length);
    displayMessage(name, m, is_t);
}