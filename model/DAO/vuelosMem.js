class ModelMem {
    #vuelos

    constructor() {
        this.#vuelos = []
    }

    obtenerVuelos = async () => this.#vuelos

    obtenerVueloPorID = async id => {
        return this.#vuelos.find(v => v.id === id)
    }

    guardarVuelo = async vuelo => {
        this.#vuelos.push(vuelo)
        return vuelo
    }

    actualizarVuelo = async (id, vueloActualizado) => {
        const index = this.#vuelos.findIndex(v => v.id === id);
        this.#vuelos[index] = { ...this.#vuelos[index], ...vueloActualizado };
        return this.#vuelos[index];
    }
}

export default ModelMem