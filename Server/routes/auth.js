// const express = require('express');
import express from 'express';
const router = express.Router();
import authController from '../controller/authController.js';

router.post('/', authController);

export default router;