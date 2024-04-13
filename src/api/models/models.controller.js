import { ModelsService } from './models.service.js';

export class ModelsController {
  static async create(req, res, next) {
    try {
      const { id, name, description, context_length, modality, tokenizer } = req.body;

      const model = await ModelsService.create({ id, name, description, context_length, modality, tokenizer });

      res.json(model);
    } catch (e) {
      next(e);
    }
  }

  static async get(req, res, next) {
    try {
      const { id } = req.query;

      const model = await ModelsService.get(id);

      res.json(model);
    } catch (e) {
      next(e);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.query;
      const { name, description, context_length, modality, tokenizer } = req.body;

      const model = await ModelsService.update(id, { name, description, context_length, modality, tokenizer });

      res.json(model);
    } catch (e) {
      next(e);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.query;

      const model = await ModelsService.delete(id);

      res.json(model);
    } catch (e) {
      next(e);
    }
  }
}
