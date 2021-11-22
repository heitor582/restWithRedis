import fs from 'fs';
import path from 'path';
import upload from '../../../config/upload';
import aws, { S3 } from 'aws-sdk';
import mime from 'mime';

export default class S3StorageProvider {
    private client: S3;

    constructor() {
        this.client = new aws.S3({
            region: 'us-east-1',
        });
    }

    public async saveFile(file: string): Promise<string> {
        const originalPath = path.resolve(upload.tmpFolder, file);
        const contentType = mime.extension(originalPath);

        if (!contentType) {
            throw new Error('file not found');
        }
        const fileContent = await fs.promises.readFile(originalPath);
        await this.client
            .putObject({
                Bucket: upload.config.aws.bucket,
                Key: file,
                ACL: 'public-read',
                Body: fileContent,
                ContentType: contentType,
            })
            .promise();
        await fs.promises.unlink(originalPath);
        return file;
    }
    public async deleteFile(file: string): Promise<void> {
        await this.client
            .deleteObject({
                Bucket: upload.config.aws.bucket,
                Key: file,
            })
            .promise();
    }
}
