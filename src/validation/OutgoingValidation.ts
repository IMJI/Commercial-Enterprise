import Schemas from './Schemas';

const outgoingQueryScheme = Schemas.query.append({
	products: Schemas.oneOrMoreId,
	taxes: Schemas.oneOrMoreId,
	managers: Schemas.oneOrMoreId,
	quantityFrom: Schemas.positiveInt,
	quantityTo: Schemas.positiveInt,
	costFrom: Schemas.money,
	costTo: Schemas.money,
	status: Schemas.shortString
});

const outgoingBodyScheme = Schemas.query.append({
	product: Schemas.id,
	tax: Schemas.id,
	quantity: Schemas.positiveInt,
	status: Schemas.shortString
});

const outgoingBodyStrictScheme = Schemas.query.append({
	product: Schemas.id.required(),
	tax: Schemas.id.required(),
	quantity: Schemas.positiveInt.required()
	// status: Schemas.shortString
});

export { outgoingQueryScheme, outgoingBodyScheme, outgoingBodyStrictScheme };
