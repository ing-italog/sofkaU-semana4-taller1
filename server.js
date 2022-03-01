/**
 * [Este documento contiene  todas las configuraciones de básicas de la aplicacion,
 *  configuraciones como: el puerto, rutas, middleware y el servidor de desarrollo morgan]
 * 
 * @author [italo alberto guevara villamil - alberto.villamil.1997@gmail.com]
 * 
 * @version 1.0.0
 * @since [2022-28-02]
 */


/**
 * [Se almacenan los métodos de framework de EXPRESS en la const `express`]
 * 
 * @param express [modulo de express]
 * @param morgan  [Servidor de morgal] revisar est por favor
 * @param app     [ejecutara los métodos de express]
 */
const express = require('express')
const morgan = require('morgan')
const app = express()
const path = require('path')


/**
 * [Aquí se almacena las configuraciones de la base de datos]
 */
const initDb = require('./config/db')


/**
 * [Middleware]
 * 
 * [morgan se encarga de mostrar por consola las peticiones y respuestas que
 *  llegan al servidor]
 */
app.use(morgan('dev'))


/**
 * [Middleware]
 * [Se le indica que debe resivir formato input, datos ligeros]
 */
app.use(express.urlencoded({extended: false}))


/**
 * [Middleware]
 * [se le indica a la aplicación que debe soportar el formato Json]
 */
app.use(express.json())

/**
 * [Ruta de las imagenes]
 */
app.use(express.static("./public/img"));


/**
 * [SETTINGS - configuraciones globales] 
 * 
 *@param port [Se válida que no exista un puerto pre definido por un servidor externo
               la aplicación iniciara en el puerto 8080]
 */
const portDefault = 8080
app.set('port', process.env.PORT || portDefault)


/**
 * [ROUTES - Ejecuta las rutas en el archivo routes.js
 *         - Se difine la ruta inicial por defecto /api/game, luego agregar la ruta 
 *           que desea concatener]
 */
app.use('/', require('./app/routes/routes'))


/**
 * [SETTINGS - configuraciones globales] 
 * 
 *@param __dirname  [Es el encargado de identificar automáticamente la dirección del proyecto]
 *@param viewengine [Es el motor de plantillas]
 * 
 */
app.set('views', path.join(__dirname, './app/views'))
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs')


/**
* [RUN - Inicia del servidor y muestra el mensaje en la consola 'App is online on port + port']
*/
app.listen(app.get('port'), () => {
    console.log("App is online on port ", app.get('port'))
});

initDb()