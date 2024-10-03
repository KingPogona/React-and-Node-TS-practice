import ExampleModel from '../models/exampleModel.js';
import { IExample } from '../models/exampleModel.js';

class ExampleService {
  static async createExample(name: string, value: number): Promise<IExample> {
    return await ExampleModel.create({ name, value });
  }
  static async getExampleData(): Promise<IExample[]> {
    return await ExampleModel.find();
  }
}

export default ExampleService;