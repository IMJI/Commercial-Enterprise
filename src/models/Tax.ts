import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Tax {
    @PrimaryGeneratedColumn()
    id : number;

    @Column({ length: 64 })
    name : string;

    @Column('double')
    value : number;

    @Column('boolean')
    isDeleted : boolean;
}

export default Tax;