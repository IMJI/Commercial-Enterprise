import {
	BaseEntity,
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryColumn
} from 'typeorm';
import Manager from './manager/Manager';

@Entity()
class Profit extends BaseEntity {
	@PrimaryColumn()
	managerId!: number;

	@ManyToOne((type) => Manager, (manager) => manager.id)
	@JoinColumn({ name: 'managerId' })
	public manager!: Manager;

	@PrimaryColumn()
	dateFrom!: Date;

	@Column({ nullable: true })
	dateTo?: Date;

	@Column()
	profit!: number;
}

export default Profit;
