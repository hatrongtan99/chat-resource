import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupMessageAttachments, MessageAttachment } from 'src/db/entities';
import { Attachment } from 'src/message-private/types';
import { UploadFileService } from 'src/upload-file/upload-file.service';
import { Repository } from 'typeorm';

@Injectable()
export class MessageAttachmentSevice {
    constructor(
        @InjectRepository(MessageAttachment)
        private readonly messageAttachmentRepository: Repository<MessageAttachment>,
        @InjectRepository(MessageAttachment)
        private readonly groupMessageAttachmentRepository: Repository<GroupMessageAttachments>,
        private readonly uploadFileService: UploadFileService,
    ) {}

    uploadAttachmentMessagePrivate(
        attachments: Attachment[],
    ): Promise<MessageAttachment[]> {
        const promise = attachments.map((attachment) => {
            return this.uploadFileService
                .uploadSingleFile({ file: attachment.file })
                .then(({ public_id, url }) => {
                    const newMessageAttachment =
                        this.messageAttachmentRepository.create({
                            public_id,
                            url,
                            type: attachment.type,
                            file_name: attachment.file_name,
                        });
                    return this.messageAttachmentRepository.save(
                        newMessageAttachment,
                    );
                });
        });
        return Promise.all(promise);
    }

    uploadAttachmentsGroupMessage(
        attachments: Attachment[],
    ): Promise<GroupMessageAttachments[]> {
        const promise = attachments.map((attachment) => {
            return this.uploadFileService
                .uploadSingleFile({ file: attachment.file })
                .then(({ public_id, url }) => {
                    const newGroupMessageAttachment =
                        this.groupMessageAttachmentRepository.create({
                            public_id,
                            url,
                            file_name: attachment.file_name,
                            type: attachment.type,
                        });
                    return this.groupMessageAttachmentRepository.save(
                        newGroupMessageAttachment,
                    );
                });
        });
        return Promise.all(promise);
    }
}
