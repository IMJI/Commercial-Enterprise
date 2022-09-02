import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import Product from './Product';

@Entity()
class Color {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ length: 64 })
	name!: string;

	@Column()
	redValue!: number;

	@Column()
	blueValue!: number;

	@Column()
	greenValue!: number;

	@Column({
		default: false
	})
	isDeleted!: boolean;

	@OneToMany(() => Product, (product: Product) => product.color)
	products: Product[];
}

export default Color;
