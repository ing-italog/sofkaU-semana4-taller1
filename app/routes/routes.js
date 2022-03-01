/**
 * [Este documento contiene  todas rutas de la API-REST del juego de dado, la cual 
 *  comunicada todas las peticiones rest al controlador 'controller.js' y este
 *  devuelde una respuesta al consumidor]
 * 
 * @author [italo alberto guevara villamil - alberto.villamil.1997@gmail.com]
 * 
 * @version 1.0.0
 * @since [2022-28-02]
 */


const { Router } = require('express');
const router = Router();
const _ctrl = require('../controller/controller.js');
const URL = '/api'


/**
 * [Ruta / GET, renderiza un documento html con la información acerca de como usar la api]
 */
router.get('/', _ctrl.getIndex)


/**
* [Ruta /api GET, devuelve un JSON con el historico de todas las partidas]
*/
router.get(`${URL}`, _ctrl.getGames)


/**
 * [Ruta: /api/:id GET, devuelve un JSON con la información de una partida, se requiere el 'id' de la partida]
 */
router.get(`${URL}/:id`, _ctrl.getGame)


/**
 * [Ruta /api/:id/winner GET, crea define el ganador de una partida, se require el 'id' de la partida]
 */
router.get(`${URL}/:id/winner`, _ctrl.getWinner)


/**
 * [Ruta: /api/createGame POST, se require que se envien datos en el cuerpo de la petición 
 *  para crear una partida]
 */
router.post(`${URL}/createGame`, _ctrl.createGame)


/**
* [Ruta: /api/startGame POST, se require que se envie el 'id' de la partida en el cuerpo de la petición,
   para poner en marcha una partida]
*/
router.post(`${URL}/startGame`, _ctrl.startGame)


module.exports = router;