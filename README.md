# From The Ascendant

A calm astrology publication offering personalized weekly readings based on lunar cycles.

## Philosophy

This is NOT a daily horoscope spam site. It's a lunar-cycle based publication where:
- Traffic comes from moon events
- Retention comes from weekly personal readings

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **TailwindCSS**
- **Prisma** + PostgreSQL (Supabase compatible)
- **Resend** for email (magic links + weekly emails)
- **Anthropic Claude** API for content generation
- **Vercel** deployment ready

## Getting Started

### 1. Clone and Install

```bash
git clone <repo-url>
cd fromtheascendant
npm install
```

### 2. Environment Setup

Copy the example environment file:

```bash
cp .env.example .env
```

Fill in your environment variables:

```env
# Database (Supabase)
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres"

# App URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Anthropic Claude API
ANTHROPIC_API_KEY="sk-ant-..."

# Resend Email
RESEND_API_KEY="re_..."
EMAIL_FROM="From The Ascendant <readings@fromtheascendant.com>"

# Cron Secret (for securing cron endpoints)
CRON_SECRET="your-secure-cron-secret-here"

# Admin Password
ADMIN_PASSWORD="your-admin-password-here"
```

### 3. Database Setup

Push the Prisma schema to your database:

```bash
npm run db:push
```

Or run migrations:

```bash
npm run db:migrate
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
fromtheascendant/
├── app/
│   ├── api/
│   │   ├── auth/           # Magic link auth endpoints
│   │   ├── admin/          # Admin action endpoints
│   │   ├── cron/           # Cron job endpoints
│   │   └── user/           # User profile endpoints
│   ├── admin/              # Admin dashboard
│   ├── auth/               # Login pages
│   ├── dashboard/          # User dashboard
│   ├── onboarding/         # Birth data collection
│   ├── settings/           # User settings
│   ├── full-moon/          # SEO page
│   ├── new-moon/           # SEO page
│   ├── first-quarter/      # SEO page
│   ├── last-quarter/       # SEO page
│   ├── mercury-retrograde/ # SEO page
│   ├── rising-sign/        # SEO page
│   ├── moon-sign/          # SEO page
│   ├── natal-chart/        # SEO page
│   └── page.tsx            # Homepage
├── components/             # Shared React components
├── lib/
│   ├── astrology.ts        # Zodiac & moon calculations
│   ├── auth.ts             # Session management
│   ├── claude.ts           # Claude API integration
│   ├── content.ts          # Content caching
│   ├── db.ts               # Prisma client
│   ├── email.ts            # Resend email integration
│   └── readings.ts         # Weekly reading generation
├── prisma/
│   └── schema.prisma       # Database schema
└── public/                 # Static assets
```

## Database Models

- **User**: Email, birth data, computed signs
- **MagicToken**: Login tokens and sessions
- **GeneratedContent**: Cached moon event content
- **WeeklyReading**: Personalized user readings
- **CronLog**: Cron job execution logs

## Cron Jobs

### Generate Events (Daily)

Pre-generates moon event content 7 days ahead.

```bash
curl -X POST https://your-domain.com/api/cron/generate-events \
  -H "Authorization: Bearer YOUR_CRON_SECRET"
```

### Weekly Readings (Mondays)

Generates and emails personalized readings to all users.

```bash
curl -X POST https://your-domain.com/api/cron/weekly-readings \
  -H "Authorization: Bearer YOUR_CRON_SECRET"
```

### Vercel Cron Setup

Add to `vercel.json`:

```json
{
  "crons": [
    {
      "path": "/api/cron/generate-events",
      "schedule": "0 6 * * *"
    },
    {
      "path": "/api/cron/weekly-readings",
      "schedule": "0 8 * * 1"
    }
  ]
}
```

## Admin Panel

Access at `/admin` with your `ADMIN_PASSWORD`.

Features:
- View user count
- View content and reading counts
- Manually trigger content generation
- Manually trigger weekly reading emails
- View cron execution logs

## Deployment

### Vercel

1. Connect your repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy

### Environment Variables for Production

Set in Vercel dashboard:
- `DATABASE_URL`
- `DIRECT_URL`
- `NEXT_PUBLIC_APP_URL` (your production URL)
- `ANTHROPIC_API_KEY`
- `RESEND_API_KEY`
- `EMAIL_FROM`
- `CRON_SECRET`
- `ADMIN_PASSWORD`

## Content Generation

Content is generated using Claude with careful prompt engineering to ensure:
- Calm, reflective tone
- No predictions or "you will" statements
- No medical/financial advice
- No mystical clichés
- Specific but open-ended themes
- Never mentions AI

## Email Setup

Using Resend for transactional email:
1. Create a Resend account
2. Verify your domain
3. Add API key to environment variables

## License

Private project.
