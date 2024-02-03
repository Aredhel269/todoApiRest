import { Request, Response } from 'express';

import { Task } from '../../domain/entities/task';
import { TaskRepositoryImpl } from '../../infrastructure/database/taskRepositoryImpl';

import { CreateTaskUsecase } from '../../application/createTaskUsecase';
import { GetTaskUsecase } from '../../application/getTaskUsecase';
import { PutTaskUsecase } from '../../application/putTaskUsecase';
import { DeleteTaskUsecase } from '../../application/deleteTaskUsecase';

const taskRepository = new TaskRepositoryImpl();

const createTaskUsecase = new CreateTaskUsecase(taskRepository);
const getTaskUsecase = new GetTaskUsecase(taskRepository);
const putTaskUsecase = new PutTaskUsecase(taskRepository);
const deleteTaskUsecase = new DeleteTaskUsecase(taskRepository);

// Defineix el controlador com un objecte
export const taskController = {
    // Endpoint POST per afegir una nova task
    createTask: (req: Request, res: Response) => {
        const task: Task = req.body;
        const createdTask = createTaskUsecase.execute(task);
        res.status(201).json(createdTask);
    },

    // Endpoint GET per obtenir listTask
    getTasks: (req: Request, res: Response) => {
        const listTasks = getTaskUsecase.execute();
        res.status(200).json(listTasks);
    },

    // Endpoint PUT per actualitzar una task
    putTask: (req: Request, res: Response) => {
        const taskId: number = parseInt(req.params.id);
        const updatedTask: Task = req.body
        const updatedTaskResult = putTaskUsecase.execute (taskId, updatedTask)
        res.status(200).json(updatedTaskResult)
    },

    // Endpoint DELETE per eliminar una task
    deleteTask: (req: Request, res: Response) => {
        const taskId: number = parseInt(req.params.id);
        deleteTaskUsecase.execute(taskId)
        res.status(204).send()
    },
};

export default taskController;
