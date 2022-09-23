import { DataSource, SelectQueryBuilder } from 'typeorm';
import { OutgoingBody } from '../controllers/old_api/OutgoingBodyPareser';
import { ParsedParams } from './ParamsParser';
import { ParsedQuery } from './QueryParser';

interface ICreateAPI<T> {
	create(dataSource: DataSource, body: OutgoingBody): Promise<void | T | T[]>;
}

interface IReadAPI<T> {
	read(query: ParsedQuery, params: ParsedParams): Promise<T | T[]>;
}

export { ICreateAPI, IReadAPI };
