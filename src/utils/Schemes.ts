import Joi = require('joi');

class Schemes {
	public static id = Joi.number().integer().positive();
	public static shortString = Joi.string().min(2).max(64);
	public static oneOrMoreShortString = [
		this.shortString,
		Joi.array().items(this.shortString)
	];
	public static text = Joi.string().min(10).max(2048);
	public static bool = Joi.boolean();
	public static money = Joi.number().positive().precision(2);
	public static percent = Joi.number().positive().precision(2).min(0).max(1);
	public static positiveInt = Joi.number().integer().min(0);
	public static date = Joi.date();
	public static query = Joi.object({
		limit: Schemes.positiveInt,
		skip: Schemes.positiveInt,
		sort: Joi.string().pattern(new RegExp('[a-zA-Z]+:(ASC|DESC|asc|desc)$'))
	});
}

export default Schemes;
