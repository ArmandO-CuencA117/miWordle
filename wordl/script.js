let button = document.getElementById("guess-button");
let reiniciarButton = document.getElementById("reiniciar-button");
let intentosRestantes = document.getElementById("intentos-restantes");
let intentos = 6;
let diccionario = ['APPLE', 'HURLS', 'WINGS', 'YOUTH', 'BRAVE', 'CRANE', 'DRIVE', 'EAGLE', 'FROST', 'GLORY'];
let palabra = diccionario[Math.floor(Math.random() * diccionario.length)];

window.addEventListener('load', init);

function init() {
    console.log('Esto se ejecuta solo cuando se carga la pagina web');
    intentosRestantes.innerHTML = `Intentos restantes: ${intentos}`;
}

button.addEventListener("click", intentar);
reiniciarButton.addEventListener("click", reiniciar);

function intentar() {
    const INTENTO = leerIntento();
    if (INTENTO.length !== 5) {
        alert("La palabra debe tener 5 letras.");
        return;
    }
    console.log(INTENTO);
    
    if (INTENTO === palabra) {
        terminar("<h1>GANASTE!😀</h1>");
        return;
    }
    
    for (let i in palabra) {
        if (INTENTO[i] === palabra[i]) {
            console.log(INTENTO[i], "VERDE");
        } else if (palabra.includes(INTENTO[i])) {
            console.log(INTENTO[i], "AMARILLO");
        } else {
            console.log(INTENTO[i], "GRIS");
        }
    }
    
    intentos--;
    intentosRestantes.innerHTML = `Intentos restantes: ${intentos}`;
    if (intentos == 0) {
        terminar(`<h1>PERDISTE!😖 La palabra era ${palabra}</h1>`);
    }

    actualizarGrid(INTENTO);
}

function leerIntento() {
    let intento = document.getElementById("guess-input").value;
    intento = intento.toUpperCase();
    return intento;
}

function terminar(mensaje) {
    const INPUT = document.getElementById("guess-input");
    const BOTON = document.getElementById("guess-button");
    INPUT.disabled = true;
    BOTON.disabled = true;
    let contenedor = document.getElementById('guesses');
    contenedor.innerHTML = mensaje;
    reiniciarButton.style.display = "block";
}

function actualizarGrid(INTENTO) {
    const GRID = document.getElementById("grid");
    const ROW = document.createElement('div');
    ROW.className = 'row';

    for (let i in palabra) {
        const SPAN = document.createElement('span');
        SPAN.className = 'letter';
        if (INTENTO[i] === palabra[i]) { // VERDE
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = 'green';
        } else if (palabra.includes(INTENTO[i])) { // AMARILLO
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = 'yellow';
        } else { // GRIS
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = 'grey';
        }
        ROW.appendChild(SPAN);
    }

    GRID.appendChild(ROW);
}

function reiniciar() {
    intentos = 6;
    palabra = diccionario[Math.floor(Math.random() * diccionario.length)];
    document.getElementById("guess-input").disabled = false;
    document.getElementById("guess-button").disabled = false;
    document.getElementById("guess-input").value = '';
    document.getElementById("guesses").innerHTML = '';
    document.getElementById("grid").innerHTML = '';
    intentosRestantes.innerHTML = `Intentos restantes: ${intentos}`;
    reiniciarButton.style.display = "none";
}
