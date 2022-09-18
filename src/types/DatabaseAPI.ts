import { DataSource, SelectQueryBuilder } from 'typeorm';
import { ParsedParams } from './ParamsParser';
import { ParsedQuery } from './QueryParser';

interface ICreateAPI<T> {
	create(dataSource: DataSource, body: unknown): Promise<T>;
}

interface IReadAPI<T> {
	read(dataSource: DataSource, query: ParsedQuery, params: ParsedParams): Promise<T | T[]>;
}

export { ICreateAPI, IReadAPI };
