import Schemas from "./Schemas";

const outgoingQueryScheme = Schemas.query.append({
    product: Schemas.id,
    tax: Schemas.id,
    manager: Schemas.id,
    quantity: Schemas.positiveInt,
    cost: Schemas.money,
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
    quantity: Schemas.positiveInt.required(),
    status: Schemas.shortString
});

export { outgoingQueryScheme, outgoingBodyScheme, outgoingBodyStrictScheme }