import { BaseController } from '../base.controller.js';
import Product from './product.model.js';

function withImageFilenames(data) {
  return { ...data, imageIds: [...data.imageIds ?? [], ...data.files?.newImages?.map((upload) => upload?.filename) ?? []] };
}

export class ProductController extends BaseController(Product) {
  static create(productData) {
    return super.create(withImageFilenames(productData));
  }

  static update(productData) {
    return super.update(withImageFilenames(productData));
  }
}
