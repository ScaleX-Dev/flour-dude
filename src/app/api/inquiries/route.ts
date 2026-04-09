import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getPayloadClient } from '@/lib/payload';

const schema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7),
  organization: z.string().optional(),
  eventType: z.string().min(1),
  eventDate: z.string().min(1),
  guestCount: z.coerce.number().min(10),
  budgetRange: z.string().optional(),
  message: z.string().optional()
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
        name: values.fullName,
        email: values.email,
        phone: values.phone,
        organisation: values.organization,
        event_type: values.eventType,
        event_date: values.eventDate,
        guest_count: values.guestCount,
        budget_range: values.budgetRange,
        message: values.message,
        status: 'new'
      }
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
