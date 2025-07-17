import ModelMem from '../model/DAO/vuelosMem.js'
import { validarCoordenadas, validarIdVuelo } from './validaciones/vuelos.js'
import appMessages from '../utils/appMessages.js'
import FunctionalError from '../utils/FunctionalError.js'

class Servicio {
    #model

    constructor() {
        this.#model = new ModelMem()
    }

    obtenerVuelos = async id => {
        const vuelos = await this.#model.obtenerVuelos()
        return vuelos
    }

    guardarActualizarVuelo = async (vuelo) => {
        const vueloExistente = await this.#model.obtenerVueloPorID(vuelo.id);
        const todosLosVuelos = await this.#model.obtenerVuelos();

        const otrosVuelos = todosLosVuelos.filter(v => v.id !== vuelo.id);
        const hayMasDeUnVuelo = otrosVuelos.length > 0;

        const coordenadasValidas = validarCoordenadas({ xa: vuelo.xa, ya: vuelo.ya, za: vuelo.za });
        const idValido = vueloExistente
            ? { result: true }
            : validarIdVuelo(vuelo.id);

        if (!coordenadasValidas.result) {
            const mensaje = coordenadasValidas.error?.details?.[0]?.message || appMessages.COORDENADAS_INVALIDAS;
            throw new FunctionalError(400, mensaje);
        }

        if (!idValido.result) {
            const mensaje = idValido.error?.details?.[0]?.message || appMessages.ID_INVALIDO;
            throw new FunctionalError(400, mensaje);
        }

        const DISTANCIA_MINIMA_COLISION = 500;
        let vuelosEnColision = [];
        if (hayMasDeUnVuelo) {
            vuelosEnColision = otrosVuelos.filter((v) => {
                const dx = vuelo.xa - v.xa;
                const dy = vuelo.ya - v.ya;
                const dz = vuelo.za - v.za;

                const distancia = Math.sqrt(dx * dx + dy * dy + dz * dz);

                console.log(`Comparando con vuelo ${v.id} - distancia: ${distancia}`);

                return distancia < DISTANCIA_MINIMA_COLISION;
            }).map(v => v.id);
        }

        if (vueloExistente) {
            await this.#model.actualizarVuelo(vuelo.id, vuelo);
        } else {
            await this.#model.guardarVuelo(vuelo);
        }

        return vuelosEnColision.length > 0 ? vuelosEnColision : []
    }
}

export default Servicio

