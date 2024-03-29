import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	ManyToOne,
	BaseEntity
} from 'typeorm';
import Manager from './manager/Manager';
import Product from './product/Product';
import Tax from './tax/Tax';

@Entity()
class Incoming extends BaseEntity {
	@PrimaryGeneratedColumn()
	id!: number;

	@ManyToOne((type) => Product)
	product!: Product;

	@ManyToOne((type) => Tax)
	tax!: Tax;

	@ManyToOne((type) => Manager)
	manager!: Manager;

	@Column()
	date!: Date;

	@Column()
	quantity!: number;

	@Column({
		type: 'numeric',
		precision: 14,
		scale: 2
	})
	cost!: number;
}

export default Incoming;
