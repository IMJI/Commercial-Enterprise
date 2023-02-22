import Joi = require('joi');
import Schemas from './Schemas';

const productQuerySchema = Schemas.query.append({
	name: Schemas.oneOrMoreShortString,
	category: Schemas.oneOrMoreShortString,
	description: Joi.string(),
	isDeleted: Schemas.bool
});

const productBodySchema = Schemas.query.append({
	vendorCode: Schemas.id,
	name: Schemas.shortString,
	price: Schemas.money,
	category: Schemas.id,
	description: Schemas.text,
	isDeleted: Schemas.bool
});

const productBodyStrictSchema = Schemas.query.append({
	vendorCode: Schemas.id.required(),
	name: Schemas.shortString.required(),
	price: Schemas.money.required(),
	category: Schemas.id.required(),
	description: Schemas.text,
	isDeleted: Schemas.bool
});

export { productQuerySchema, productBodySchema, productBodyStrictSchema };
