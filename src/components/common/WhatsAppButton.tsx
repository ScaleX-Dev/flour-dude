import { trackWhatsAppClick } from '@/lib/analytics';
import { buildWhatsAppURL } from '@/lib/whatsapp';

const whatsappMessages = {
  default: "Hi Flour Dude! I'd like to place an order. Can you help?",
  cakeOrder: "Hi Flour Dude! I'd like to order a [CAKE NAME]. Can you help?",
  customCake: "Hi Flour Dude! I'd like to order a custom cake. Can you tell me about designs and pricing?",
  b2b: "Hi Flour Dude! I'm interested in catering for an event. Can we discuss?",
  menu: 'Hi Flour Dude! I have a question about your menu.'
} as const;

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
      href={buildWhatsAppURL(message)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackWhatsAppClick(`common:${messageType}`)}
      className={`inline-flex items-center justify-center rounded-button bg-brand-caramel px-6 py-3 text-sm font-semibold text-brand-warmWhite transition hover:bg-brand-caramelLight ${className}`}
    >
      {label}
    </a>
  );
}
