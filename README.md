# SOFKA-U cantera nivel 2

## Week 4 - Exercise 1 / Api-Rest

[![N|Solid](https://miro.medium.com/max/365/1*Jr3NFSKTfQWRUyjblBSKeg.png)](https://expressjs.com/es/)

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://github.com/ing-italog?tab=repositories)

This apliccation is the soluction to exercise 1 week 4, APIREST- dices game
- Proyect Version  1.0.0 - 2022-02-21
- Npm version 16.10.2
- Text File Encoding UTF-8
- Express 4.17.3
- DB mongo
- Morgan  1.10.0
- Nodemon 2.0.15
- mongoose
- mongoose-delete 0.5.4
- ejs  3.1.6

### Execute.

Ejecutar el servidor con el siguiente comando en la consola `npm DEBUG`, el servidor inicia por defecto en el puerto 8080.

Para ejecutar en un servidor final se ejecuta con el comando `npm run start` la cual deja a disposición del hosting la asignación del puerto, en caso de no asignarse un puerto este se asignara por defecto en el puerto 8080.

La ruta raiz para usar la api en local es : `http://:localhost:defaultPort/api/game`, en caso de modificar el número del puerto, esta ruta cambiara su número.

### Packages

El documeto `server.js` el cual es tiene las configuraciones del servidor (puerto, servidor, framework, etc).

- [app] - Contiene los paquetes `routes`, `controller`, `models` y `views`.

- [config] - Contiene el documento `db.js`, en este documento se hallan las configuraciones de conexión a la base de datos.



### Subpackages

- [Routers]() - Contiene el documento `routes.js` el cual contiene las rutas con las cuales se puede acceder a la API, por cada ruta se ejecuta una función asignada desde el `controller.js`, la ruta raiz en local por defecto es `http://:localhost:8080/` más la ruta correspondiente, en caso de modificar el número del puerto, esta ruta cambiar el número.

- [Controllers]()  - Contiene el documento `controller.js` el cual es el encargado de comunicarse con la base de datos y dar las respuestas a las solicitudes del cliente.

- [Models]() - Contiene el documento `model.js`.

- [Views]() - Contiene la vista `index.html` con la información acerca de como usar la API.


### DDBB Configuration(Conection)

La app maneja una unica base de datos la cual es `mongoDB`, por defecto la conexión es en local con la siguiente url `mongodb://localhost:27017/my_app_node`, puedes modificar esta configuración en el documento `config/db.js` en la carpeta raiz de la aplicación.

## Routes

GET `/` Renderiza un documento html con información acerca de como usar la API.
```
http://localhost:defaultPort/
```

GET `/api` Responde con un JSON con el historial total de partidas.
```
http://localhost:defaultPort/api
```

GET `/api/ + id` Responde con un JSON con la información de la información de una partidao, se debe enviar el ID a tráves de la cabecera de la petición.
```
http://localhost:defaultPort/api/ + id 
```

POST `/api/createGame` Permite crear juego, se debe enviar un JSON con la siguiente información.
```
 { " gamers ":[
               { " name " : " nombre del primer jugador "},
               { " name " : " nombre del segundo jugador "}
             ]}
```

sí la petición es exítosa la app devolvera un json con toda la información del juego almacenada en la BBDD, en caso de no ser exítoso devolvera un estatus 500 y la información del ERROR.
 
POST `api/startGame` Inicia una partida, el ID de la partida se debe enviar en el cuerpo de la petición(JSON), en caso de que la partida ya este en curso o finalizada retornara el mensaje correspondiente del estado.
```
{ " id ": " id de la partida "}
```

GET `api/ + id /winner` Define el ganador de una partida, se debe enviar el ID de la partida en el header de la petición,para poder obtener el ganador de una partida, es necesario que esta partida ya se encuentre en curso, el ganador se de define de forma aleatoria, por lo que no es necesario enviar datos.
```
http://localhost:defaultPort/api/ + id /winner
```


@Author [Italo Alberto Guevara Villamil - alberto.villamil.1997@gmail.com]