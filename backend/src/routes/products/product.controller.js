import { UserError } from '../../errors/errors.js';
import { BaseController } from '../base.controller.js';
import Product from './product.model.js';

const withImageUrls = ({ appBaseURL }) => ({ _doc }) => ({
  ..._doc, images: _doc.images?.map((image) => ({
    url: new URL(`/api/images/${image.id}`, appBaseURL).href,
    id: image.id,
  }))
});

const withImageIds = (data) => ({
  ...data, images: data.images?.map((image) => {
    if (image.id) return image;
    if (isNaN(image.newImageIndex)) throw new UserError('Image data does not have an existing id or newImageIndex');
    if (!data.files?.newImages) throw new UserError('The multipart field "newImages" does not exist');
    if (!(image.newImageIndex in data.files.newImages)) throw new UserError('newImageIndex is not an index of newImages');
    return {
      id: data.files.newImages[image.newImageIndex].filename
    }
  })
});

export class ProductController extends BaseController(Product) {
  static async find(query = {}, options) {
    return (await super.find(query)).map(withImageUrls(options));
  }

  static async getById(data = {}, options) {
    return withImageUrls(options)(await super.getById(data));
  }

  static create(productData) {
    return super.create(withImageIds(productData));
  }

  static update(productData) {
    return super.update(withImageIds(productData));
  }
}
