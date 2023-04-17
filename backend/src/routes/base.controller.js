import { NotFound } from '../errors/errors.js';

export const BaseController = (mongooseModel) =>
  class BaseController {
    static async find(req, res) {
      const results = await mongooseModel.find(req.query);
      res.status(200).json(results);
    }

    static async getById(req, res) {
      const result = await mongooseModel.findById(req.params.id);
      if (!result) throw new NotFound();
      res.status(200).json(result);
    }

    static async create(req, res) {
      const data = new mongooseModel(req.body);
      const newData = await data.save();
      res.status(200).json(newData);
    }

    static async update(req, res) {
      const updated = await mongooseModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );
      if (!updated) throw new NotFound();
      res.status(200).json(updated);
    }

    static async delete(req, res) {
      const deleted = await mongooseModel.findByIdAndDelete(req.params.id);
      if (!deleted) throw new NotFound();
      res.status(200).json({ message: 'Deleted successfully' });
    }
  };
