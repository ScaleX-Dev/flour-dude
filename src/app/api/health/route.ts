import { NextResponse } from 'next/server';
import { Client } from 'pg';

export async function GET() {
  const info: Record<string, unknown> = {
    env: {
      NODE_ENV: process.env.NODE_ENV,
      DATABASE_URI_set: Boolean(process.env.DATABASE_URI),
      PAYLOAD_SECRET_set: Boolean(process.env.PAYLOAD_SECRET),
      PAYLOAD_SECRET_is_placeholder: process.env.PAYLOAD_SECRET === 'replace-me',
      NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL ?? '(not set)',
      VERCEL_URL: process.env.VERCEL_URL ?? '(not set)',
    },
  };

  // Try a direct DB connection to isolate connection issues from Payload init issues
  try {
    const connectionString = process.env.DATABASE_URI || '';
    if (!connectionString) {
      info.db = { error: 'DATABASE_URI is not set' };
    } else {
      const client = new Client({
        connectionString,
        ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
        connectionTimeoutMillis: 5000,
      });
      await client.connect();
      const result = await client.query('SELECT NOW()');
      await client.end();
      info.db = { connected: true, time: result.rows[0].now };
    }
  } catch (err: unknown) {
    info.db = {
      connected: false,
      error: err instanceof Error ? err.message : String(err),
    };
  }

  return NextResponse.json(info);
}
