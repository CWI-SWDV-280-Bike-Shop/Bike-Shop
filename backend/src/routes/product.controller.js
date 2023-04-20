import { BaseController } from './base.controller.js';

function withImageFilenames(data) {
  return { ...data, images: data.files?.images?.map((upload) => upload?.filename) };
}

export const ProductController = (mongooseModel) => class extends BaseController(mongooseModel) {
  static create(productData) {
    return super.create(withImageFilenames(productData));
  }

  static update(productData) {
    return super.update(withImageFilenames(productData));
  }
}
