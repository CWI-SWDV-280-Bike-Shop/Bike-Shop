import ProductModel from '../products/product.model.js';

const ExtractLabels = () => {
  let labels = ProductModel.schema.obj
  console.log(labels);
  //Data processing
  labels = Object.fromEntries(Object.entries(labels).filter(([key, value]) => !key.includes("imageIds") && value.enum));
  let reducedLabels = {}
  Object.keys(labels).forEach((key) => reducedLabels[key] = labels[key].enum.filter((v) => v!=null && v!=""));
  return reducedLabels
}


const ProductLabelsController = {

  async getLabels(req, res) {
    try {
      const results = ExtractLabels();
      res.status(200).json(results);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

};

export default ProductLabelsController;