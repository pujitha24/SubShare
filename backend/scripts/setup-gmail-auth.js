import { google } from 'googleapis';
import http from 'http';
import { URL } from 'url';
import open from 'open';
import destroyer from 'server-destroy';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

const oauth2Client = new google.auth.OAuth2(
  process.env.GMAIL_CLIENT_ID,
  process.env.GMAIL_CLIENT_SECRET,
  'http://localhost:3002/oauth2callback'
);

// Generate the url that will be used for authorization
const authorizeUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: [
    'https://www.googleapis.com/auth/gmail.settings.basic',
    'https://www.googleapis.com/auth/gmail.settings.sharing'
  ]
});

// Create a local server to receive the OAuth2 callback
const server = http
  .createServer(async (req, res) => {
    try {
      const urlParams = new URL(req.url, 'http://localhost:3002');
      const code = urlParams.searchParams.get('code');
      
      if (code) {
        // Get the access and refresh tokens
        const { tokens } = await oauth2Client.getToken(code);
        console.log('\nRefresh Token:', tokens.refresh_token);
        console.log('\nAccess Token:', tokens.access_token);
        console.log('\nAdd these tokens to your .env file:');
        console.log('GMAIL_REFRESH_TOKEN=' + tokens.refresh_token);
        console.log('GMAIL_ACCESS_TOKEN=' + tokens.access_token);

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('Authentication successful! You can close this window.');
        server.destroy();
      }
    } catch (e) {
      console.error('Error getting tokens:', e);
      res.writeHead(500, { 'Content-Type': 'text/html' });
      res.end('Authentication failed! Please check the console.');
      server.destroy();
    }
  })
  .listen(3002, () => {
    // Open the browser to the authorize url to start the workflow
    open(authorizeUrl);
  });

destroyer(server);

console.log('\nA browser window will open to authorize the application.');
console.log('After authorization, the tokens will be displayed here.');
