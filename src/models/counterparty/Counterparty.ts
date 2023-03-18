import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Address from "../address/Address";

@Entity()
class Counterparty extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    email!: string;

    @Column()
    firstName!: string;

    @Column()
    lastName!: string;

    @Column({ nullable: true })
    patronymic: string;

    @ManyToOne((type) => Address)
    address!: number;
}

export default Counterparty;