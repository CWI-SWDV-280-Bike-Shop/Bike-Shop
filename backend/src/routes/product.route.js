import { baseCRUD } from './base.route.js'
import multer from 'multer';
import dotenv from 'dotenv';
dotenv.config();

export const productRoute = (controller) => baseCRUD(controller, {
  middleware: [
    multer({ dest: process.env.UPLOAD_PATH }).fields([{ name: "images" }])
  ]
});
