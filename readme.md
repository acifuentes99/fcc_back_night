# Plantilla de Workflow NodeJs

Esta plantilla incluye cosas como:

* Soporte Scss/Sass
* Soporte ReactJs
* Express, NodeJs, mongoose, ejs
* Gulp (para hacer posible todo lo anterior)
* Y con ello, todo lo necesario para ir creando web apps

Estos, son como las herramientas ideales que he encontrado durante el curso de FreeCodeCamp para poder ir diseñando y creando cosas web.

## Información

### Estructura de carpetas

.
+-- app
|   +-- jsx
|   +-- scss
+-- backapp
|   +-- routes
+-- public
+-- views
+-- node_modules
+-- gulpfile.js
+-- server-js
+-- package.json



* app: Iran archivos de ReactJS y Scss, para poder ir creando la app con estas productivas herramientas y frameworks. Estos luego seran renderizados a la carpeta "public/js" o "public/css"
* backapp: (Conficto pro nombre por ponerle... si se me ocurre uno bkn demosle) Todo lo que se refiere al bakcend de la aplicación. Obiamente estara lleno de JS que cada uno tiene su funcion en la app.
* views: Aqui ira todo lo que tenga que ser "rednerizado". Por lo genreal, son archivos .html, que estaran en formato .ejs (esto, para tener mejor colaboración entre variables, y elementos que se muestran en la página).
* public: Todos los archivos que van a ser alojados en la web, que de una u otra forma van a formar el DOM. Aqui estaran los html de la página (que la idea es editarlos igual), y ademas, los archivos de la carpeta apps compilados.
* server.js : Archivo de servidor nodeJS.

### Funcionamiento

Gulp:
* Supervisara cambios en archivos .scss y en los de react, ya que para ir realizando el frontend, es aqui donde pasaremos la mayoria del tiempo vien y analizando cambios en ellos. 
La Idea es que tengamos "livereload" en estos archivos (Por que aqui es donde pasaremos tirandolas la mayoria de las veces), y asi ir creando que quede al gusto.

React:
* Con browserify, todos los archivos de react, seran puestos en 1 solo archivo JS.
Los modulos, y todas esas cosas raras, seran controladas por un archivo llamado base.js (Este archivo como que recopila todos los otros jsx que estaran en la carpeta). 

Otros:
* Cuando suba el proyecto-archivo a la web o heroku, NO subas los modulos de gulp!. Los estoy instalando, y se demora caleta :v. A si que estos packages, dejatelos para tareas de desarollo.


ToDo:
* Al parecer lo logre hacer todo en un solo domingo!! :D
