import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupMessageAttachments, MessageAttachment } from 'src/db/entities';
import { Repository } from 'typeorm';

@Injectable()
export class TestService {
    constructor(
        @InjectRepository(MessageAttachment)
        private readonly repo: Repository<
            MessageAttachment | GroupMessageAttachments
        >,
        @Inject('REPOSITORY') private valueRepo: any,
    ) {}

    getAttachment() {
        console.log(this.valueRepo);
    }
}
