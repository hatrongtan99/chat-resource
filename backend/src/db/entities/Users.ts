import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    JoinColumn,
} from 'typeorm';
import { Profile } from './Profile';

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

    @OneToOne(() => Profile, { cascade: true })
    @JoinColumn()
    profile: Profile;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
