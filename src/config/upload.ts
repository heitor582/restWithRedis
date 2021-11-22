import multer, { StorageEngine } from 'multer';
import path from 'path';
import crypto from 'crypto';

const uploadFolder = path.resolve(__dirname, '..', '..', 'uploads');
const tempFolder = path.resolve(__dirname, '..', '..', 'temp');

interface IUploadConfig {
    driver: 's3' | 'disk';
    tmpFolder: string;
    directory: string;
    multer: {
        storage: StorageEngine;
    };
    config: {
        aws: {
            bucket: string;
        };
    };
}

export default {
    directory: uploadFolder,
    tmpFolder: tempFolder,
    driver: process.env.STORAGE_DRIVER,
    multer: {
        storage: multer.diskStorage({
            destination: uploadFolder,
            filename(req, file, callback) {
                const fileHash = crypto.randomBytes(10).toString('hex');
                const filename = `${fileHash}-${file.originalname}`;

                callback(null, filename);
            },
        }),
    },
    config: {
        aws: {
            bucket: 'api-vendas',
        },
    },
} as IUploadConfig;
