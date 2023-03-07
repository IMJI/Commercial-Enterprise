import {
	Entity,
	Column,
	BaseEntity,
	JoinColumn,
	OneToOne,
	PrimaryColumn,
	Check
} from 'typeorm';
import Product from '../product/Product';

@Entity()
class Stock extends BaseEntity {
	@PrimaryColumn()
	productVendorCode!: number;

	@OneToOne((type) => Product, (product) => product.vendorCode)
	@JoinColumn({ name: 'productVendorCode' })
	public product!: Product;

	@Column()
	@Check('"quantity" >= 0')
	quantity!: number;
}

export default Stock;
