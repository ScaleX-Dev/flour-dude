'use client';

import { useEffect, useMemo, useState } from 'react';

type PromoCountdownProps = {
  expiresAt: string;
};

type Remaining = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  expired: boolean;
};

function getRemaining(expiresAt: string): Remaining {
  const end = new Date(expiresAt).getTime();
  const now = Date.now();
  const delta = end - now;

  if (!Number.isFinite(end) || delta <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  }

  const days = Math.floor(delta / (1000 * 60 * 60 * 24));
  const hours = Math.floor((delta / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((delta / (1000 * 60)) % 60);
  const seconds = Math.floor((delta / 1000) % 60);

  return { days, hours, minutes, seconds, expired: false };
}

function Cell({ label, value }: { label: string; value: number }) {
  return (
    <div className="min-w-[62px] rounded-btn border border-borderColor bg-warmWhite px-3 py-2 text-center shadow-soft">
      <p className="font-display text-xl text-brown-deep">{value.toString().padStart(2, '0')}</p>
      <p className="text-[10px] uppercase tracking-[0.14em] text-textMuted">{label}</p>
    </div>
  );
}

export function PromoCountdown({ expiresAt }: PromoCountdownProps) {
  const [remaining, setRemaining] = useState<Remaining>(() => getRemaining(expiresAt));

  useEffect(() => {
    const timer = window.setInterval(() => {
      setRemaining(getRemaining(expiresAt));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [expiresAt]);

  const isVisible = useMemo(() => !remaining.expired, [remaining.expired]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="mt-4 flex flex-wrap items-center gap-2">
      <Cell label="Days" value={remaining.days} />
      <Cell label="Hours" value={remaining.hours} />
      <Cell label="Minutes" value={remaining.minutes} />
      <Cell label="Seconds" value={remaining.seconds} />
    </div>
  );
}
