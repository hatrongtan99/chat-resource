import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Users } from './Users';
import { GroupMessage } from './GroupMessage';

@Entity({ name: 'group' })
export class Group {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @OneToOne(() => Users, { createForeignKeyConstraints: false })
    @JoinColumn()   
    creator: Users;

    @OneToOne(() => Users, { createForeignKeyConstraints: false })
    @JoinColumn()
    owner: Users;

    @ManyToMany(() => Users, (user) => user.group)
    @JoinTable({
        name: 'group_users',
        joinColumn: {
            name: 'group_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'user_id',
            referencedColumnName: 'id',
        },
    })
    users: Users[];

    @OneToMany(() => GroupMessage, (groupMessage) => groupMessage.group)
    @JoinColumn()
    messages: GroupMessage[];

    @OneToOne(() => GroupMessage, { cascade: true })
    @JoinColumn()
    lastMessageSent: GroupMessage;

    @Column()
    avatar: string;

    @CreateDateColumn()
    create_at: Date;

    @UpdateDateColumn()
    update_at: Date;
}
