import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import Manager from './Manager';
import UserPassword from './UserPassword';

@Entity()
class User {
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
