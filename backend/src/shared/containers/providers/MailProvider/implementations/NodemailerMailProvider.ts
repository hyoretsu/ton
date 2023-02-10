import nodemailer, { Transporter } from 'nodemailer';

import ISendMailDTO from '../dtos/ISendMailDTO';
import IMailProvider from '../models/IMailProvider';

export default class NodemailerMailProvider implements IMailProvider {
    private client: Transporter;

    constructor() {
        this.client = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: Number(process.env.MAIL_PORT),
            secure: true,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });
    }

    public async sendMail({ from, to, subject, body: text }: ISendMailDTO): Promise<void> {
        await this.client.sendMail({
            from: {
                name: from?.name || (process.env.MAIL_DEFAULT_NAME as string),
                address: from?.email || (process.env.MAIL_DEFAULT_ADDRESS as string),
            },
            to: {
                name: to.name,
                address: to.email,
            },
            subject,
            text,
        });
    }
}
