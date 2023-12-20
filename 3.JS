let generated_text = "Under the starry sky, the moon dances, the breeze whispers in the serene night. Silver verses in the gloom";
let index = 0;
let mark_enabled = false;
let game_errors = 0;
let game_score = 0;

function draw_mark(num) {
    if (num === index && !mark_enabled) {
        return `<span class="mark">→</span>`;
    } else if (mark_enabled && num === index) {
        mark_enabled = false;
        return `<span class="mark invalid">→</span>`;
    }
    return '';
}

function keyPressed(event) {
    let keyCode = event.keyCode || event.which;
    let letter = String.fromCharCode(keyCode);

    if (
        (keyCode >= 65 && keyCode <= 90) ||
        keyCode === 32 ||
        keyCode === 188 ||
        keyCode === 190
    ) {
        if (letter === generated_text[index].toUpperCase()) {
            game_score++;
            index++;
            draw();
        } else if (keyCode === 188 && generated_text[index] === ',') {
            game_score++;
            index++;
            draw();
        } else if (keyCode === 190 && generated_text[index] === '.') {
            game_score++;
            index++;
            draw();
        } else {
            game_errors++;
            mark_enabled = true;
            draw();
        }
    }
}

function draw() {
    let build = "";
    document.getElementById('point').textContent = game_score + "/" + generated_text.length;
    document.getElementById('errors').textContent = game_errors;

    for (let i = 0; i < generated_text.length; i++) {
        build += draw_mark(i);
        build += `${generated_text[i]}`;
    }

    document.getElementById("app").innerHTML = `<h1>${build}</h1>`;
}

function restart_game() {
    game_errors = 0;
    game_score = 0;
    index = 0;
    draw();
    document.getElementById("buttone").innerHTML = `<button onclick="restart_game()">Restart Game</button>`;
}

document.addEventListener("keydown", keyPressed);
draw();
