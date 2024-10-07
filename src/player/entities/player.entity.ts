import { Role } from "src/common/enums/role.enum";
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;


}
