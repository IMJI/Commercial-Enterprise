import {
	Entity,
	Column,
	BaseEntity,
	PrimaryColumn,
	JoinColumn,
	OneToOne,
	ManyToOne
} from 'typeorm';
import Product from './product/Product';

@Entity()
class Price extends BaseEntity {
	@PrimaryColumn()
	productId!: number;

	@PrimaryColumn()
	dateFrom!: Date;

	@ManyToOne(() => Product, (product) => product.vendorCode)
	@JoinColumn({ name: 'productId' })
	product!: Product;

	@Column({ nullable: true })
	dateTo?: Date;

	@Column({
		type: 'numeric',
		precision: 10,
		scale: 2
	})
	value!: number;
}

export default Price;
