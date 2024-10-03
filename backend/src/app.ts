import express, { Application } from 'express';
import exampleRoutes from './routes/exampleRoutes.js';
import { config } from './config/config.js';
import { connectToDatabase } from './config/mongooseConfig.js';

const app: Application = express();

app.use(express.json());
app.use('/api', exampleRoutes);

connectToDatabase();

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});