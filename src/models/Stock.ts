import { Entity, Column, BaseEntity, PrimaryColumn, JoinColumn, OneToOne, PrimaryGeneratedColumn, Check } from 'typeorm';
import Product from './Product';

@Entity()
class Stock extends BaseEntity {
	@PrimaryGeneratedColumn()
	id!: number;

	@OneToOne((type) => Product)
	@JoinColumn()
	product!: Product;

	@Column()
	@Check('"quantity" > 0')
	quantity!: number;
}

export default Stock;
