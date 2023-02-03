import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	OneToOne,
	JoinColumn,
	BaseEntity,
	CreateDateColumn,
	UpdateDateColumn
} from 'typeorm';
import Manager from '../manager/Manager';
import UserPassword from './UserPassword';

@Entity()
class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ length: 64 })
	email!: string;

	@Column({ length: 64 })
	firstName!: string;

	@Column({ length: 64 })
	lastName!: string;

	@Column({
		length: 64,
		nullable: true
	})
	patronymic: string;

	@OneToOne(() => Manager)
	@JoinColumn()
	manager!: Manager;

	@Column()
	role!: string;

	@OneToOne(() => UserPassword)
	@JoinColumn()
	password!: UserPassword;

	@CreateDateColumn()
	createdAt!: Date;

	@UpdateDateColumn()
	updatedAt!: Date;
}

export default User;
