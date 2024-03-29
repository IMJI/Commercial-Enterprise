import {
	Entity,
	Column,
	PrimaryColumn,
	ManyToOne,
	OneToOne,
	BaseEntity
} from 'typeorm';
import Category from '../category/Category';
// import Color from './Color';
// import Size from './Size';
import Stock from '../Stock';

@Entity()
class Product extends BaseEntity {
	@PrimaryColumn()
	vendorCode!: number;

	@Column({ length: 64 })
	name!: string;

	@ManyToOne(() => Category, (category: Category) => category.products)
	category!: Category;

	// @ManyToOne(() => Color, (color: Color) => color.products)
	// color!: Color;

	// @ManyToOne(() => Size, (size : Size) => size.products)
	// size : Size;
	// @OneToOne(() => Size, (size: Size) => size.product)
	// size!: Size;

	@Column({
		nullable: true,
		length: 512
	})
	description?: string;

	@OneToOne(() => Stock, (stock: Stock) => stock.product)
	stock: Stock;

	@Column({ default: false })
	isDeleted!: boolean;
}

export default Product;
