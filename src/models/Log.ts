import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	ManyToOne,
	BaseEntity,
	CreateDateColumn
} from 'typeorm';
import Manager from './manager/Manager';
import Outgoing from './Outgoing';

@Entity()
class Log extends BaseEntity {
	@PrimaryGeneratedColumn()
	id!: number;

	@ManyToOne((type) => Manager)
	manager!: Manager;

	@ManyToOne((type) => Outgoing)
	outgoing!: Outgoing;

	@CreateDateColumn()
	timestamp!: Date;

	@Column({ length: 64 })
	action!: string;
}

export default Log;
