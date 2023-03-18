import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class Address extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    country!: string;

    @Column()
    state?: string;

    @Column()
    city!: string;

    @Column()
    district?: string;

    @Column()
    street!: string;

    @Column()
    building!: string;

    @Column()
    apartment!: string;
}

export default Address;