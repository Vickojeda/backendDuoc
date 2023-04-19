# backendDuoc

Dentro del proyecto existe un archivo de nombre instantclient_19_8.rar el cual tiene comprimido el cliente para conectarse a oracle.

Se debe descomprimir y dejar la carpeta de nombre instantclient_19_8 a la altura de las carpetas app, proyecto etc.

-app
-instantclient_19_8
    -network
        -admin
            -cwallet.sso
            -tnsnames.ora
            -ewallet
            ...
            ...
    -adrci
    ...
    ...
-proyecto
-static
-test
-web

Esto es necesario para obtener la conexion con la base de datos de cloud, dentro de esta carpeta se encuentran los archivos de configuracion de wallet, sqlnet y tnsname.ora.

Existen dos usuarios ya ingresados para los diferentes perfiles estos son

admin:
user: admin@admin.cl
pass: Admin1111!

user:
user: user@user.cl
pass: User1111!

* Existe un archivo query.sql en donde esta los create de las tablas, sin poblar ya que estamos ocupando los registros de oracle cloud.