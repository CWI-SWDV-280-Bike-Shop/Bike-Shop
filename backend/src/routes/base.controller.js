import { NotFound } from '../errors/errors.js';

export const BaseController = (mongooseModel) =>
  class BaseController {
    static modelName = mongooseModel.collection.collectionName;

    static auth = {
      isOwnedByUser(_, __) {
        return false;
      },
      findByPrimary(data) {
        return mongooseModel.findById(data._id);
      }
    }

    static async find(query = {}) {
      const results = await mongooseModel.find(query);
      return {
        type: 'read',
        data: results,
      }
    }

    static async getById(userReq = {}) {
      const result = await this.findById(userReq.id);
      if (!result) throw new NotFound();
      return {
        type: 'read',
        data: result,
      };
    }

    static create(userReq) {
      return {
        type: 'create',
        data: userReq,
        write: (data) => new mongooseModel(data).save()
      };
    }

    static async update(userReq) {
      return {
        type: 'update',
        data: userReq,
        write: async (data) => {
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
      };
    }

    static async delete(userReq) {
      const deleted = await mongooseModel.findByIdAndDelete(userReq.id);
      if (!deleted) throw new NotFound();
      return { type: 'delete', data: userReq,  message: 'Deleted successfully' };
    }
  };
