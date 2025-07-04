//main
simplyCountdown("#app", {
  year: 2025, // required
  month: 7, // required
  day: 26, // required
  hours: 13, // Default is 0 [0-23] integer
  minutes: 0, // Default is 0 [0-59] integer
  seconds: 0, // Default is 0 [0-59] integer
  words: {
    //words displayed into the countdown
    days: { singular: "Dia", plural: "Dias" },
    hours: { singular: "Hora", plural: "Horas" },
    minutes: { singular: "Minuto", plural: "Minutos" },
    seconds: { singular: "Segundo", plural: "Segundos" },
  },
  plural: true, //use plurals
  inline: false, //set to true to get an inline basic countdown like : 24 days, 4 hours, 2 minutes, 5 seconds
  inlineClass: "simply-countdown-inline", //inline css span class in case of inline = true
  // in case of inline set to false
  enableUtc: false, //Use UTC or not - default : false
  onEnd: function () {
    // Deshabilitar botón al terminar el contador
    const submitButton = form.querySelector("button[type='submit']");
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.classList.add("opacity-50", "cursor-not-allowed");
      submitButton.textContent = "Tiempo para confirmar finalizado";
    }
    return;
  },
  refresh: 1000, // default refresh every 1s
  sectionClass: "simply-section", //section css class
  amountClass: "simply-amount", // amount css class
  wordClass: "simply-word", // word css class
  zeroPad: false,
  countUp: false,
});

// manejo de formulario de cnfirmacion
const form = document.getElementById("confirmation-form");
const errors = document.getElementById("errors");
const submitButton = form.querySelector("button[type='submit']");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  submitButton.disabled = true;
  submitButton.classList.add("opacity-50", "cursor-not-allowed");
  submitButton.textContent = "Enviando...";

  const nombre = e.target.nombre.value;
  console.log("🚀 ~ form.addEventListener ~ nombre:", nombre);
  // const email = e.target.email.value;
  // console.log("🚀 ~ form.addEventListener ~ email:", email);
  const radio = e.target.confirmar.value;
  console.log("🚀 ~ form.addEventListener ~ radio:", radio);

  // enviar los datos al back-end
  fetch("http://localhost:3000/api/confirm", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: nombre, confirm: radio }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("��� ~ data:", data);
      if (!data.message) {
        data.map((message) => {
          console.log("🚀 ~ data.map ~ message:", message.issue);
          errors.innerHTML = message.issue;
          submitButton.disabled = false;
        });
        return;
      }
      alert(data.message);
      errors.innerHTML = "";
      form.reset();
    })
    .catch((error) => {
      console.error("Error:", error);
      alert(error, "Hubo un error al enviar los datos");
    })
    .finally(() => {
      submitButton.disabled = false; // Rehabilitar siempre al final
      submitButton.classList.remove("opacity-50", "cursor-not-allowed");
      submitButton.textContent = "Confirmar";
    });
});
//funcion de navbar
function toggleMenu() {
  const menu = document.getElementById("menu");
  menu.classList.toggle("active");
}

const menuBurger = document.querySelector(".hamburger");
menuBurger.addEventListener("click", toggleMenu);

//carrucel
let stack = document.querySelector(".stack");

[...stack.children].reverse().forEach((i) => stack.append(i));

stack.addEventListener("click", swap);

function swap(e) {
  let card = document.querySelector(".card:last-child");
  if (e.target !== card) return;
  card.style.animation = "swap 700ms forwards";

  setTimeout(() => {
    card.style.animation = "";
    stack.prepend(card);
  }, 700);
}

// Obtener los elementos del DOM
const modal = document.getElementById("myModal");
const openModalBtn = document.getElementById("openModalBtn");
const closeBtn = document.getElementsByClassName("close")[0];

// Función para abrir el modal
openModalBtn.onclick = function () {
  modal.style.display = "block";
};

// Función para cerrar el modal cuando se hace clic en el botón "x"
closeBtn.onclick = function () {
  modal.style.display = "none";
};

// Cerrar el modal si se hace clic fuera de él
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
document.addEventListener(
  "click",
  () => {
    const audio = document.getElementById("backgroundMusic");
    console.log("🚀 ~ audio sonido:", audio);
    if (audio) {
      audio.muted = false;
      audio.play();
    }
  },
  { once: true }
); // Solo la primera vez
