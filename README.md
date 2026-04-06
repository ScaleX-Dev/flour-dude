# Flour Dude

Project scaffold for a Next.js 14 + Payload CMS bakery platform.

## Current status

This repository currently contains structure and starter files only.
No full feature implementation has been done yet.

## Stack

- Next.js 14 (App Router, TypeScript)
- Tailwind CSS
- Payload CMS
- Supabase Postgres (via DATABASE_URI)
- Cloudinary (media)
- Resend (email notifications)

## Environment setup

Copy .env.example to .env.local and fill values.

## Available scripts

- npm run dev
- npm run build
- npm run start
- npm run lint
- npm run typecheck
- npm run payload:types

## GitHub CI/CD

Workflow file: .github/workflows/ci-cd.yml

- CI runs on pull requests and pushes to main.
- CD runs on pushes to main.
- CD deploys to Vercel only if these repository secrets are configured:
  - VERCEL_TOKEN
  - VERCEL_ORG_ID
  - VERCEL_PROJECT_ID

If these secrets are missing, deploy is skipped and CI still passes.
