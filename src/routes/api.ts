import { Router } from 'express';
import * as ApiController from '../controllers/apiController';
import * as EmailController from '../controllers/emailController';

const router = Router();

router.get('/list', ApiController.list);

router.post('/contato', EmailController.contato);

export default router;