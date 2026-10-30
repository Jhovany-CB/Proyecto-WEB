const preguntas = [
  {
    texto: "¿Qué son las sustancias controladas?",
    opciones: [
      "Solo los medicamentos que vende una farmacia",
      "Sustancias psicoactivas cuya producción, venta o consumo está regulado o prohibido por ley",
      "Alimentos con mucha azúcar",
      "Sustancias que no tienen ningún efecto en el cuerpo"
    ],
    correcta: 1,
    explicacion: "Son sustancias que alteran el sistema nervioso y, por su riesgo, la ley las regula o prohíbe."
  },
  
  {
    texto: "¿A qué grupo pertenece el alcohol según su efecto principal?",
    opciones: ["Estimulante", "Depresor", "Alucinógeno", "No tiene efecto"],
    correcta: 1,
    explicacion: "El alcohol es depresor: hace más lentos los reflejos y el funcionamiento del cerebro."
  },
  
 
  
  {
    texto: "¿Qué ayuda a eliminar el alcohol del cuerpo?",
    opciones: ["Un café cargado", "Una ducha fría", "Solo el paso del tiempo", "Hacer ejercicio intenso"],
    correcta: 2,
    explicacion: "El hígado elimina el alcohol a su propio ritmo; café o duchas no lo aceleran."
  },
 
];


let numeroPregunta = 0;
let puntaje = 0;
let nombreJugador = "";
let respuestas = [];


const pantallaInicio = document.getElementById("pantallaInicio");
const pantallaPregunta = document.getElementById("pantallaPregunta");
const pantallaResultado = document.getElementById("pantallaResultado");
const textoProgreso = document.getElementById("textoProgreso");
const textoPuntaje = document.getElementById("textoPuntaje");
const barraQuiz = document.getElementById("barraQuiz");
const textoPregunta = document.getElementById("textoPregunta");
const contenedorOpciones = document.getElementById("contenedorOpciones");
const explicacion = document.getElementById("explicacion");
const btnComenzar = document.getElementById("btnComenzar");
const btnSiguiente = document.getElementById("btnSiguiente");
const btnReiniciar = document.getElementById("btnReiniciar");
const inputNombre = document.getElementById("nombreJugador");

// Oculta las pantallas que no se necesitan
function mostrarPantalla(pantalla) {
    pantallaInicio.classList.add("oculto");
    pantallaPregunta.classList.add("oculto");
    pantallaResultado.classList.add("oculto");
    pantalla.classList.remove("oculto");
}

// Inicia el cuestionario
function iniciarQuiz() {
    numeroPregunta = 0;
    puntaje = 0;
    respuestas = [];
    nombreJugador = inputNombre.value.trim();
    mostrarPantalla(pantallaPregunta);
    mostrarPregunta();
}

// Muestra la pregunta y las opciones
function mostrarPregunta() {
    let pregunta = preguntas[numeroPregunta];

    textoProgreso.textContent = "Pregunta " + (numeroPregunta + 1) + " de " + preguntas.length;
    textoPuntaje.textContent = "Puntos: " + puntaje;
    barraQuiz.style.width = (numeroPregunta / preguntas.length * 100) + "%";
    textoPregunta.textContent = pregunta.texto;
    contenedorOpciones.innerHTML = "";
    explicacion.classList.add("oculto");
    btnSiguiente.disabled = true;

    if (numeroPregunta === preguntas.length - 1) {
        btnSiguiente.textContent = "Ver resultado";
    } else {
        btnSiguiente.textContent = "Siguiente";
    }

    for (let i = 0; i < pregunta.opciones.length; i++) {
        let boton = document.createElement("button");
        boton.className = "opcion";
        boton.textContent = pregunta.opciones[i];

        boton.addEventListener("click", function () {
            responder(i);
        });

        contenedorOpciones.appendChild(boton);
    }
}

// Revisa la respuesta elegida
function responder(opcionElegida) {
    let pregunta = preguntas[numeroPregunta];
    let botones = contenedorOpciones.querySelectorAll(".opcion");
    let correcta = opcionElegida === pregunta.correcta;

    if (correcta) {
        puntaje++;
    }

    respuestas.push({
        pregunta: pregunta,
        elegida: opcionElegida,
        correcta: correcta
    });

    for (let i = 0; i < botones.length; i++) {
        botones[i].disabled = true;

        if (i === pregunta.correcta) {
            botones[i].classList.add("correcta");
        }

        if (i === opcionElegida && !correcta) {
            botones[i].classList.add("incorrecta");
        }
    }

    if (correcta) {
        explicacion.textContent = "¡Correcto! " + pregunta.explicacion;
    } else {
        explicacion.textContent = "No es correcto. " + pregunta.explicacion;
    }

    explicacion.classList.remove("oculto");
    textoPuntaje.textContent = "Puntos: " + puntaje;
    btnSiguiente.disabled = false;
}

// Pasa a la siguiente pregunta
function siguientePregunta() {
    if (numeroPregunta < preguntas.length - 1) {
        numeroPregunta++;
        mostrarPregunta();
    } else {
        mostrarResultado();
    }
}

// Muestra el puntaje al terminar
function mostrarResultado() {
    let porcentaje = Math.round(puntaje / preguntas.length * 100);
    let mensaje = "";

    if (porcentaje >= 80) {
        mensaje = "¡Muy bien! Tienes buenos conocimientos sobre prevención.";
    } else if (porcentaje >= 60) {
        mensaje = "Buen intento. Puedes repasar la información y volver a intentarlo.";
    } else {
        mensaje = "Te recomendamos leer la información y realizar el cuestionario otra vez.";
    }

    if (nombreJugador !== "") {
        mensaje = nombreJugador + ", " + mensaje;
    }

    document.getElementById("tituloResultado").textContent = "Tu resultado";
    document.getElementById("circuloPuntaje").textContent = porcentaje + "%";
    document.getElementById("mensajeResultado").textContent =
        mensaje + " Respuestas correctas: " + puntaje + " de " + preguntas.length + ".";

    let listaRevision = document.getElementById("listaRevision");
    listaRevision.innerHTML = "";

    for (let i = 0; i < respuestas.length; i++) {
        let li = document.createElement("li");
        let respuesta = respuestas[i];

        li.textContent = respuesta.pregunta.texto +
            " — Respuesta correcta: " +
            respuesta.pregunta.opciones[respuesta.pregunta.correcta];

        listaRevision.appendChild(li);
    }

    barraQuiz.style.width = "100%";
    mostrarPantalla(pantallaResultado);
}

// Acciones de los botones
btnComenzar.addEventListener("click", iniciarQuiz);
btnSiguiente.addEventListener("click", siguientePregunta);
btnReiniciar.addEventListener("click", function () {
    mostrarPantalla(pantallaInicio);
});
