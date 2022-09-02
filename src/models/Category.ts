import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import Product from './Product';

@Entity()
class Category {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ length: 64 })
	name!: string;

	@Column({ default: false })
	isDeleted!: boolean;

	@OneToMany(() => Product, (product: Product) => product.category)
	products: Product[];
}

export default Category;
