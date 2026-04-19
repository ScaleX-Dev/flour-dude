'use client';

import { useMemo, useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { buildWhatsAppLink, whatsappMessages } from '@/lib/site';

const eventTypes = [
  'Wedding',
  'Corporate Event',
  'Birthday Party',
  'Hotel Catering',
  'Other'
] as const;

const budgetRanges = [
  'Under LKR 20,000',
  'LKR 20,000-50,000',
  'LKR 50,000-100,000',
  'Over LKR 100,000'
] as const;

const schema = z.object({
  fullName: z.string().min(2, 'Full name is required.'),
  email: z.string().email('Enter a valid email address.'),
  phone: z.string().min(7, 'Phone number is required.'),
  organization: z.string().optional(),
  eventType: z.enum(eventTypes, { message: 'Select an event type.' }),
  eventDate: z.string().min(1, 'Event date is required.'),
  guestCount: z.number().min(10, 'Minimum guest count is 10.'),
  budgetRange: z.enum(budgetRanges).optional(),
  message: z.string().optional()
});

type EventInquiryValues = z.infer<typeof schema>;

function FieldError({ message }: { message?: string }) {
  if (!message) {
    return null;
  }

  return <p className="text-xs text-brand-rose">{message}</p>;
}

export function EventInquiryForm() {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const todayIso = useMemo(() => new Date().toISOString().slice(0, 10), []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<EventInquiryValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      organization: '',
      eventType: 'Wedding',
      eventDate: '',
      guestCount: 30,
      budgetRange: undefined,
      message: ''
    }
  });

  async function onSubmit(values: EventInquiryValues) {
    setStatus('idle');

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      setStatus('success');
      reset();
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-card border border-brand-border bg-brand-warmWhite p-6 text-center">
        <p className="text-base font-semibold text-brand-deepBrown">Thank you! We&apos;ll be in touch within 24 hours.</p>
        <a
          href={buildWhatsAppLink(whatsappMessages.b2b)}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex"
        >
          <Button variant="whatsapp">Can&apos;t wait? Message us now →</Button>
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 rounded-card border border-brand-border bg-brand-warmWhite p-6 sm:grid-cols-2">
      <label className="space-y-1 text-sm">
        <span>Full Name*</span>
        <input {...register('fullName')} className="w-full rounded-button border border-brand-border bg-brand-cream px-3 py-2" />
        <FieldError message={errors.fullName?.message} />
      </label>

      <label className="space-y-1 text-sm">
        <span>Email Address*</span>
        <input type="email" {...register('email')} className="w-full rounded-button border border-brand-border bg-brand-cream px-3 py-2" />
        <FieldError message={errors.email?.message} />
      </label>

      <label className="space-y-1 text-sm">
        <span>Phone Number*</span>
        <input type="tel" {...register('phone')} className="w-full rounded-button border border-brand-border bg-brand-cream px-3 py-2" />
        <FieldError message={errors.phone?.message} />
      </label>

      <label className="space-y-1 text-sm">
        <span>Organisation / Venue</span>
        <input {...register('organization')} className="w-full rounded-button border border-brand-border bg-brand-cream px-3 py-2" />
      </label>

      <label className="space-y-1 text-sm">
        <span>Event Type*</span>
        <select {...register('eventType')} className="w-full rounded-button border border-brand-border bg-brand-cream px-3 py-2">
          {eventTypes.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <FieldError message={errors.eventType?.message} />
      </label>

      <label className="space-y-1 text-sm">
        <span>Event Date*</span>
        <input type="date" min={todayIso} {...register('eventDate')} className="w-full rounded-button border border-brand-border bg-brand-cream px-3 py-2" />
        <FieldError message={errors.eventDate?.message} />
      </label>

      <label className="space-y-1 text-sm">
        <span>Estimated Guest Count*</span>
        <input type="number" min={10} {...register('guestCount', { valueAsNumber: true })} className="w-full rounded-button border border-brand-border bg-brand-cream px-3 py-2" />
        <FieldError message={errors.guestCount?.message} />
      </label>

      <label className="space-y-1 text-sm">
        <span>Budget Range</span>
        <select {...register('budgetRange')} className="w-full rounded-button border border-brand-border bg-brand-cream px-3 py-2">
          <option value="">Select budget</option>
          {budgetRanges.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <label className="space-y-1 text-sm sm:col-span-2">
        <span>Message / Additional Details</span>
        <textarea {...register('message')} rows={5} className="w-full rounded-button border border-brand-border bg-brand-cream px-3 py-2" />
      </label>

      {status === 'error' ? (
        <p className="text-sm text-brand-rose sm:col-span-2">Something went wrong. Please try again or WhatsApp us directly.</p>
      ) : null}

      <div className="sm:col-span-2">
        <Button type="submit" variant="primary" size="lg" disabled={isSubmitting}>
          {isSubmitting ? (
            <span className="inline-flex items-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/35 border-t-white" />
              Sending...
            </span>
          ) : (
            'Get Custom Quote'
          )}
        </Button>
      </div>
    </form>
  );
}
