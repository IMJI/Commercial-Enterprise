import Schemas from './Schemas';

const userQuerySchema = Schemas.query.append({});

const userBodySchema = Schemas.query.append({
	email: Schemas.email,
	firstName: Schemas.shortString,
	lastName: Schemas.shortString,
	patronymic: Schemas.shortString,
	manager: Schemas.id,
	role: Schemas.shortString,
	password: Schemas.shortString
});

const userBodyStrictSchema = Schemas.query.append({
	email: Schemas.email.required(),
	firstName: Schemas.shortString.required(),
	lastName: Schemas.shortString.required(),
	patronymic: Schemas.shortString,
	manager: Schemas.id,
	role: Schemas.shortString.required(),
	password: Schemas.shortString.required()
});

export { userQuerySchema, userBodySchema, userBodyStrictSchema };
