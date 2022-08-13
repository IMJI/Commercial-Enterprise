import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';

@Entity()
class UserPassword {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	hash: string;
}

export default UserPassword;
