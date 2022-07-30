import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import Product from './Product';

@Entity()
class Color {
    @PrimaryGeneratedColumn()
    id : number;

    @Column({ length: 64 })
    name : string;

    @Column('integer')
    redValue : number;

    @Column('integer')
    blueValue : number;

    @Column('integer')
    greenValue : number;

    @Column({
        default: false
    })
    isDeleted : boolean;

    @OneToMany(() => Product, (product : Product) => product.color)
    products : Product[];
}

export default Color;