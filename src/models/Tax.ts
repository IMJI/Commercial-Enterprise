import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Tax {
    @PrimaryGeneratedColumn()
    id : number;

    @Column({ length: 64 })
    name : string;

    @Column()
    value : number;

    @Column({ default: false })
    isDeleted : boolean;
}

export default Tax;