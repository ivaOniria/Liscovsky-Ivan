const notFoundError = (req, res, next) => {
    res.status(404).json({ error: 'Ruta o método no encontrado' });
};

export default notFoundError;