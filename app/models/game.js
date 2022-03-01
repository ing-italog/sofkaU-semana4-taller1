/**
 * [Este documento contiene el modelo necesario para la creación del juego el schema 'Game']
 * 
 * @author [italo alberto guevara villamil - alberto.villamil.1997@gmail.com]
 * 
 * @version 1.0.0
 * @since [2022-28-02]
 */


const mongoose = require('mongoose')
const mongooseSoftDelete = require('mongoose-delete');


/**
 * [Este es el esqueleto necesario para crear, consultar, editar y eliminar una partida]
 * 
 * @param gamers      Array   [Jugadores,los jugadores son requeridos]
 * @param inProgress  Boolean [Define si la partida esta activa o terminada]
 * @param winner      Object  [Ganador de la partida, con id y nombre]
 */
const GameScheme = new mongoose.Schema(
    {
        gamers: [
            {
                name: {
                    type: String,
                    trim: true,
                    required: [true, 'Name is required.']
                },
                bet: {
                    type: Number,
                    required: [true, 'The bet is required']
                }
            }
        ],
        inProgress: { type: Boolean, default: false },
        winner: [],
        createDate: { type: Date, default: Date.now }
    },
    { timeStamps: true }
)

GameScheme.plugin(mongooseSoftDelete)

module.exports = mongoose.model('game', GameScheme)