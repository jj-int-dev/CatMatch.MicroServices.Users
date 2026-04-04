import { Router, type Request, type Response } from 'express';
import { checkSystemHealthAction } from '../actions/checkSystemHealthAction';

const router = Router();

router.get('', async (req: Request, res: Response) => {
  let statusCode = 200;
  let status = 'OK';
  try {
    await checkSystemHealthAction();
  } catch (error) {
    statusCode = 503;
    status = 'FAILURE';
  }
  return res.status(statusCode).json({
    status,
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

export default router;
