import { pool } from '../../db.js';

export class ModelsService {
  static async create({ id, name, description, context_length, modality, tokenizer }) {
    const model = await pool.query({
      text: `INSERT INTO models (id, name, description, context_length, modality, tokenizer)
             VALUES ($1, $2, $3, $4, $5, $6)
             RETURNING *`,
      values: [ id, name, description, context_length, modality, tokenizer ]
    });

    return model.rows[0];
  }

  static async get(id) {
    const queryString = !id
      ? `SELECT * FROM models`
      : `SELECT * FROM models
         WHERE id = '${ id }'`;

    const model = await pool.query(queryString);
    if (model.rowCount === 0) throw new Error('Model not found');

    return !id
      ? model.rows
      : model.rows[0];
  }

  static async update(id, { name, description, context_length, modality, tokenizer }) {
    const model = await pool.query({
      text: `UPDATE models
             SET name           = COALESCE($1, name),
                 description    = COALESCE($2, description),
                 context_length = COALESCE($3, context_length),
                 modality       = COALESCE($4, modality),
                 tokenizer      = COALESCE($5, tokenizer)
             WHERE id = '${ id }'
             RETURNING *`,
      values: [ name, description, context_length, modality, tokenizer ]
    });

    if (model.rowCount === 0) throw new Error('Model not found');

    return model.rows[0];
  }

  static async delete(id) {
    const model = await pool.query(`DELETE FROM models WHERE id = '${ id }'`);

    if (model.rowCount === 0) throw new Error('Model not found');
  }
}
