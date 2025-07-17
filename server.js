import express from 'express'
import Routervuelos from './router/vuelos.js'
import notFoundError from './middlewares/notFoundError.js'
import customErrorHandler from './middlewares/customErrorHandler.js'

class Server {
    #port

    constructor(port) {
        this.#port = port
    }

    start() {
        const app = express()

        app.use(express.static('public'))
        app.use(express.json())
        app.use(express.urlencoded({ extended: true }))

        app.use('/api/vuelos', new Routervuelos().start())

        app.use(customErrorHandler);
        app.use(notFoundError)

        const PORT = this.#port
        const server = app.listen(PORT, () => console.log(`Servidor express escuchando en http://localhost:${PORT}`))
        server.on('error', error => console.log(`Error en servidor: ${error.message}`))
    }
}

export default Server