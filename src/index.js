import express from 'express';
import { config } from './config.js';
import { router } from './api/models/models.routes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/models', router);

app.use((err, req, res, next) => {
  if (err) return res.status(400).json({ message: err.message });
  next();
});

app.listen(config.PORT, () => {
  console.log('Listening on port:', config.PORT);
});
