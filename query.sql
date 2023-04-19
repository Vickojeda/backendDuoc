CREATE TABLE USUARIO 
(nombre VARCHAR2 (30) NOT NULL,
apellido VARCHAR2 (30) NOT NULL,
direccion VARCHAR2 (20) NOT NULL,
rut_usuario VARCHAR2 (20) NOT NULL PRIMARY KEY,
numero_telefono VARCHAR2 (20) NOT NULL,
mail VARCHAR2 (20) NOT NULL,
contrasena VARCHAR2 (20) NOT NULL,
id_rol NUMBER (20) NOT NULL,
created_at DATE NOT NULL,
update_at DATE NOT NULL,
CONSTRAINT fk_id_rol FOREIGN KEY (id_rol)
        REFERENCES ROL (id_rol));
        
CREATE TABLE ROL
(id_rol NUMBER (20) PRIMARY KEY,
descripcion_rol VARCHAR2 (20),
created_at DATE NOT NULL,
update_at DATE NOT NULL);



CREATE TABLE PRODUCTO 
(id_producto VARCHAR2 (20) PRIMARY KEY,
nombre_producto VARCHAR2 (20) NOT NULL,
precio NUMBER (20) NOT NULL,
descripcion_producto VARCHAR2 (30),
created_at DATE NOT NULL,
update_at DATE NOT NULL);



CREATE TABLE BOLETA 
(id_producto VARCHAR2 (20),
rut_usuario VARCHAR2 (20) NOT NULL,
numero_boleta NUMBER (20) PRIMARY KEY,
total_boleta VARCHAR2 (20) NOT NULL,
cant_producto NUMBER (20)NOT NULL,
created_at DATE NOT NULL,
update_at DATE NOT NULL,
CONSTRAINT fk_id_producto FOREIGN KEY (id_producto)
        REFERENCES producto (id_producto),
CONSTRAINT fk_rut_usuario FOREIGN KEY (rut_usuario)
        REFERENCES USUARIO (rut_usuario));


        
CREATE TABLE STOCK_PRODUCTO(
id_producto VARCHAR2 (20) PRIMARY KEY,
cantidad_producto_stock NUMBER (20),
created_at DATE NOT NULL,
update_at DATE NOT NULL);

CREATE TABLE HISTORIAL_BOLETA (
id_historia NUMBER(20) PRIMARY KEY,
numero_boleta NUMBER (20),
created_at DATE NOT NULL,
update_at DATE NOT NULL,
CONSTRAINT fk_id_ FOREIGN KEY (numero_boleta)
        REFERENCES BOLETA (numero_boleta));
        
