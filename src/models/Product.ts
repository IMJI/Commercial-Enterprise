import { Entity, Column, PrimaryColumn, ManyToOne, OneToOne  } from 'typeorm';
import Category from './Category';
import Color from './Color';
import Size from './Size';

@Entity()
class Product {
    @PrimaryColumn()
    vendorCode : number;

    @Column({ length: 64 })
    name : string;

    @ManyToOne(() => Category, (category : Category) => category.products)
    category : Category;

    @ManyToOne(() => Color, (color : Color) => color.products)
    color : Color;

    // @ManyToOne(() => Size, (size : Size) => size.products)
    // size : Size;
    @OneToOne(() => Size, (size : Size) => size.product)
    size : Size;

    @Column({
        type: 'text',
        nullable: true
    })
    description : string;

    @Column({
        type: 'boolean',
        default: false
    })
    isDeleted : boolean;
}

export default Product;