import { Role } from "../../common/enums/role.enum";
import { Tournament } from "../../tournament/entities/tournament.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Player extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column()
    nickname: string

    @Column()
    age: number

    @Column({nullable:false, unique:true})
    email: string

    @Column({nullable:false , select:false})
    password: string

    @Column({ type: 'enum', default: Role.PLAYER, enum: Role })
    role: Role;

    @ManyToMany(() => Tournament, (tournament) => tournament.players)
    tournaments: Tournament[];


    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;


}
