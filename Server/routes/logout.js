import express from 'express';
const router = express.Router();
import logoutController from '../controller/logoutController.js';

router.get('/', logoutController);


export default router;