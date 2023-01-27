import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	OneToOne,
	JoinColumn,
	BaseEntity
} from 'typeorm';
import Manager from './manager/Manager';
import UserPassword from './UserPassword';

@Entity()
class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	id!: number;

	@OneToOne(() => UserPassword)
	@JoinColumn()
	manager!: Manager;

	@Column()
	role!: string;

	@OneToOne(() => UserPassword)
	@JoinColumn()
	password!: UserPassword;
}

export default User;
