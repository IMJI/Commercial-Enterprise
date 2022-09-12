import Joi = require('joi');

interface OutgoingBody {
	product: number;
	tax: number;
	manager: number;
	quantity: number;
}

const scheme = Joi.number().integer().positive().required();
const outgoingBodyValidator = Joi.object({
	product: scheme,
	tax: scheme,
	manager: scheme,
	quantity: scheme
});

export { OutgoingBody, outgoingBodyValidator };
