import { SelectQueryBuilder } from 'typeorm';
import { ParsedParams } from './ParamsParser';
import { ParsedQuery } from './QueryParser';

interface ICreateAPI {
	create(): Promise<void>;
}

interface IReadAPI<T> {
	read(query: ParsedQuery, params: ParsedParams): Promise<SelectQueryBuilder<T>>;
}

export { ICreateAPI, IReadAPI };
