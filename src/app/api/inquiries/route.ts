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

    const message = [
      `Event Type: ${values.eventType}`,
      `Event Date: ${values.eventDate}`,
      `Estimated Guest Count: ${values.guestCount}`,
      values.organization ? `Organisation / Venue: ${values.organization}` : null,
      values.budgetRange ? `Budget Range: ${values.budgetRange}` : null,
      values.message ? `Details: ${values.message}` : null
    ]
      .filter(Boolean)
      .join('\n');

    const payload = await getPayloadClient();
    await payload.create({
      collection: 'inquiries',
      data: {
        name: values.fullName,
        email: values.email,
        phone: values.phone,
        message,
        source: 'contact-page'
      }
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
