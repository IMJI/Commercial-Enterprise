import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	OneToMany,
	ManyToOne,
	BaseEntity
} from 'typeorm';

@Entity()
class Manager extends BaseEntity {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({
		type: 'numeric',
		precision: 3,
		scale: 2
	})
	percent!: number;

	@Column()
	hireDate!: Date;

	@Column({ nullable: true })
	dismissalDate: Date;

	@ManyToOne((type) => Manager, (manager) => manager.children)
	parent?: Manager;

	@OneToMany((type) => Manager, (manager) => manager.parent)
	children?: Manager[];
}

export default Manager;
