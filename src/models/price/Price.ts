import {
	Entity,
	Column,
	BaseEntity,
	PrimaryColumn,
	JoinColumn,
	OneToOne,
	ManyToOne,
	CreateDateColumn
} from 'typeorm';
import Product from '../product/Product';

@Entity()
class Price extends BaseEntity {
	@PrimaryColumn()
	productId!: number;

	@PrimaryColumn()
	dateFrom!: Date;

	@ManyToOne((type) => Product, (product) => product.vendorCode)
	@JoinColumn({ name: 'productId' })
	public product!: Product;

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
