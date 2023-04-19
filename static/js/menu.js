function updateData(event) {
  event.preventDefault();

  var nombre = document.getElementById("nombre").value;
  var apellido = document.getElementById("apellido").value;
  var direccion = document.getElementById("direccion").value;
  var numeroDocumento = document.getElementById("numeroDocumento").value;
  var celular = document.getElementById("celular").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password-input").value;

  if (
    nombre != "" &&
    apellido != "" &&
    direccion != "" &&
    numeroDocumento != "" &&
    celular != "" &&
    email != "" &&
    password != ""
  ) {
    const url = "http://127.0.0.1:8000/api/usuarios/" + numeroDocumento + "/";

    return axios
      .put(url, {
        nombre: nombre,
        apellido: apellido,
        direccion: direccion,
        rut_usuario: numeroDocumento,
        numero_telefono: celular,
        mail: email,
        contrasena: password,
        id_rol: "2",
      })
      .then((response) => {
        window.location.replace("http://127.0.0.1:8000/menu/" + email);
      })
      .catch((error) => {
        console.log("Usuario Con Problemas");
      });
  }
}

function loadContentDiv(section) {
  if (section == "home")
    document.getElementById("container").innerHTML =
      document.getElementById("container-home").innerHTML;
  if (section == "ofertas")
    document.getElementById("container").innerHTML =
      document.getElementById("container-ofertas").innerHTML;
  if (section == "productos")
    document.getElementById("container").innerHTML = document.getElementById(
      "container-productos"
    ).innerHTML;
  if (section == "editarPerfil")
    document.getElementById("container").innerHTML = document.getElementById(
      "container-editarPerfil"
    ).innerHTML;
  if (section == "pedidosRealizados")
    document.getElementById("container").innerHTML = document.getElementById(
      "container-pedidosRealizados"
    ).innerHTML;
  if (section == "logout")
    window.location.replace("http://127.0.0.1:8000/index/");
}

function haveFocus() {
  document.getElementById("password-input").value = "";
}

function validate() {
  let lengBoolean, bigLetterBoolean, numBoolean, specialCharBoolean;
  const password = document.getElementById("password-input");
  const passwordAlert = document.getElementById("password-alert");
  let value = password.value;

  let leng = document.getElementById("leng");
  let bigLetter = document.getElementById("big-letter");
  let num = document.getElementById("num");
  let specialChar = document.getElementById("special-char");

  const specialChars = "!@#$%^&*()-_=+[{]}\\|;:'\",<.>/?`~";
  const numbers = "0123456789";

  password.classList.add("is-invalid");
  passwordAlert.classList.remove("d-none");
  password.addEventListener("focus", () => {
    passwordAlert.classList.remove("d-none");
    if (!password.classList.contains("is-valid")) {
      password.classList.add("is-invalid");
    }
  });

  if (value.length < 7) {
    lengBoolean = false;
  } else if (value.length > 8) {
    lengBoolean = true;
  }

  if (value.toLowerCase() == value) {
    bigLetterBoolean = false;
  } else {
    bigLetterBoolean = true;
  }

  numBoolean = false;
  for (let i = 0; i < value.length; i++) {
    for (let j = 0; j < numbers.length; j++) {
      if (value[i] == numbers[j]) {
        numBoolean = true;
      }
    }
  }

  specialCharBoolean = false;
  for (let i = 0; i < value.length; i++) {
    for (let j = 0; j < specialChars.length; j++) {
      if (value[i] == specialChars[j]) {
        specialCharBoolean = true;
      }
    }
  }

  if (
    lengBoolean == true &&
    bigLetterBoolean == true &&
    numBoolean == true &&
    specialCharBoolean == true
  ) {
    specialChar.style.color = "green";
    bigLetter.style.color = "green";
    leng.style.color = "green";
    num.style.color = "green";
  } else {
    if (lengBoolean == false) {
      leng.style.color = "red";
    } else {
      leng.style.color = "green";
    }

    if (bigLetterBoolean == false) {
      bigLetter.style.color = "red";
    } else {
      bigLetter.style.color = "green";
    }

    if (numBoolean == false) {
      num.style.color = "red";
    } else {
      num.style.color = "green";
    }

    if (specialCharBoolean == false) {
      specialChar.style.color = "red";
    } else {
      specialChar.style.color = "green";
    }
  }
}
