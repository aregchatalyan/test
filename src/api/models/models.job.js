import axios from 'axios';
import { CronJob } from 'cron';
import { pool } from '../../db.js';

const getModels = async () => {
  const { data: { data } } = await axios('https://openrouter.ai/api/v1/models');

  const { rows } = await pool.query(`SELECT * FROM models`);

  let source;

  if (rows.length === 0) {
    source = data
  } else {
    const ids = rows.map((row) => row.id);
    source = data.filter((row) => !ids.includes(row.id))
  }

  await pool.query(`
    INSERT INTO models (id, name, description, context_length, modality, tokenizer)
    SELECT id, name, description, context_length, modality, tokenizer
    FROM jsonb_to_recordset($1::jsonb) AS t (id varchar, name varchar, description text, context_length int, modality varchar, tokenizer varchar)
    `,
    [
      JSON.stringify(
        source.map(obj => ({
          id: obj.id,
          name: obj.name,
          description: obj.description,
          context_length: obj.context_length,
          modality: obj.architecture.modality,
          tokenizer: obj.architecture.tokenizer
        }))
      )
    ]
  );
}

export const getModelsOnceADay = CronJob.from({
  cronTime: '0 0 0 * * *',
  cronTimeZone: 'UTC',
  onTick: getModels,
  start: true
});
