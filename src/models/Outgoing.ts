import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, BaseEntity } from 'typeorm';
import Manager from './Manager';
import Product from './Product';
import Tax from './Tax';

@Entity()
class Outgoing extends BaseEntity {
	@PrimaryGeneratedColumn()
	id!: number;

	@ManyToOne((type) => Product)
	product!: Product;

	@ManyToOne((type) => Tax)
	tax!: Tax;

	@ManyToOne((type) => Manager)
	manager!: Manager;

	@Column()
	quantity!: number;

	@Column({
		type: 'numeric',
		precision: 14,
		scale: 2
	})
	cost!: number;
}

export default Outgoing;
