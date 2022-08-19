import { Entity, Column, BaseEntity, PrimaryColumn, JoinColumn, OneToOne, ManyToOne } from 'typeorm';
import Outgoing from './Outgoing';

@Entity()
class Status extends BaseEntity {
    //@PrimaryColumn()
    @ManyToOne(() => Outgoing)
    @PrimaryColumn()
    outgoing: Outgoing;

    @PrimaryColumn()
    dateFrom: Date;

    @Column({ nullable: true })
    dateTo?: Date;

    @Column()
    status: string;
}

export default Status;