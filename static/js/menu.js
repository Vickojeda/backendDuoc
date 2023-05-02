async function agregarTiempo() {
  const config = {
    headers: {
      apikey: "f82779ddfbf8ccd5f1d48cc4986fd2d9",
      "Access-Control-Allow-Origin": "*"
    },
  };
  const url = `https://restcountries.com/v3.1/alpha/cl`;

  await axios
    .get(url, config)
    .then((response) => {
      console.log(response.data[0].name.common);
      document.querySelector("#pais").innerHTML = response.data[0].name.common;
    })
    .catch((error) => {
      document.querySelector("#pais").innerHTML = "";
    });
}

agregarTiempo();

const baseDeDatos = [
  {
    id: 1,
    nombre: "Pie de Limon",
    precio: 1200,
    imagen: "/static/images/Img/Coctel/20210313_215942.jpg",
  },
  {
    id: 2,
    nombre: "Tartaleta",
    precio: 1300,
    imagen: "/static/images/Img/Coctel/Tartaletas.jpg",
  },
  {
    id: 3,
    nombre: "Torta Mil Hojas",
    precio: 1500,
    imagen: "/static/images/Img/Pie de limon y tortas de yogurth/kuchen.jpg",
  },
  {
    id: 4,
    nombre: "Cupcase",
    precio: 2000,
    imagen: "/static/images/Img/Coctel/20210313_215942.jpg",
  },
];

let carrito = [];
const divisa = "$";

async function calcularTotalUSD(total) {
  const config = {
    headers: {
      apikey: "4Rd57Kc3pmusk0ayOtBXCJeyDk25atUP",
    },
  };
  const url = `https://api.apilayer.com/exchangerates_data/convert?to=USD&from=CLP&amount=${total}`;

  if (total != 0) {
    /*await axios
      .get(url, config)
      .then((response) => {
        const dolar = response.data.result;
        const dolarFormat = dolar.toString().replace(/\./g, ",");
        document.querySelector("#totalUSD").innerHTML = dolarFormat;
      })
      .catch((error) => {
        alert("Error convertidor CLP to Dolar");
      });*/
  } else {
    document.querySelector("#totalUSD").innerHTML = 0;
  }
  //BORRAR ESTA LINEA
  document.querySelector("#totalUSD").innerHTML = 0;
}

function calcularTotal() {
  const total = carrito
    .reduce((total, item) => {
      const miItem = baseDeDatos.filter((itemBaseDatos) => {
        return itemBaseDatos.id === parseInt(item);
      });
      return total + miItem[0].precio;
    }, 0)
    .toFixed(0);

  calcularTotalUSD(total);
  return total;
}

function vaciarCarrito() {
  carrito = [];
  renderizarCarrito();
}

function renderizarCarrito() {
  document.querySelector("#carrito").innerHTML = "";

  const carritoSinDuplicados = [...new Set(carrito)];
  carritoSinDuplicados.forEach((item) => {
    const miItem = baseDeDatos.filter((itemBaseDatos) => {
      return itemBaseDatos.id === parseInt(item);
    });

    const numeroUnidadesItem = carrito.reduce((total, itemId) => {
      return itemId === item ? (total += 1) : total;
    }, 0);

    const miNodo = document.createElement("li");
    miNodo.classList.add("list-group-item", "text-right", "mx-2");
    miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${divisa}${miItem[0].precio}`;

    const miBoton = document.createElement("button");
    miBoton.classList.add("btn", "btn-danger", "mx-5");
    miBoton.textContent = "X";
    miBoton.style.marginLeft = "1rem";
    miBoton.dataset.item = item;
    miBoton.setAttribute("onclick", `borrarItemCarrito(${miItem[0].id})`);

    miNodo.appendChild(miBoton);
    document.querySelector("#carrito").appendChild(miNodo);
  });

  document.querySelector("#total").innerHTML = calcularTotal();
}

function borrarItemCarrito(id) {
  carrito = carrito.filter((carritoId) => {
    return carritoId !== id;
  });

  renderizarCarrito();
}

function anadirProductoAlCarrito(id) {
  carrito.push(id);
  renderizarCarrito();
}

document.addEventListener("DOMContentLoaded", () => {
  function renderizarProductos() {
    baseDeDatos.forEach((info) => {
      const miNodo = document.createElement("div");
      miNodo.classList.add("card", "col-sm-4");

      const miNodoCardBody = document.createElement("div");
      miNodoCardBody.classList.add("card-body");

      const miNodoTitle = document.createElement("h5");
      miNodoTitle.classList.add("card-title");
      miNodoTitle.textContent = info.nombre;

      const miNodoImagen = document.createElement("img");
      miNodoImagen.classList.add("img-fluid");
      miNodoImagen.setAttribute("src", info.imagen);

      const miNodoPrecio = document.createElement("p");
      miNodoPrecio.classList.add("card-text");
      miNodoPrecio.textContent = `${divisa}${info.precio}`;

      const miNodoBoton = document.createElement("button");
      miNodoBoton.classList.add("btn", "btn-primary");
      miNodoBoton.textContent = "Agregar al Carro";
      miNodoBoton.setAttribute("marcador", info.id);
      miNodoBoton.setAttribute("id", info.id);
      miNodoBoton.setAttribute(
        "onclick",
        `anadirProductoAlCarrito(${info.id})`
      );

      miNodoCardBody.appendChild(miNodoImagen);
      miNodoCardBody.appendChild(miNodoTitle);
      miNodoCardBody.appendChild(miNodoPrecio);
      miNodoCardBody.appendChild(miNodoBoton);
      miNodo.appendChild(miNodoCardBody);
      document.querySelector("#items").appendChild(miNodo);
    });
  }

  document
    .querySelector("#boton-vaciar")
    .setAttribute("onclick", `vaciarCarrito()`);

  // Inicio
  renderizarProductos();
  renderizarCarrito();
});

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
