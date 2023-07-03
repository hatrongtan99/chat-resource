import { Controller, Get } from '@nestjs/common';
import { Public } from 'src/auth/decorators/public';
import { TestService } from './test.service';

@Controller('test')
export class TestController {
    constructor(private testService: TestService) {}

    @Public()
    @Get()
    getMessageAttachment() {
        return this.testService.getAttachment();
    }
}
