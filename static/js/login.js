
function auth(event) {
  event.preventDefault();

  var email = document.getElementById("user").value;
  var password = document.getElementById("password").value;
  const url = "http://127.0.0.1:8000/api/login/";

  return axios.post(url, {
    email: email, password: password
  }).then(response => {
    if (response.data.id_rol === 1) {
      window.location.replace("http://127.0.0.1:8000/menuAdmin/"+response.data.mail+"/");
    } else {
      window.location.replace("http://127.0.0.1:8000/menu/"+response.data.mail+"/");
    }
  }).catch(error => {
    alert("Usuario no registrado, registrese")
  })
}
