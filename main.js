// VARIABLES -------------------------------------------------------

// Seleccionar todos los elementos con la misma clase de los botones del NavBar
const buttonsNav = document.querySelectorAll(".nav__link");

// formulario de contacto

const form = document.getElementById("form");
const nameform = document.getElementById("name");
const email = document.getElementById("email");
const matter = document.getElementById("matter");
const message = document.getElementById("message");
const submitButton = document.getElementById("submitButton");
const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const matterError = document.getElementById("matterError");
const messageError = document.getElementById("messageError");


// CÓDIGO ---------------------------------------------------------


// Eventos de scroll de cada sección

buttonsNav.forEach(button => {
  button.addEventListener("click", () => {

    // Obtener el ID de la sección asociada al botón
    const sectionId = button.id;
    const section = document.querySelector(`#section${sectionId.charAt(0).toUpperCase() + sectionId.slice(1)}`);

    if (section) {
      subtractHeight(section);
    };
  });
});

// Función para restarle la altura del header a cada sección y hacer el scroll automático hasta el punto deseado.
function subtractHeight (section) {
  // Variable para obtener la altura del header
  const headerHeigt = document.querySelector(".header").offsetHeight;
  window.scrollTo({
    top: section.offsetTop - headerHeigt,
    behavior: "smooth"
  });
};


// Validar Formulario de contacto

//Validar nombre
function validateName(showError = true) {
  if (nameform.value.trim() === "" || nameform.value.length > 50) {
    if (showError) nameError.textContent = "El nombre no debe estar vacío y debe contener máximo 50 caracteres.";
    return false;
  } else {
    nameError.textContent = "";
    return true;
  }
}

//Validar correo
function validateEmail(showError = true) {
  const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (email.value.trim() === "" || !emailPattern.test(email.value)) {
    if (showError) emailError.textContent = "Debe ingresar un correo válido.";
    return false;
  } else {
    emailError.textContent = "";
    return true;
  }
}

//validar asunto
function validateMatter(showError = true) {
  if (matter.value.trim() === "" || matter.value.length > 50) {
    if (showError) matterError.textContent = "El asunto no debe estar vacío y debe contener máximo 50 caracteres.";
    return false;
  } else {
    matterError.textContent = "";
    return true;
  }
}

//Validar mensaje
function validateMessage(showError = true) {
  if (message.value.trim() === "" || message.value.length > 300) {
    if (showError) messageError.textContent = "El mensaje no debe estar vacío y debe contener máximo 300 caracteres.";
    return false;
  } else {
    messageError.textContent = "";
    return true;
  }
}

function validateForm() {
  const isNameValid = validateName(false);
  const isEmailValid = validateEmail(false);
  const isMatterValid = validateMatter(false);
  const isMessageValid = validateMessage(false);
  submitButton.disabled = !(
    isNameValid &&
    isEmailValid &&
    isMatterValid &&
    isMessageValid
  );
}

function submitMessage(event) {
  event.preventDefault(); // Evitar el envío del formulario por defecto

  // Validar el formulario antes de enviar
  if (validateName() && validateEmail() && validateMatter() && validateMessage()) {    
      alert("¡Mensaje enviado con éxito!");
      form.reset();
  }
}

nameform.addEventListener("blur", () => validateName(true));
email.addEventListener("blur", () => validateEmail(true));
matter.addEventListener("blur", () => validateMatter(true));
message.addEventListener("blur", () => validateMessage(true));

nameform.addEventListener("input", validateForm);
email.addEventListener("input", validateForm);
matter.addEventListener("input", validateForm);
message.addEventListener("input", validateForm);

form.addEventListener("submit", submitMessage);