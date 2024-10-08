import { BaseEntity, Column, CreateDateColumn, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Player } from '../../player/entities/player.entity';
import { Match } from '../../match/entities/match.entity';

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

    @OneToMany(() => Match, (match) => match.tournament)
    matches: Match[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
