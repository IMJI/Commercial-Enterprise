import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Category {
    @PrimaryGeneratedColumn()
    id : number;

    @Column({ length: 64 })
    name : string;

    @Column('boolean')
    isDeleted : boolean;
}

export default Category;