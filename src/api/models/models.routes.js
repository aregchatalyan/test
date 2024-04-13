import { Router } from 'express';
import { getModelsOnceADay } from './models.job.js';
import { ModelsController } from './models.controller.js';

export const router = Router();

router.post('/',
  ModelsController.create
);

router.get('/',
  ModelsController.get
);

router.put('/',
  ModelsController.update
);

router.delete('/',
  ModelsController.delete
);

getModelsOnceADay.start();
