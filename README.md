# backendDuoc
Como primer punto para poder levantar el proyecto y no tener problemas de cors es necesario que se corra en la direccion

* http://127.0.0.1:8000/index/


Existen dos usuarios ya ingresados para los diferentes perfiles estos son

admin:
user: admin@admin.cl
pass: Admin1111!

user:
user: user@user.cl
pass: User1111!

* Existe un archivo query.sql en donde esta los create de las tablas, sin poblar ya que estamos ocupando los registros de oracle cloud.

* Se crearon dos api propias externas, una para el login y otra para el registro de usuarios, con seguridad de token estatico, alojadas en servidor heroku

token para probar : f82779ddfbf8ccd5f1d48cc4986fd2d9
Api propia para login: https://apiloginserver.herokuapp.com/api/login/
Api propia para registro usuario: https://api-register-user.herokuapp.com/api/usuarios/

