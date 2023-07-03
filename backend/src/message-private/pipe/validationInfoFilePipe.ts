import {
    ArgumentMetadata,
    BadRequestException,
    Injectable,
    PipeTransform,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { InfoFileDTO } from '../dto';
import { InfoFile } from '../types';

@Injectable()
export class ValidationInfoFile implements PipeTransform {
    async transform(value: string, metadata: ArgumentMetadata) {
        if (!value) {
            throw new BadRequestException('Info Files is not null!!');
        }
        const infoFiles: InfoFile[] = JSON.parse(value);
        const [...res] = await Promise.all(
            infoFiles.map((item) =>
                validate(plainToInstance(InfoFileDTO, item)),
            ),
        );
        if (res.some((err) => err.length > 0)) {
            throw new BadRequestException('Invalid Info Files!!!');
        }
        return infoFiles;
    }
}
