import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
class Tax extends BaseEntity {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ length: 64 })
	name!: string;

	@Column({
		type: 'numeric',
		precision: 3,
		scale: 2
	})
	value!: number;

	@Column({ default: false })
	isDeleted!: boolean;
}

export default Tax;
