//inicializacion de variables
let tarjetasdestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let SegundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 50;
let timerInicial = 50;
let tiempoRegresivo = null;

// Apuntando a documento HTML
let mostrarMovimientos = document.getElementById("movimientos");
let mostrarAciertos = document.getElementById("aciertos");
let mostrarTiempo = document.getElementById("t-restante");

let winAudio = new Audio("./sound/win.wav");
let loseAudio = new Audio("./sound/lose.wav");
let clickAudio = new Audio("./sound/click.wav");
let rightAudio = new Audio("./sound/right.wav");
let wrongAudio = new Audio("./sound/wrong.wav");

// generacion de numeros aleatorios
let numeros = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
numeros = numeros.sort(() => {
  return Math.random() - 0.5;
});
console.log(numeros);

//Funciones
function contarTiempo() {
  tiempoRegresivo = setInterval(() => {
    timer--;
    mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;
    if (timer == 0) {
      clearInterval(tiempoRegresivo);
      bloquearTarjetas(numeros);
      loseAudio.play();
    }
  }, 1000);
}

function bloquearTarjetas() {
  for (let i = 0; i <= 15; i++) {
    let tarjetaBloqueada = document.getElementById(i);
    tarjetaBloqueada.innerHTML = `<img src="./images/${numeros[i]}.jpg" alt ="">`;
    tarjetaBloqueada.desabled = true;
  }
}

// funcion principal
function destapar(id) {
  if (temporizador == false) {
    contarTiempo();
    temporizador = true;
  }

  tarjetasdestapadas++;
  console.log(tarjetasdestapadas);

  if (tarjetasdestapadas == 1) {
    //mostrar primer numero
    tarjeta1 = document.getElementById(id);
    primerResultado = numeros[id];
    tarjeta1.innerHTML = `<img src="./images/${primerResultado}.jpg" alt ="">`;
    clickAudio.play();

    //Deshabilitar primer boton
    tarjeta1.disabled = true;
  } else if (tarjetasdestapadas == 2) {
    //Mostrar segundo numero
    tarjeta2 = document.getElementById(id);
    SegundoResultado = numeros[id];
    tarjeta2.innerHTML = `<img src="./images/${SegundoResultado}.jpg" alt ="">`;

    //Deshabilitar segundo boton
    tarjeta2.desabled = true;

    //incrementar movimientos
    movimientos++;
    mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

    if (primerResultado == SegundoResultado) {
      //Encerrar contador de tarjetas destapadas
      tarjetasdestapadas = 0;

      //Aumentar aciertos
      aciertos++;
      mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;

      if (aciertos == 8) {
        winAudio.play();
        clearInterval(tiempoRegresivo);
        mostrarAciertos.innerHTML = `Aciertos: ${aciertos}😲​`;
        mostrarTiempo.innerHTML = `ERES UN PROOO!!! 🎉​ Sólo demoraste ${
          timerInicial - timer
        } Segundos`;
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}🤘​😎​`;
        rightAudio.play();
      }
    } else {
      wrongAudio.play();
      //Mostrar moementaneamente valores y volver a tapar
      setTimeout(() => {
        tarjeta1.innerHTML = " ";
        tarjeta2.innerHTML = " ";
        tarjeta1.disabled = false;
        tarjeta2.disabled = false;
        tarjetasdestapadas = 0;
      }, 800);
    }
  }
}
