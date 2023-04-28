import { baseCRUD } from '../base.route.js'
import multer from 'multer';
import dotenv from 'dotenv';
import { ProductController } from './product.controller.js';
dotenv.config();

export default baseCRUD(ProductController, {
  middleware: [
    multer({ dest: process.env.UPLOAD_PATH }).fields([{ name: "newImages" }])
  ]
});
