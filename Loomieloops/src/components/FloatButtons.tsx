import { Instagram, MessageCircle } from "lucide-react";
import { INSTAGRAM, WHATSAPP } from "../data";

export function FloatButtons() {
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3">
      <a
        href={INSTAGRAM}
        target="_blank"
        rel="noreferrer"
        className="grid h-12 w-12 place-items-center rounded-full bg-white shadow-soft transition hover:scale-105"
        aria-label="Instagram DM"
      >
        <Instagram size={20} />
      </a>
      <a
        href={WHATSAPP}
        target="_blank"
        rel="noreferrer"
        className="grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-soft transition hover:scale-105"
        aria-label="WhatsApp"
      >
        <MessageCircle size={22} />
      </a>
    </div>
  );
}
