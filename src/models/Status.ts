import { Entity, Column, BaseEntity, PrimaryColumn, JoinColumn, OneToOne, ManyToOne } from 'typeorm';
import Outgoing from './Outgoing';

@Entity()
class Status extends BaseEntity {
	@PrimaryColumn()
	outgoingId!: number;

	@ManyToOne((type) => Outgoing, (outgoing) => outgoing.id)
	@JoinColumn({ name: 'outgoingId' })
	public outgoing!: Outgoing;

	@PrimaryColumn()
	dateFrom!: Date;

	@Column({ nullable: true })
	dateTo?: Date;

	@Column()
	status!: string;
}

export default Status;
