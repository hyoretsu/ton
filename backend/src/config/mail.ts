interface IMailConfig {
    driver: 'ethereal' | 'nodemailer';
    defaults: {
        from: {
            email: string;
            name: string;
        };
    };
}

export default {
    defaults: {
        from: {
            email: '',
            name: '',
        },
    },
    driver: process.env.MAIL_DRIVER,
} as IMailConfig;
