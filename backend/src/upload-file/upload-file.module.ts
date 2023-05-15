import { DynamicModule, Module, Provider } from '@nestjs/common';
import { UploadFileService } from './upload-file.service';
import { v2 } from 'cloudinary';
import { ConfigService } from '@nestjs/config';
import {
    CLOUDINARY_API_SECRET,
    CLOUDINARY_API_KEY,
    CLOUDINARY_NAME,
} from 'src/utils/contant';

const cloudinaryProvider = {
    provide: 'CLOUDINARY',
    useFactory: (configService: ConfigService) => {
        return v2.config({
            cloud_name: configService.get<string>(CLOUDINARY_NAME),
            api_key: configService.get<string>(CLOUDINARY_API_KEY),
            api_secret: configService.get<string>(CLOUDINARY_API_SECRET),
        });
    },
    inject: [ConfigService],
} as Provider;

@Module({
    providers: [cloudinaryProvider, UploadFileService],
    exports: [cloudinaryProvider, UploadFileService],
})
export class UploadFileModule {}
