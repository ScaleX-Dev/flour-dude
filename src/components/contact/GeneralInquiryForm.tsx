'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

type FormValues = {
  name: string;
  email: string;
  message: string;
};

export function GeneralInquiryForm() {
  const [values, setValues] = useState<FormValues>({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      });

      if (!response.ok) {
        throw new Error('Failed request');
      }

      setStatus('success');
      setValues({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 rounded-card border border-borderColor bg-warmWhite p-6 sm:grid-cols-2">
      <label className="space-y-1 text-sm">
        <span>Full Name</span>
        <input
          required
          value={values.name}
          onChange={(event) => setValues((prev) => ({ ...prev, name: event.target.value }))}
          className="w-full rounded-button border border-borderColor bg-cream px-3 py-2"
        />
      </label>

      <label className="space-y-1 text-sm">
        <span>Email Address</span>
        <input
          required
          type="email"
          value={values.email}
          onChange={(event) => setValues((prev) => ({ ...prev, email: event.target.value }))}
          className="w-full rounded-button border border-borderColor bg-cream px-3 py-2"
        />
      </label>

      <label className="space-y-1 text-sm sm:col-span-2">
        <span>Message</span>
        <textarea
          required
          rows={5}
          value={values.message}
          onChange={(event) => setValues((prev) => ({ ...prev, message: event.target.value }))}
          className="w-full rounded-button border border-borderColor bg-cream px-3 py-2"
        />
      </label>

      {status === 'success' ? (
        <p className="text-sm text-sage sm:col-span-2">Message sent! We&apos;ll be in touch soon.</p>
      ) : null}

      {status === 'error' ? (
        <p className="text-sm text-rose sm:col-span-2">Something went wrong. Please WhatsApp us directly.</p>
      ) : null}

      <div className="sm:col-span-2">
        <Button type="submit" variant="primary" disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </Button>
      </div>
    </form>
  );
}
