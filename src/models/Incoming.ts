import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, BaseEntity } from 'typeorm';
import Manager from './Manager';
import Product from './Product';
import Tax from './Tax';

@Entity()
class Incoming extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne((type) => Product)
	product: Product;

	@ManyToOne((type) => Tax)
	tax: Tax;

	@ManyToOne((type) => Manager)
	manager: Manager;

	@Column()
	date: Date;

	@Column()
	quantity: number;

	@Column()
	cost: number;
}

export default Incoming;
