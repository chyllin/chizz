import express, { Request, Response } from 'express';
import { sendWelcomeEmail } from '../emails/sendWelcome';

const router = express.Router();

router.post('/webhook/signup', async (req: Request, res: Response) => {
  const { type, record } = req.body;

  if (type === 'INSERT' && record?.email) {
    await sendWelcomeEmail(record.email);
  }

  res.json({ received: true });
});

export default router;