const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

class GmailService {
  constructor() {
    this.oauth2Client = new OAuth2(
      process.env.GMAIL_CLIENT_ID,
      process.env.GMAIL_CLIENT_SECRET,
      process.env.GMAIL_REDIRECT_URI
    );
  }

  async setupEmailForwarding(userEmail, subscriptionEmail, adminEmail, service) {
    try {
      // Set credentials from the database or environment
      this.oauth2Client.setCredentials({
        access_token: process.env.GMAIL_ACCESS_TOKEN,
        refresh_token: process.env.GMAIL_REFRESH_TOKEN
      });

      const gmail = google.gmail({ version: 'v1', auth: this.oauth2Client });

      // Create a forwarding address
      await gmail.users.settings.forwardingAddresses.create({
        userId: 'me',
        requestBody: {
          forwardingEmail: adminEmail,
        },
      });

      // Create a filter based on the subscription service
      const filterContent = {
        criteria: {
          from: this.getServiceEmailDomain(service),
        },
        action: {
          forward: adminEmail,
        },
      };

      await gmail.users.settings.filters.create({
        userId: 'me',
        requestBody: filterContent,
      });

      return true;
    } catch (error) {
      console.error('Gmail API Error:', error);
      throw new Error('Failed to set up email forwarding');
    }
  }

  getServiceEmailDomain(service) {
    const domains = {
      netflix: '@netflix.com',
      hulu: '@hulu.com',
      max: '@max.com'
    };
    return domains[service] || '';
  }

  async verifyForwardingAddress(forwardingEmail) {
    try {
      const gmail = google.gmail({ version: 'v1', auth: this.oauth2Client });
      
      // List all forwarding addresses
      const { data } = await gmail.users.settings.forwardingAddresses.list({
        userId: 'me',
      });

      // Check if the forwarding address exists and is verified
      const forwardingAddress = data.forwardingAddresses.find(
        address => address.forwardingEmail === forwardingEmail
      );

      return forwardingAddress && forwardingAddress.verificationStatus === 'accepted';
    } catch (error) {
      console.error('Gmail API Error:', error);
      return false;
    }
  }

  async listFilters() {
    try {
      const gmail = google.gmail({ version: 'v1', auth: this.oauth2Client });
      
      const { data } = await gmail.users.settings.filters.list({
        userId: 'me',
      });

      return data.filter || [];
    } catch (error) {
      console.error('Gmail API Error:', error);
      return [];
    }
  }

  async removeForwarding(forwardingEmail) {
    try {
      const gmail = google.gmail({ version: 'v1', auth: this.oauth2Client });
      
      // Remove forwarding address
      await gmail.users.settings.forwardingAddresses.delete({
        userId: 'me',
        forwardingEmail,
      });

      // Remove associated filters
      const filters = await this.listFilters();
      for (const filter of filters) {
        if (filter.action.forward === forwardingEmail) {
          await gmail.users.settings.filters.delete({
            userId: 'me',
            id: filter.id,
          });
        }
      }

      return true;
    } catch (error) {
      console.error('Gmail API Error:', error);
      throw new Error('Failed to remove email forwarding');
    }
  }
}

module.exports = new GmailService();
