import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Size {
    @PrimaryGeneratedColumn()
    id : number;

    @Column({ length: 64 })
    name : string;

    @Column('double')
    value : number
}

export default Size;