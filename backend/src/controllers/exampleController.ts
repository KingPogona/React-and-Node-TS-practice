import { Request, Response } from 'express';
import ExampleService from '../services/exampleService.js';

export const createExample = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, value } = req.body;
    const example = await ExampleService.createExample(name, value);
    res.status(200).json(example);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error: ' + error });
  }
};

export const getExample = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = await ExampleService.getExampleData();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error: ' + error });
  }
};

export const helloWorld = (req: Request, res: Response): void => {
  try {
    res.status(200).send('Hello World');
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error: ' + error });
  }
};