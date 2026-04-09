export function buildWhatsAppURL(message: string, phone?: string): string {
  const number = phone ?? process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '94XXXXXXXXX';
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export const WA = {
  default: () => buildWhatsAppURL("Hi Flour Dude! I'd like to place an order. Can you help?"),
  customCake: () =>
    buildWhatsAppURL("Hi Flour Dude! I'd like to order a custom cake. Can you tell me about designs and pricing?"),
  b2b: () => buildWhatsAppURL("Hi Flour Dude! I'm interested in catering for an event. Can we discuss?"),
  menu: () => buildWhatsAppURL("Hi Flour Dude! I have a question about your menu."),
  cakeOrder: (name: string) =>
    buildWhatsAppURL(`Hi Flour Dude! I'd like to order a ${name}. Can you help?`)
};
