import { NotFound } from '../errors/errors.js';

export const BaseController = (mongooseModel) =>
  class BaseController {
    static find(query = {}) {
      return mongooseModel.find(query);
    }

    static async getById({ id } = {}) {
      const result = await mongooseModel.findById(id);
      if (!result) throw new NotFound();
      return result;
    }

    static create(data) {
      return new mongooseModel(data).save();
    }

    static async update(data) {
      const updated = await mongooseModel.findByIdAndUpdate(
        data.id,
        data,
        {
          new: true,
        }
      );
      if (!updated) throw new NotFound();
      return updated;
    }

    static async delete({ id }) {
      const deleted = await mongooseModel.findByIdAndDelete({ id });
      if (!deleted) throw new NotFound();
      return { message: 'Deleted successfully' };
    }
  };
