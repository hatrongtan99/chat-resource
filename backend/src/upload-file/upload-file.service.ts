import { Inject, Injectable } from '@nestjs/common';
import { v2 } from 'cloudinary';
import { UpLoadSingleFileParams, UploadFileResult } from './types';

@Injectable()
export class UploadFileService {
    constructor() {}
    uploadSingleFile(
        params: UpLoadSingleFileParams,
    ): Promise<UploadFileResult> {
        return new Promise((resole, reject) => {
            v2.uploader
                .upload_stream({ resource_type: 'auto' }, (err, result) => {
                    if (err) {
                        return reject(err);
                    }
                    return resole({
                        public_id: result.public_id,
                        url: result.secure_url,
                    });
                })
                .end(params.file.buffer);
        });
    }
}
