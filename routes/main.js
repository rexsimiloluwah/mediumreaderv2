import express from 'express';
import {Main} from '../controllers';

const router = express.Router();

/* Main Router */
router.post("/", Main);

export default router;