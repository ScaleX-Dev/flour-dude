import { buildWhatsAppLink, whatsappMessages } from '@/lib/site';

type MessageType = keyof typeof whatsappMessages;

type WhatsAppButtonProps = {
  messageType?: MessageType;
  customMessage?: string;
  label: string;
  className?: string;
};

export function WhatsAppButton({
  messageType = 'default',
  customMessage,
  label,
  className = ''
}: WhatsAppButtonProps) {
  const message = customMessage ?? whatsappMessages[messageType];

  return (
    <a
      href={buildWhatsAppLink(message)}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center justify-center rounded-button bg-brand-caramel px-6 py-3 text-sm font-semibold text-brand-warmWhite transition hover:bg-brand-caramelLight ${className}`}
    >
      {label}
    </a>
  );
}
