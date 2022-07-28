import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Category {
    @PrimaryGeneratedColumn()
    id : number;

    @Column({ length: 64 })
    name : string;
}

export default Category;