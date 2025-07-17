import Servicio from '../servicio/vuelos.js'
import FunctionalError from '../utils/FunctionalError.js'

class Controlador {
    #servicio

    constructor() {
        this.#servicio = new Servicio()
    }

    obtenerVuelos = async (req, res, next) => {
        try {
            const vuelos = await this.#servicio.obtenerVuelos()
            res.status(200).json(vuelos)
        } catch (error) {
            next(error)
        }
    }

    guardarActualizarVuelo = async (req, res, next) => {
        try {
            const vuelo = req.body

            if (!Object.keys(vuelo).length) {
                throw new FunctionalError(400, 'El vuelo está vacío')
            }

            const resultado = await this.#servicio.guardarActualizarVuelo(vuelo)
            return res.status(200).json(resultado)

        } catch (error) {
            next(error)
        }
    }
}

export default Controlador