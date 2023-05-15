import { Inject, Injectable } from '@nestjs/common';
import { v2 } from 'cloudinary';
import { UpLoadMutipleFileParams, UpLoadSingleFileParams } from './types';

@Injectable()
export class UploadFileService {
    constructor() {}
    uploadSingleFile(params: UpLoadSingleFileParams) {
        return new Promise((resole, reject) => {
            v2.uploader
                .upload_stream({ folder: 'images' }, (err, result) => {
                    if (err) {
                        return reject(err);
                    }
                    return resole(result);
                })
                .end(params.file.buffer);
        });
    }

    uploadMutipleFile(params: UpLoadMutipleFileParams) {}
}
