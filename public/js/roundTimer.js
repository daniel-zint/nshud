const displayTime = document.getElementById("time");
let roundTimer = new CountDownTimer();

roundTimer.onTick(format);

//function restart() {
//    if (this.expired()) {
//        setTimeout(function () { cdt.start(3); }, 1000);
//    }
//}

function format(minutes, seconds) {
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    switch (getSafe(() => gamestate.phase_countdowns.phase)) {
        case 'live':
            displayTime.style.color = colors.round_live;
            displayTime.style.background = colors.background_default;
            displayTime.textContent = minutes + ':' + seconds;
            break;
        case 'over':
            displayTime.style.color = colors.round_over;
            displayTime.style.background = colors.background_default;
            displayTime.textContent = minutes + ':' + seconds;
            //displayTime.innerHTML = '';
            break;
        case 'freezetime':
            displayTime.style.color = colors.round_freezetime;
            displayTime.style.background = colors.background_default;
            displayTime.textContent = minutes + ':' + seconds;
            break;
        case 'bomb':
        case 'defuse':
            displayTime.style.color = colors.text_default;
            const time_perc = (roundTimer.time / 40) * 100;
            displayTime.style.background = `linear-gradient(${colors.background_default} ${time_perc}%, ${colors.round_bomb_background} ${time_perc}%`;
            displayTime.innerHTML = '';
            const bomb_img = getIcon('bomb');
            bomb_img.style.height = '1em';
            displayTime.appendChild(bomb_img);
            break;
        default:
            displayTime.style.color = colors.text_default;
            displayTime.style.background = colors.background_default;
            displayTime.textContent = minutes + ':' + seconds;
            break;
    }
}