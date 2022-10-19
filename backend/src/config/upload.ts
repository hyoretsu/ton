import multer, { StorageEngine } from 'multer';
import path from 'path';

interface IUploadConfig {
    driver: 'disk';

    uploadsFolder: string;

    multer: {
        storage: StorageEngine;
    };
}

const uploadsFolder = path.resolve(process.env.ENVIRONMENT === 'production' ? 'storage' : 'tmp/uploads');

export default {
    driver: process.env.STORAGE_DRIVER,

    uploadsFolder,

    multer: {
        storage: multer.diskStorage({
            destination(req, file, cb) {
                return cb(null, uploadsFolder);
            },
            filename(req, file, cb) {
                return cb(null, file.originalname);
            },
        }),
    },
} as IUploadConfig;
