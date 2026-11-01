# Recall Radar MVP

Recall Radar is a retailer-focused recall intelligence platform designed to reduce noise from generic government recall alerts and provide personalized risk exposure insights based on a retailer’s inventory, SKUs, and product catalog.

This repository contains an MVP starter for the product direction described in the original concept: a personalized dashboard that highlights relevant recall alerts, product risk exposure, and friendly digest-style notifications.

## Product vision

The target MVP is a retailer-facing system that:

- ingests product catalogs
- ingests recall data from external sources
- matches retailer products to recall events
- scores relevance and urgency
- surfaces priority recalls in a dashboard
- sends friendly digest emails / notifications

## Architecture

```text
Recall-Radar/
  apps/
    web/          Next.js dashboard
    api/          Fastify API
    worker/       BullMQ background jobs
  packages/
    shared/       shared TypeScript types and utilities
  prisma/
    schema.prisma PostgreSQL schema
  docker-compose.yml
  .env.example
```

## Stack

- Next.js 14
- Fastify
- PostgreSQL
- Prisma
- Redis + BullMQ
- TypeScript

## Quick start

1. Install dependencies:

```bash
npm install
```

2. Start supporting services:

```bash
docker compose up -d db redis
```

3. Generate Prisma client:

```bash
npm run db:generate
```

4. Run the app stack:

```bash
npm run dev
```

This starts:

- Web app at http://localhost:3000
- API at http://localhost:3001
- Worker process in the background

## Environment

Copy the example environment file and adjust values if needed:

```bash
cp .env.example .env
```

## MVP roadmap

- Upload retailer catalog
- Normalize recall records
- Match products to recall alerts
- Rank by urgency and relevance
- Show dashboard with open recall issues
- Send friendly digest emails
- Add historical reporting and action tracking

## Notes

This repo is intentionally a starter scaffold. It focuses on the architecture and product flow so you can build the first meaningful MVP quickly without over-engineering the system.
