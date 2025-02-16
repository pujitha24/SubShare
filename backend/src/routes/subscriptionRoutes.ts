import express, { Response } from 'express';
import { google } from 'googleapis';
import { auth } from '../middleware/auth';
import { AuthenticatedRequest } from '../types';
import { Subscription, ForwardingEvent, User } from '../models';

const router = express.Router();
router.use(auth);

async function setupGmailForwarding(userEmail: string, subscriptionEmail: string, service: string) {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GMAIL_CLIENT_ID,
    process.env.GMAIL_CLIENT_SECRET,
    process.env.GMAIL_REDIRECT_URI
  );

  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/gmail.settings.basic'],
    state: JSON.stringify({ subscriptionEmail, service })
  });
}

router.post('/share', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { service, email, password, screenCount } = req.body;
    const user = req.user!;

    const subscription = await Subscription.create({
      user_id: user.id,
      service,
      email,
      password,
      screen_count: screenCount,
      available_screens: screenCount,
      status: 'pending_verification'
    });

    const authUrl = await setupGmailForwarding(user.email!, email, service);
    
    res.json({ success: true, authUrl, subscription });
  } catch (error) {
    console.error('Share error:', error);
    res.status(500).json({ success: false, error: 'Failed to share subscription' });
  }
});

router.get('/oauth2callback', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { code, state } = req.query;
    const { subscriptionEmail } = JSON.parse(state as string);

    const oauth2Client = new google.auth.OAuth2(
      process.env.GMAIL_CLIENT_ID,
      process.env.GMAIL_CLIENT_SECRET,
      process.env.GMAIL_REDIRECT_URI
    );

    const { tokens } = await oauth2Client.getToken(code as string);
    oauth2Client.setCredentials(tokens);

    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });
    
    await gmail.users.settings.filters.create({
      userId: 'me',
      requestBody: {
        criteria: { from: '@netflix.com' }, // Example for Netflix
        action: { forward: subscriptionEmail }
      }
    });

    await Subscription.update(
      { status: 'verified' },
      { where: { email: subscriptionEmail } }
    );

    res.send('Email forwarding verified! You can close this window.');
  } catch (error) {
    console.error('OAuth callback error:', error);
    res.status(500).send('Verification failed');
  }
});

export { router };
