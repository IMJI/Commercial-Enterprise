import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';
import Category from './Category';
import Color from './Color';
import Size from './Size';

@Entity()
class Product {
    @PrimaryColumn()
    vendorCode : number;

    @Column({ length: 64 })
    name : string;

    @OneToOne(() => Category)
    @JoinColumn()
    category : Category;

    @OneToOne(() => Color)
    @JoinColumn()
    color : Color;

    @OneToOne(() => Size)
    @JoinColumn()
    size : Size;

    @Column('text')
    description : string;

    @Column('boolean')
    isDeleted : boolean;
}

export default Product;