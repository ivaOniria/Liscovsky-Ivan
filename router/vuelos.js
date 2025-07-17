import express from 'express'
import Controlador from '../controlador/vuelos.js'

class Router {
    #controlador

    constructor() {
        this.#controlador = new Controlador()
    }

    start() {    
        const router = express.Router()

        router.get('/', this.#controlador.obtenerVuelos)
        router.post('/', this.#controlador.guardarActualizarVuelo)

        return router
    }
}

export default Router