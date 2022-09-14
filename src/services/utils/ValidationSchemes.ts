import Joi = require('joi');

class ValidationSchemes {
	public static idScheme = Joi.number().integer().positive().required();
	public static countScheme = Joi.number().integer().min(0).required();
	public static costScheme = Joi.number().min(0).required();
	public static positiveInteger = Joi.number().min(0).integer();
}

export default ValidationSchemes;
