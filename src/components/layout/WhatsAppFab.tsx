export function WhatsAppFab() {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '94XXXXXXXXX';
  const href = `https://wa.me/${number}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white shadow-lg"
      aria-label="Chat on WhatsApp"
    >
      WhatsApp
    </a>
  );
}
