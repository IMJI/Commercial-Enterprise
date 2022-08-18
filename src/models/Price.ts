import { Entity, Column, BaseEntity, PrimaryColumn, JoinColumn, OneToOne, ManyToOne } from 'typeorm';
import Product from './Product';

class Price extends BaseEntity {
    @PrimaryColumn()
    @ManyToOne(() => Product)
    product: Product;

    @PrimaryColumn()
    dateFrom: Date;

    @Column()
    dateTo: Date;

    @Column()
    value: number;
}

export default Price;
