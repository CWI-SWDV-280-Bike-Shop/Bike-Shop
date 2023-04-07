import Product from '../models/product.model.js';
import { NotFound } from '../errors.js';

const ProductController = {
  async getProducts(req, res) {
    const products = await Product.find();
    res.status(200).json(products);
  },

  async getProductById(req, res) {
    const product = await Product.findById(req.params.id);
    if (!product) throw new NotFound('Product not found');
    res.status(200).json(product);
  },

  async createProduct(req, res) {
    const product = new Product(req.body);
    const newProduct = await product.save();
    res.status(200).json(newProduct);
  },

  async updateProduct(req, res) {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) throw new NotFound('Product not found');
    res.status(200).json(product);
  },

  async deleteProduct(req, res) {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) throw new NotFound('Product not found');
    res.status(200).json({ message: 'Product deleted successfully' });
  },
};

export default ProductController;
