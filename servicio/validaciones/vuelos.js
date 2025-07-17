import Joi from 'joi';

export const validarIdVuelo = (id) => {
    const schema = Joi.string()
        .pattern(/^[A-Z0-9]{6}$/)
        .required()
        .messages({
            'string.base': '"id" debe ser una cadena de texto',
            'string.pattern.base': '"id" debe tener exactamente 6 caracteres alfanuméricos en mayúsculas',
            'any.required': '"id" es obligatorio',
        });

    const { error } = schema.validate(id);
    return error ? { result: false, error } : { result: true };
};

export const validarCoordenadas = ({ xa, ya, za }) => {
    const schema = Joi.object({
        xa: Joi.number().strict().required().messages({
            'number.base': '"xa" debe ser un número',
            'any.required': '"xa" es obligatorio',
        }),
        ya: Joi.number().strict().required().messages({
            'number.base': '"ya" debe ser un número',
            'any.required': '"ya" es obligatorio',
        }),
        za: Joi.number().strict().required().messages({
            'number.base': '"za" debe ser un número',
            'any.required': '"za" es obligatorio',
        }),
    });

    const { error } = schema.validate({ xa, ya, za });
    return error ? { result: false, error } : { result: true };
};
