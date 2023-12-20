let texto_generado = "Bajo el cielo estrellado danza la luna,susurra la brisa en la noche serena.Versos de plata en la penumbra."
let marca = 0;
let marca_enabled = false;
let game_errors = 0;
let game_score = 0;

function draw_marca(num) {
    if(num == marca && marca_enabled == false){
        return `<span class="marca">→</span>`
    }else if(marca_enabled && num == marca){
        marca_enabled = false;
        return `<span class="marca invalid">→</span>`
    }
    return '';
}

function teclaPresionada(event) {
    let codigoTecla = event.keyCode || event.which;
    let letra = String.fromCharCode(codigoTecla);

    if ((codigoTecla >= 65 && codigoTecla <= 90 || codigoTecla === 32 || codigoTecla === 188 || codigoTecla === 190)) {
        if (letra == texto_generado[marca].toUpperCase()) {
            game_score++;
            marca++;
            draw();
        }else if(codigoTecla == 188 && texto_generado[marca] == ","){
            game_score++;
            marca++;
            draw();
        }else if(codigoTecla == 190 && texto_generado[marca] == "."){
            game_score++;
            marca++;
            draw();
        }else{
            game_errors++;
            marca_enabled = true;
            draw()
        }

    }
}


function draw() {
    let build = "";
    document.getElementById('point').textContent = game_score + "/" + texto_generado.length;
    document.getElementById('errors').textContent = game_errors;

        for (let i = 0; i < texto_generado.length; i++) {
            build += draw_marca(i);
            build += `${texto_generado[i]}`;
        }
        
    document.getElementById("app").innerHTML = `<h1>${build}</h1>`;
}



function retart_game() {
    game_errors = 0;
    game_score = 0;
    marca = 0;
    draw(); 
    document.getElementById("buttone").innerHTML = `<button onclick="retart_game()">Restart Game</button>`;
}

document.addEventListener("keydown", teclaPresionada);
draw()