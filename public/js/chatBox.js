function displayMessage(name, msg, is_t) {
    let chat = document.getElementById("chat_box");
    let msg_p = document.createElement("p");
    msg_p.className = "chat-msg";
    let name_span = document.createElement("span");
    if(is_t === undefined){
        name_span.classList = "name";
    }
    else if (is_t) {
        name_span.classList = "name t";
    } else {
        name_span.classList = "name ct";
    }
    name_span.innerHTML = name;
    msg_p.appendChild(name_span);
    msg_p.appendChild(document.createTextNode(` : ${msg}`));
    chat.appendChild(msg_p);
    setTimeout(() => { chat.removeChild(msg_p); }, 5000);
}

function receiveMsg(data) {
    // find name in gamestate
    if (gamestate.players === undefined)
        return;

    for (let i = 0; i < gamestate.players.length; ++i) {
        if (gamestate.players[i].name === data.name) {
            const is_t = (gamestate.players[i].team === "T");
            displayMessage(data.name, data.msg, is_t);
            return;
        }
    }

    displayMessage(data.name, data.msg);
}