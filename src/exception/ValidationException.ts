import { ValidationError, ValidationErrorItem } from 'joi';
import Joi = require('joi');
import Exception from './Exception';

class ValidationException extends Exception {
	constructor(errors: ValidationError) {
		const message = ValidationException.parseErrors(errors);
		super(message, 400);
	}

	private static parseErrors(errors: ValidationError): string {
		let message = '';
		errors.details.forEach((error: ValidationErrorItem) => {
			console.log(error.type);
			message += this.defineError(error.type, error.context);
		});
		return message;
	}

	private static defineError(type: string, context: Joi.Context): string {
		if (type === 'number.base')
			return `Value for ${context.key} must be a number. Recieved ${context.value}`;
		if (type === 'number.min')
			return `Minimum value for ${context.key} is ${context.limit}. Recieved ${context.value}`;
		if (type === 'number.max')
			return `Maximum value for ${context.key} is ${context.limit}. Recieved ${context.value}`;
		if (type === 'number.positive')
			return `Value for ${context.key} must be positive. Recieved ${context.value}`;
		if (type === 'number.integer')
			return `Value for ${context.key} must be without floating point. Recieved ${context.value}`;
		if (type === 'string.pattern.base')
			return `Value for ${context.key} fails to match required pattern. Recieved ${context.value}`;
		if (type === 'string.min')
			return `Minimum length of ${context.key} is ${context.limit}. Recieved ${context.value}`;
		if (type === 'string.max')
			return `Maximum length of ${context.key} is ${context.limit}. Recieved ${context.value}`;
		if (type === 'object.unknown') return `${context.key} key is not allowed`;
		if (type == 'any.required') return `Field ${context.key} is required`;

		return `Unknown validation error. For key ${context.key} value ${context.value} is incorrect.`;
	}
}

export default ValidationException;
