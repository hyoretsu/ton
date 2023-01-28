import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ForgotPasswordService from '@modules/users/services/ForgotPasswordService';

export default class ForgotPasswordController {
    public async create(req: Request, res: Response): Promise<Response> {
        const { email } = req.body;

        const forgotPasswordService = container.resolve(ForgotPasswordService);

        await forgotPasswordService.execute(email);

        return res.json();
    }
}
