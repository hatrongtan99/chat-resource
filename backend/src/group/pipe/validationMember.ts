import {
    ArgumentMetadata,
    BadRequestException,
    Injectable,
    PipeTransform,
} from '@nestjs/common';
import { Member } from '../dto';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ValidationMember implements PipeTransform {
    async transform(value: string, metadata: ArgumentMetadata) {
        if (!value) {
            throw new BadRequestException('Users array is not null!!!');
        }

        const users: Member[] = JSON.parse(value);

        const res = await Promise.all(
            users.map((item) => {
                return validate(plainToInstance(Member, item));
            }),
        );

        if (res.some((err) => err.length > 0)) {
            throw new BadRequestException('Invalid member!!!');
        }
        return users;
    }
}
