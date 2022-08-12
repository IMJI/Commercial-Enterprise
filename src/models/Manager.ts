import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	OneToMany,
	ManyToOne
} from 'typeorm';

@Entity()
class Manager {
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

	@Column({
		nullable: true
	})
	@ManyToOne(() => Manager, (manager: Manager) => manager.id)
	parent: number;

	// @Column({
	//     nullable: true
	// })
	//     @OneToMany(() => Manager, (manager : Manager) => manager.parent)
	//     subordinates : Manager[];
}

export default Manager;
