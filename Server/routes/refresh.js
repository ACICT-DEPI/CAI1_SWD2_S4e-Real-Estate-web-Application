import express from 'express';
const router = express.Router();
import refreshTokenController from '../controller/refreshTokenController.js';

router.get('/', refreshTokenController);


export default router;