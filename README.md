<<<<<<< HEAD
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the below resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
=======
# SubShare - Subscription Sharing Marketplace

SubShare is a platform that allows users to share their unused subscription slots for popular OTT and SaaS services.

## Features

- User authentication and authorization
- Subscription sharing with email verification
- Gmail forwarding setup for OTP verification
- Payment processing via Stripe
- Dispute resolution system
- Admin dashboard for monitoring

## Tech Stack

### Backend
- Node.js with TypeScript
- Express.js
- PostgreSQL
- Sequelize ORM
- Gmail API integration
- Stripe payment processing

### Frontend
- Next.js
- React
- Tailwind CSS
- Supabase Auth

## Database Setup

1. Create a PostgreSQL database:
   ```bash
   createdb subshare_dev
   ```

2. Run database migrations:
   ```bash
   cd backend
   npx sequelize-cli db:migrate
   ```

3. (Optional) Seed initial data:
   ```bash
   npx sequelize-cli db:seed:all
   ```

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   cd subshare/backend && npm install
   cd ../frontend && npm install
   ```
3. Set up environment variables:
   - Create `.env` files in both backend and frontend directories
   - Add required credentials (see `.env.example` files)

4. Run the development server:
   ```bash
   # Backend
   cd backend && npm run dev

   # Frontend
   cd frontend && npm run dev
   ```

5. Access the application at `http://localhost:3000`

## API Documentation

### Authentication
- POST `/api/auth/register` - User registration
- POST `/api/auth/login` - User login

### Subscriptions
- POST `/api/subscriptions/share` - Share a subscription
- GET `/api/subscriptions` - List available subscriptions
- POST `/api/subscriptions/purchase` - Purchase a subscription slot

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Create a new Pull Request

## License

MIT License
>>>>>>> adding all the files
