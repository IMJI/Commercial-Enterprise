import Schemas from './Schemas';

const managerQuerySchema = Schemas.query.append({
	percent: Schemas.percent,
	hireDate: Schemas.date,
	dismissalDate: Schemas.date,
	parent: Schemas.id
});

const managerBodySchema = Schemas.query.append({
	percent: Schemas.percent,
	hireDate: Schemas.date,
	dismissalDate: Schemas.date,
	parent: Schemas.id
});

const managerBodyStrictSchema = Schemas.query.append({
	percent: Schemas.percent.required(),
	hireDate: Schemas.date,
	dismissalDate: Schemas.date,
	parent: Schemas.id
});

export { managerQuerySchema, managerBodySchema, managerBodyStrictSchema };
