import Schemas from './Schemas';

const stockQuerySchema = Schemas.query.append({});

const stockBodySchema = Schemas.query.append({
	quantity: Schemas.int
});

const stockBodyStrictSchema = Schemas.query.append({
	product: Schemas.id
});

export { stockQuerySchema, stockBodySchema, stockBodyStrictSchema };
