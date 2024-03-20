import {
    ArgumentMetadata,
    BadRequestException,
    Injectable,
    PipeTransform,
} from '@nestjs/common';
import { AboutItem } from '../dto';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ValidationAboutProfile implements PipeTransform {
    async transform(value: string, metadata: ArgumentMetadata) {
        if (!value) return null;

        const about: AboutItem[] = JSON.parse(value);

        const res = await Promise.all(
            about.map((item) => {
                return validate(plainToInstance(AboutItem, item));
            }),
        );

        if (res.some((err) => err.length > 0)) {
            throw new BadRequestException('Invalid about content');
        }

        return about;
    }
}
