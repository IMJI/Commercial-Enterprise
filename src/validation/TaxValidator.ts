import Schemas from './Schemas';

const taxQuerySchema = Schemas.query.append({
	name: Schemas.oneOrMoreShortString,
	valueFrom: Schemas.percent,
	valueTo: Schemas.percent,
	isDeleted: Schemas.bool
});

const taxBodySchema = Schemas.query.append({
	name: Schemas.shortString,
	value: Schemas.percent,
	isDeleted: Schemas.bool
});

const taxBodyStrictSchema = Schemas.query.append({
	name: Schemas.shortString.required(),
	value: Schemas.percent.required(),
	isDeleted: Schemas.bool
});

export { taxQuerySchema, taxBodySchema, taxBodyStrictSchema };
