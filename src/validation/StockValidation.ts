import Schemas from './Schemas';

const stockQuerySchema = Schemas.query.append({});

const stockBodySchema = Schemas.query.append({
	id: Schemas.id,
	quantity: Schemas.int
});

const stockBodyStrictSchema = Schemas.query.append({
	id: Schemas.id
});

export { stockQuerySchema, stockBodySchema, stockBodyStrictSchema };
