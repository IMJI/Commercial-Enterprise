import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
class Tax extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ length: 64 })
	name: string;

	@Column()
	value: number;

	@Column({ default: false })
	isDeleted: boolean;
}

export default Tax;
