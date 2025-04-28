import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Project {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    owner!: string;

    @Column()
    name!: string;

    @Column()
    url!: string;

    @Column()
    stars!: number;

    @Column()
    forks!: number;

    @Column()
    issues!: number;

    @Column({ type: 'bigint' })
    createdAtGithub!: number; // Unix timestamp

    @ManyToOne(() => User, user => user.id)
    user!: User;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}
