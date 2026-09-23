import { INSTAGRAM, WHATSAPP } from "../data";

export function Contact() {
  return (
    <div className="mx-auto max-w-3xl px-6 pb-24 pt-28">
      <p className="section-kicker">Contact</p>
      <h1 className="section-title mt-3">Let’s loop together.</h1>
      <p className="mt-4 text-mute">Orders, customs, collabs, and “can you make this?” energy — we answer on WhatsApp and Instagram DMs.</p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <a href={WHATSAPP} target="_blank" rel="noreferrer" className="rounded-[1.6rem] bg-white p-6 shadow-card">
          <p className="font-display text-2xl font-bold">WhatsApp</p>
          <p className="mt-2 text-sm text-mute">Fastest for orders and customs.</p>
        </a>
        <a href={INSTAGRAM} target="_blank" rel="noreferrer" className="rounded-[1.6rem] bg-white p-6 shadow-card">
          <p className="font-display text-2xl font-bold">Instagram</p>
          <p className="mt-2 text-sm text-mute">@loomieloops — drop a screenshot.</p>
        </a>
      </div>
      <p className="mt-8 text-sm text-mute">Based in India. Ships nationwide and worldwide.</p>
    </div>
  );
}
