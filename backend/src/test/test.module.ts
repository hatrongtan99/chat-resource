import { DynamicModule, Module } from '@nestjs/common';
import { GroupMessageAttachments, MessageAttachment } from 'src/db/entities';
import { TestService } from './test.service';
import { UploadFileModule } from 'src/upload-file/upload-file.module';
import { TestController } from './test.controller';
import { Repository } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({})
export class TestModule {
    static forfeature(
        useRepository: Repository<MessageAttachment>,
    ): DynamicModule {
        return {
            module: TestModule,
            imports: [
                UploadFileModule,
                TypeOrmModule.forFeature([MessageAttachment]),
            ],
            providers: [TestService],
            exports: [TestService],
            controllers: [TestController],
        };
    }
}
