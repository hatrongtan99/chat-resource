import { DynamicModule, Module } from '@nestjs/common';
import { UploadFileModule } from 'src/upload-file/upload-file.module';
import { MessageAttachmentSevice } from './messageAttachment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupMessageAttachments, MessageAttachment } from 'src/db/entities';

@Module({
    imports: [TypeOrmModule.forFeature([MessageAttachment]), UploadFileModule],
    providers: [MessageAttachmentSevice],
    exports: [MessageAttachmentSevice],
})
export class MessageAttachmentModule {}
