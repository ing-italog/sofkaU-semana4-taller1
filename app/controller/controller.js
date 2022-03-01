/**
 * [Este documento se encarga de procesar las peticones Rest del juego de dados, devolviendo
 *  una respuesta, contruye y/o actualiza el juego]
 * 
 * @author [italo alberto guevara villamil - alberto.villamil.1997@gmail.com]
 * 
 * @version 1.0.0
 * @since [2022-28-02]
 */


/**
 * [Se importan los objetos del documento 'models.js', la cual contiene el objeto game]
 */
const Game = require('../models/game');


/**
 * [Devuelve un documento html que contiene las instrucciones acerca de como usar la api]
 */
exports.getIndex = (req, res) => {
    res.render('index.html', { title: 'DICES GAME' });
}


/**
 *[Devuelve el historial de todas las partidas jugadas, en caso no existir datos, devuelve
   un mensaje informando que no se encontaron datos]
 *
 *@throws [Cuando exista un error]
 */
exports.getGames = (req, res) => {

    const data = Game.find({
        $or: [
            { 'deleted': { $eq: false } },
            { 'deleted': { $exists: false } },
        ]
    });

    data.then(result => {
        if (result.length != 0) {
            res.json(result)
        } else {
            res.json({ "message": "They are no one data" })
        }
    }).catch(err => console.error(err))
}


/**
 *[Devuelve el estado de una partida, la busqueda se realiza por el 'id' de la partida]
 *
 * @throws [Cuando exista un error]
 */
exports.getGame = (req, res, next) => {

    Game.findById(req.params.id)
        .then((result) => { res.json(result) })
        .catch((err) => { res.json(err) });
}


/**
 * [Registrar nueva partida]
 * 
 * @throws [Cuando exista un error]
 */
exports.createGame = (req, res) => {

    const game = new Game({
        gamers: req.body.gamers

    })

    game.save()
        .then((result) => { res.status(210).json(result) })
        .catch((err) => { res.status(500).json(err) });
}


/**
 *[Devuelve una partida y el ganador, el ganador es aleatorio, si existe un ganador, devuelve un mensaje anunciando
 * la novedad, la partida y el ganador, sí la partida no existe un ganador y la partida no ha sido inicializada,
 * devuelve un mensaje informando la novedad]
 *
 * @throws [Cuando exista un error]
 */
exports.getWinner = (req, res) => {

    Game.findByIdAndUpdate(req.params.id)
        .then((result) => {

            let numRamdon;
            let totalBet;
            let win;

            if (result.inProgress == true) {

                numRamdon = Math.floor(Math.random() * result.gamers.length)


                totalBet = 0
                result.gamers.forEach(element => {
                    totalBet += element.bet
                })
                console.log(totalBet)
                win = result.gamers[numRamdon]
                win.bet = totalBet

                Game.findByIdAndUpdate(req.body.id, { inProgress: false, winner: win })
                    .then(solve => Game.findById(req.params.id).then(solutin => res.json(solutin)))

            } else if ((result.inProgress == false) && (result.winner.length != 0)) {
                res.json({ message: 'They are exist a winner, this is the game and its winner', result })

            } else if ((result.inProgress == false) && (result.winner.length == 0)) {
                res.json({ message: 'Please, start the game, before get a winner' })

            } else {
                res.json({ inProgress: 'The game was finish' })
            }
        })
        .catch((err) => { res.json(err) })
}


/**
 * [Se solicita al cliente el id en el cuerpo de la petición, se procede a buscar el id, en caso de que el documento
 *  tenga como estado (inProgress = false) && (winner == 0), se procede a cambiar ese estado a 'true', en caso de ser
 *  'true', devuelveun mensaje JSON indicando que la partida ya esta en progreso, en caso contrario devuelve un mensaje
 *  JSON informando que la partida ha finalizado]
 * 
 *  @throws [Cuando exista un error]
 */
exports.startGame = (req, res) => {
    Game.findByIdAndUpdate(req.body.id)
        .then((result) => {

            if ((result.inProgress == false) && (result.winner.length == 0)) {
                inProgress = true

                Game.findByIdAndUpdate(req.body.id, { inProgress: true })
                    .then((result) => { res.json({ inProgress: 'true' }) })
                    .catch((err) => { res.status(500).json(err) })

            } else if (result.inProgress == true) {
                res.json({ inProgress: 'game in progress' })

            } else {
                res.json({ inProgress: 'The game was finish' })
            }
        })
        .catch((err) => { res.status(500).json(err) })
}