import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Tournament } from '../../tournament/entities/tournament.entity';


@Entity()
export class Match extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: true })
    winnerId: string; 

    @Column({nullable:true})
    loserId: string;

    @Column('simple-array')
    players : string[]

    @ManyToOne(() => Tournament, (tournament) => tournament.matches)
    tournament: Tournament;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
