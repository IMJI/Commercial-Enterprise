import { Entity, Column, BaseEntity, PrimaryColumn, JoinColumn, OneToOne, ManyToOne } from 'typeorm';
import Product from './Product';

@Entity()
class Price extends BaseEntity {
	//@PrimaryColumn()
	@ManyToOne(() => Product)
	product: Product;

	@PrimaryColumn()
	dateFrom: Date;

	@Column({ nullable: true })
	dateTo?: Date;

	@Column()
	value: number;
}

export default Price;
