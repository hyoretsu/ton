import nodemailer, { Transporter } from 'nodemailer';

import ISendMailDTO from '../dtos/ISendMailDTO';
import IMailProvider from '../models/IMailProvider';

export default class EtherealMailProvider implements IMailProvider {
    private client: Transporter;

    constructor() {
        nodemailer.createTestAccount().then(account => {
            const transporter = nodemailer.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth: {
                    user: account.user,
                    pass: account.pass,
                },
            });

            this.client = transporter;
        });
    }

    public async sendMail({ from, to, subject, body: text }: ISendMailDTO): Promise<void> {
        const message = await this.client.sendMail({
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

        console.log('Message sent:', message);
        console.log('Preview URL:', nodemailer.getTestMessageUrl(message));
    }
}
