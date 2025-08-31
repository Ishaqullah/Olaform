# Olaform

A lightweight Next.js + shadcn/ui form builder inspired by YouForm.

## Getting Started

- Install dependencies:

```bash
npm install
```

- Run the dev server:

```bash
npm run dev
```

Open http://localhost:3000

## Features

- Minimal builder at `/builder`
- Create forms and save to in-memory API
- View forms at `/f/[slug]`

## Notes

- Data persistence is in-memory for now. For production, wire Prisma (SQLite/Postgres) and update API routes.