import { Router } from "express";
const router = Router();

import { getIssueLogs, processFlow } from './processMining.controller.js'

router.get('/issues/logs/list', getIssueLogs)
router.get('/issues/process', processFlow)

export default router;