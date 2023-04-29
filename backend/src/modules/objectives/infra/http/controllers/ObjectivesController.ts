import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateObjectiveService from '@modules/objectives/services/CreateObjectiveService';
import DeleteObjectiveService from '@modules/objectives/services/DeleteObjectiveService';
import ListObjectivesService from '@modules/objectives/services/ListObjectivesService';
import UpdateObjectiveService from '@modules/objectives/services/UpdateObjectiveService';

export default class ObjectivesController {
    public async create(req: Request, res: Response): Promise<Response> {
        const { body } = req;

        const createObjective = container.resolve(CreateObjectiveService);

        const objective = await createObjective.execute(body);

        return res.json(objective);
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        const deleteObjectiveService = container.resolve(DeleteObjectiveService);

        await deleteObjectiveService.execute({
            objectiveId: req.params.id,
            userId: req.user.id as string,
        });

        return res.json();
    }

    public async show(req: Request, res: Response): Promise<Response> {
        const listObjectives = container.resolve(ListObjectivesService);

        const objectives = await listObjectives.execute(req.params.id);

        return res.json(objectives);
    }

    public async update(req: Request, res: Response): Promise<Response> {
        const { body } = req;

        const updateObjective = container.resolve(UpdateObjectiveService);

        const objective = await updateObjective.execute(body);

        return res.json(objective);
    }
}
