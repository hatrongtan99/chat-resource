import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import entities from './entities';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService): TypeOrmModule => {
                return {
                    type: 'mysql',
                    host: configService.get('MYSQL_DATABASE_HOST'),
                    port: configService.get('MYSQL_DATABASE_PORT'),
                    username: configService.get('MYSQL_DATABASE_USER'),
                    password: configService.get('MYSQL_DATABASE_PASS'),
                    database: configService.get('MYSQL_DATABASE_NAME'),
                    entities: [...entities],
                    synchronize: true,
                };
            },
        }),
    ],
})
export class DbModule {}
