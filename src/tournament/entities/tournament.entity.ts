import { BaseEntity, Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Player } from '../../player/entities/player.entity';

@Entity()
export class Tournament extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    date: Date;

    @Column()
    duration: number; 

    @ManyToMany(() => Player, (player) => player.tournaments)
    players: Player[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
