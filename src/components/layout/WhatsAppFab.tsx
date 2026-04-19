export function WhatsAppFAB() {
  return (
    <a
      href="https://wa.me/94XXXXXXXXX?text=Hi%20Flour%20Dude!%20I%27d%20like%20to%20place%20an%20order."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group wa-pulse fixed bottom-4 right-4 z-[9999]"
    >
      <span className="pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 translate-x-2 whitespace-nowrap rounded-pill bg-brand-deepBrown px-3 py-1.5 text-xs text-brand-cream opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100">
        Chat with us!
      </span>

      <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[var(--wa-green)] text-white shadow-lg transition duration-300 group-hover:scale-[1.08]">
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7 fill-current">
          <path d="M20.52 3.48A11.75 11.75 0 0012.17 0C5.66 0 .34 5.32.34 11.83c0 2.09.55 4.13 1.58 5.93L0 24l6.42-1.86a11.81 11.81 0 005.74 1.47h.01c6.51 0 11.83-5.31 11.83-11.82 0-3.16-1.23-6.13-3.48-8.31Zm-8.35 18.13h-.01a9.86 9.86 0 01-5.03-1.38l-.36-.21-3.81 1.1 1.11-3.71-.24-.38a9.83 9.83 0 01-1.5-5.2c0-5.44 4.42-9.86 9.86-9.86 2.63 0 5.1 1.03 6.97 2.9a9.77 9.77 0 012.88 6.96c0 5.43-4.43 9.85-9.87 9.85Zm5.41-7.39c-.3-.15-1.8-.89-2.08-.99-.28-.1-.48-.15-.69.15-.2.3-.79.99-.97 1.2-.18.2-.36.22-.67.07-.3-.15-1.28-.47-2.43-1.5-.9-.8-1.51-1.79-1.68-2.09-.18-.3-.02-.46.13-.61.14-.14.3-.36.45-.54.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.69-1.66-.95-2.27-.25-.6-.5-.52-.69-.53h-.59c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49 0 1.47 1.07 2.89 1.22 3.09.15.2 2.1 3.2 5.08 4.49.71.31 1.26.5 1.69.65.71.23 1.36.2 1.87.12.57-.08 1.8-.74 2.05-1.45.25-.72.25-1.34.17-1.47-.07-.13-.27-.2-.57-.35Z" />
        </svg>
      </span>
    </a>
  );
}
