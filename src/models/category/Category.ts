import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	OneToMany,
	BaseEntity
} from 'typeorm';
import Product from '../product/Product';

@Entity()
class Category extends BaseEntity {
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
