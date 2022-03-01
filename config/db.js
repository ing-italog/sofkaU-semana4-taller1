/**
 * [En este documento se encuentran las configuraciones a la base de datos]
 * 
 * @author [italo alberto guevara villamil - alberto.villamil.1997@gmail.com]
 * 
 * @version 1.0.0
 * @since [2022-28-02]
 */

const mongoose = require('mongoose')


/**
 * [Constante que contiene la uri a la base de datos]
 */
const DB_URI = `mongodb://localhost/my_app_node`


/**
 * [función para conectar a la base de datos, devuelve un mensaje por consola
 *  cuando la conexión es satisfactoria]
 * 
 * @throws[Devuelve un mensaje por consola cuando la conexión no fue posible]
 */
module.exports = () => {    
    const connect = () => {        
        mongoose.connect(
            DB_URI,
            {
                keepAlive: true,
                useNewUrlParser: true,
                useUnifiedTopology: true
            },
            (err) => {
                if (err) {
                    console.log('MongoDB --> ERROR', err);
                } else {
                    console.log('MongoDB --> connected')
                }
            }
        )
    }

    connect()
}