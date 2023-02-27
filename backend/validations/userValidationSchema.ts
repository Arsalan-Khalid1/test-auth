import Joi from "joi"

export const addUserValidationSchema = Joi.object({
    firstName: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    lastName : Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),

    password: Joi.string().required(),
    
    confirmPassword : Joi.any()
    .valid(Joi.ref('password'))
    .required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required()
})

export const loginUserValidationSchema = Joi.object({
    password: Joi.string()
        .required(),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required()
})

export const logoutUserValidationSchema = Joi.object({

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required()
})
