import { IsInt, IsNumber, IsPositive } from 'class-validator';
import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	ManyToOne,
	BaseEntity,
	OneToMany
} from 'typeorm';
import Manager from './Manager';
import Product from './Product';
import Status from './Status';
import Tax from './tax/Tax';

@Entity()
class Outgoing extends BaseEntity {
	@PrimaryGeneratedColumn()
	@IsInt()
	id!: number;

	@ManyToOne((type) => Product)
	product!: Product;

	@ManyToOne((type) => Tax)
	tax!: Tax;

	@ManyToOne((type) => Manager)
	manager!: Manager;

	@Column()
	@IsInt()
	@IsPositive()
	quantity!: number;

	@Column({
		type: 'numeric',
		precision: 14,
		scale: 2
	})
	@IsNumber()
	@IsPositive()
	cost!: number;

	@OneToMany((type) => Status, (status) => status.outgoing)
	statuses!: Status[];
}

export default Outgoing;
