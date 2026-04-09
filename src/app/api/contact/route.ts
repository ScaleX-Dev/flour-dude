import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getPayloadClient } from '@/lib/payload';

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(3)
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const values = schema.parse(body);

    const payload = await getPayloadClient();
    await payload.create({
      collection: 'inquiries',
      overrideAccess: true,
      data: {
        name: values.name,
        email: values.email,
        phone: '',
        event_type: 'General Inquiry',
        event_date: new Date().toISOString(),
        guest_count: 0,
        budget_range: '',
        message: values.message,
        status: 'new'
      }
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
