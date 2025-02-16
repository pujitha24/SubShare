import { google } from 'googleapis';
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
  process.env.GMAIL_REDIRECT_URI
);

oauth2Client.setCredentials({
  access_token: process.env.GMAIL_ACCESS_TOKEN,
  refresh_token: process.env.GMAIL_REFRESH_TOKEN
});

const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

async function testEmailForwarding() {
  try {
    // List current forwarding addresses
    console.log('Checking current forwarding settings...');
    const { data: forwardingData } = await gmail.users.settings.forwardingAddresses.list({
      userId: 'me'
    });
    console.log('Current forwarding addresses:', forwardingData.forwardingAddresses || []);

    // List current filters
    console.log('\nChecking current filters...');
    const { data: filterData } = await gmail.users.settings.filters.list({
      userId: 'me'
    });
    console.log('Current filters:', filterData.filter || []);

    // Test creating a new forwarding address
    const testForwardingEmail = 'admin@subshare.com';
    console.log('\nTesting forwarding address creation...');
    const { data: newForwarding } = await gmail.users.settings.forwardingAddresses.create({
      userId: 'me',
      requestBody: {
        forwardingEmail: testForwardingEmail,
      },
    });
    console.log('Forwarding address creation result:', newForwarding);

    // Test creating a filter for Netflix emails
    console.log('\nTesting filter creation...');
    const { data: newFilter } = await gmail.users.settings.filters.create({
      userId: 'me',
      requestBody: {
        criteria: {
          from: '@netflix.com'
        },
        action: {
          forward: testForwardingEmail
        }
      }
    });
    console.log('Filter creation result:', newFilter);

  } catch (error) {
    console.error('Error testing email forwarding:', error.message);
    if (error.response) {
      console.error('Error details:', error.response.data);
    }
  }
}

testEmailForwarding();
