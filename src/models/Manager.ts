import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';

@Entity()
class Manager {
    @PrimaryGeneratedColumn()
    id : number;

    @Column({ length: 64 })
    firstName : string;

    @Column({ length: 64 })
    lastName : string;

    @Column({ length: 64 })
    patronymic : string;

    @Column('double')
    percent : number;

    @Column('date')
    hireDate : Date;

    @Column('date')
    dismissalDate : Date;

    @ManyToOne(() => Manager, manager => manager.subordinates)
    parent : Manager;

    @OneToMany(() => Manager, manager => manager.parent)
    subordinates : Manager[];
}

export default Manager;