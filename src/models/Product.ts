import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';
import Category from './Category';

@Entity()
class Product {
    @PrimaryColumn()
    vendorCode : number;

    @Column({ length: 64 })
    name : string;

    @OneToOne(() => Category)
    @JoinColumn()
    category : Category;

    @Column({ length: 64 })
    color : string;

    @Column({ length: 64 })
    size : string;

    @Column('text')
    description : string;

    @Column('boolean')
    isDeleted : boolean;
}

export default Product;