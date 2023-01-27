import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	OneToOne,
	BaseEntity
} from 'typeorm';

@Entity()
class UserPassword extends BaseEntity {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column()
	hash!: string;
}

export default UserPassword;
