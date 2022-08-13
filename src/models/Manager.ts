import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, BaseEntity } from 'typeorm';

@Entity()
class Manager extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ length: 64 })
	firstName: string;

	@Column({ length: 64 })
	lastName: string;

	@Column({ length: 64 })
	patronymic: string;

	@Column()
	percent: number;

	@Column()
	hireDate: Date;

	@Column()
	dismissalDate: Date;

	@ManyToOne((type) => Manager, (manager) => manager.children)
	parent?: Manager;

	@OneToMany((type) => Manager, (manager) => manager.parent)
	children?: Manager[];
}

export default Manager;
