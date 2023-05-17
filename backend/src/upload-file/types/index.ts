export type UpLoadSingleFileParams = {
    file: Express.Multer.File;
};

export type UploadFileResult = {
    public_id: string;
    url: string;
};
