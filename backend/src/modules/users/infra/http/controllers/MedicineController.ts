import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListMedicineService from '@modules/users/services/ListMedicineService';

export default class MedicineController {
    public async show(req: Request, res: Response): Promise<Response> {
        const listMedicineService = container.resolve(ListMedicineService);

        const medicine = await listMedicineService.execute(req.user.id);

        return res.json(medicine);
    }
}
