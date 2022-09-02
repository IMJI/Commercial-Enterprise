import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import Product from './Product';

@Entity()
class Size {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ length: 64 })
	name!: string;

	@Column()
	value!: number;

	@OneToOne(() => Product, (product: Product) => product.size)
	@JoinColumn()
	product: Product;
}

export default Size;
