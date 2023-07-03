import { Module } from '@nestjs/common';
import { GroupMessageController } from './groupMessage.controller';
import { GroupMessageService } from './groupMessage.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupMessage } from 'src/db/entities';
import { MessageAttachmentModule } from 'src/messageAttachment/messgaeAttachment.module';
import { GroupModule } from 'src/group/group.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([GroupMessage]),
        GroupModule,
        MessageAttachmentModule,
    ],
    exports: [GroupMessageService],
    providers: [GroupMessageService],
    controllers: [GroupMessageController],
})
export class GroupMessageModule {}
