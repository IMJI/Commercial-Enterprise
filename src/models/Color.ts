import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Color {
    @PrimaryGeneratedColumn()
    id : number;

    @Column({ length: 64 })
    name : string;
}

export default Color;