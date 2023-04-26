import express, { Router } from 'express';

const router = new Router();

//Image paths
const UPLOAD_PATH = process.env.UPLOAD_PATH;
router.use('/', express.static(UPLOAD_PATH));

export default router;
