import { Router } from 'express';
import { createExample, getExample, helloWorld } from '../controllers/exampleController.js';

const router = Router();

router.get('/example', getExample);
router.post('/example', createExample);
router.get('/helloworld', helloWorld);

export default router;