import { CONTACT } from '../../lib/constants';
import { openWhatsApp } from '../../lib/whatsapp';

function IconWhatsApp() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
      <path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.15 6.4 2.15 11.84c0 1.74.46 3.44 1.34 4.94L2 22l5.38-1.41a10 10 0 0 0 4.66 1.18h.01c5.46 0 9.89-4.4 9.89-9.84 0-2.62-1.03-5.09-2.89-6.94ZM12.05 20.15h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.19.84.85-3.11-.2-.32a8.2 8.2 0 0 1-1.26-4.39c0-4.54 3.72-8.24 8.29-8.24 2.21 0 4.29.86 5.85 2.42a8.18 8.18 0 0 1 2.43 5.83c0 4.54-3.72 8.3-8.28 8.3Zm4.54-6.16c-.25-.12-1.47-.72-1.7-.81-.23-.08-.4-.12-.56.12-.17.25-.64.8-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.84-.2-.48-.41-.42-.56-.42h-.48c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.23-.16-.48-.28Z" />
    </svg>
  );
}

function IconIg() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.6" r="0.8" fill="currentColor" />
    </svg>
  );
}

function IconMail() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="1.5" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

export function FloatingCTAs() {
  return (
    <div className="fixed bottom-6 right-4 z-40 flex flex-col overflow-hidden border border-line bg-paper/90 shadow-sm backdrop-blur-md md:bottom-10 md:right-8">
      <button
        type="button"
        onClick={() => openWhatsApp('Hi Loomie Loops 🧶 I would like to place an order.')}
        className="flex h-12 w-12 items-center justify-center border-b border-line transition hover:bg-sage/40"
        aria-label="WhatsApp"
      >
        <IconWhatsApp />
      </button>
      <a
        href={CONTACT.instagramUrl}
        target="_blank"
        rel="noreferrer"
        className="flex h-12 w-12 items-center justify-center border-b border-line transition hover:bg-lavender/40"
        aria-label="Instagram"
      >
        <IconIg />
      </a>
      <a
        href={`mailto:${CONTACT.email}`}
        className="flex h-12 w-12 items-center justify-center transition hover:bg-rose/40"
        aria-label="Email"
      >
        <IconMail />
      </a>
    </div>
  );
}
