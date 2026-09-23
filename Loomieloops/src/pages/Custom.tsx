import { FormEvent, useState } from "react";
import { WHATSAPP } from "../data";

export function Custom() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const text = encodeURIComponent(
      `Custom order request%0AName: ${data.get("name")}%0AEmail: ${data.get("email")}%0APiece: ${data.get("piece")}%0AIdea: ${data.get("idea")}`,
    );
    window.open(`${WHATSAPP.split("?")[0]}?text=${text}`, "_blank");
    setSent(true);
  };

  return (
    <div className="mx-auto grid max-w-6xl gap-12 px-6 pb-24 pt-28 lg:grid-cols-2">
      <div>
        <p className="section-kicker">Custom orders</p>
        <h1 className="section-title mt-3">Want something unique?</h1>
        <p className="mt-4 text-mute">
          Tell us your anime character, color, or idea — we’ll stitch it for you. Original designs only, photo proof
          before we ship, 10–18 day make time.
        </p>
        <img src="/images/product-custom-plush.png" alt="Custom plush" className="mt-8 rounded-[2rem] shadow-card" />
      </div>
      <form onSubmit={onSubmit} className="rounded-[2rem] bg-white p-6 shadow-card sm:p-8">
        <label className="block text-sm font-medium">
          Name
          <input required name="name" className="mt-2 w-full rounded-2xl bg-cream px-4 py-3 outline-none" />
        </label>
        <label className="mt-4 block text-sm font-medium">
          Email / WhatsApp
          <input required name="email" className="mt-2 w-full rounded-2xl bg-cream px-4 py-3 outline-none" />
        </label>
        <label className="mt-4 block text-sm font-medium">
          Piece type
          <select name="piece" className="mt-2 w-full rounded-2xl bg-cream px-4 py-3 outline-none">
            <option>Cardigan / clothing</option>
            <option>Bag or hat</option>
            <option>Amigurumi / plush</option>
            <option>Gift set</option>
            <option>Surprise me</option>
          </select>
        </label>
        <label className="mt-4 block text-sm font-medium">
          Your idea
          <textarea
            required
            name="idea"
            rows={5}
            placeholder="Character vibe, colors, size, deadline..."
            className="mt-2 w-full rounded-2xl bg-cream px-4 py-3 outline-none"
          />
        </label>
        <button className="btn-primary mt-6 w-full" type="submit">
          {sent ? "Sent — we’ll DM you" : "Send custom request"}
        </button>
        <p className="mt-3 text-center text-xs text-mute">Opens WhatsApp with your details. No payment yet.</p>
      </form>
    </div>
  );
}
