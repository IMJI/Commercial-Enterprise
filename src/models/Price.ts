import { Entity, Column, BaseEntity, PrimaryColumn, JoinColumn, OneToOne, ManyToOne } from 'typeorm';
import Product from './Product';

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

	@Column()
	value!: number;
}

export default Price;
