import Schemas from './Schemas';

const categoryQuerySchema = Schemas.query.append({
	name: Schemas.oneOrMoreShortString,
	isDeleted: Schemas.bool
});

const categoryBodySchema = Schemas.query.append({
	name: Schemas.shortString,
	isDeleted: Schemas.bool
});

const categoryBodyStrictSchema = Schemas.query.append({
	name: Schemas.shortString.required(),
	isDeleted: Schemas.bool
});

export { categoryQuerySchema, categoryBodySchema, categoryBodyStrictSchema };
