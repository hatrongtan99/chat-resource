import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    JoinColumn,
    OneToMany,
    ManyToMany,
    JoinTable,
} from 'typeorm';
import { Profile } from './Profile';
import { Message } from './Message';
import { Group } from './Group';

export enum ProviderType {
    LOCAL = 'lOCAL',
    FACEBOOK = 'FACEBOOK',
    GOOGLE = 'GOOGLE',
}

@Entity('users')
export class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    fullname: string;

    @Column({ nullable: true, unique: true })
    email: string;

    @Column({ nullable: true, select: false })
    password: string;

    @Column({ type: 'enum', enum: ProviderType, default: ProviderType.LOCAL })
    provider: string;

    @Column({ nullable: true })
    provider_id: string;

    @Column({ default: false })
    active: boolean;

    @ManyToMany(() => Group, (group) => group.users)
    group: Group[];

    @ManyToMany(() => Users, (user) => user.friends)
    @JoinTable({
        name: 'relate_friends',
    })
    friends: Users[];

    @OneToOne(() => Profile, (profile) => profile.user, { cascade: true })
    @JoinColumn()
    profile: Profile;

    @OneToMany(() => Message, (message) => message.author)
    messages: Message[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
