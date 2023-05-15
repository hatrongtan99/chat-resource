import { Module } from '@nestjs/common';
import { MessagePrivateService } from './message-private.service';
import { MessagePrivateController } from './message-private.controller';

@Module({
  providers: [MessagePrivateService],
  controllers: [MessagePrivateController]
})
export class MessagePrivateModule {}
