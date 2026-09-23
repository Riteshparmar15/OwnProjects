import { useState } from 'react';
import { CONTACT } from '../lib/constants';
import { openWhatsApp } from '../lib/whatsapp';
import { Eyebrow, Magnetic } from '../components/ui/Motion';

const STEPS = ['The brief', 'Colour & scale', 'Confirm'];

export function StudioPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    character: '',
    colour: '',
    size: 'Standard',
    notes: '',
  });

  function set<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  function submit() {
    openWhatsApp(
      `Hi Loomie Loops 🧶 Custom Studio brief:\nName: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nCharacter / piece: ${form.character}\nColourway: ${form.colour}\nSize: ${form.size}\nNotes: ${form.notes}`,
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-6 pb-24 pt-28 md:pt-32">
      <Eyebrow>Custom studio</Eyebrow>
      <h1 className="font-display text-5xl italic md:text-7xl">Commission a one of one.</h1>
      <p className="mt-4 text-sm text-muted">
        Anime characters, private colourways, gift pieces. Three steps. Priority clients may skip to WhatsApp.
      </p>

      <div className="mt-10 flex gap-2 text-[10px] uppercase tracking-[0.18em]">
        {STEPS.map((s, i) => (
          <span key={s} className={`flex-1 border-b pb-2 ${i <= step ? 'border-ink' : 'border-line text-muted'}`}>
            0{i + 1} {s}
          </span>
        ))}
      </div>

      <form
        className="mt-10 space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          if (step < 2) setStep(step + 1);
          else submit();
        }}
      >
        {step === 0 && (
          <>
            <Field label="Name" value={form.name} onChange={(v) => set('name', v)} required />
            <Field label="Email" type="email" value={form.email} onChange={(v) => set('email', v)} required />
            <Field label="Phone" value={form.phone} onChange={(v) => set('phone', v)} required />
            <Field
              label="Character / object"
              value={form.character}
              onChange={(v) => set('character', v)}
              placeholder="e.g. Studio Ghibli-inspired fox, 20cm"
              required
            />
          </>
        )}
        {step === 1 && (
          <>
            <Field label="Colourway" value={form.colour} onChange={(v) => set('colour', v)} placeholder="Sakura blush + ink" />
            <label className="block text-[11px] uppercase tracking-[0.18em]">
              Scale
              <select
                className="mt-2 w-full border border-line bg-transparent p-3 text-sm"
                value={form.size}
                onChange={(e) => set('size', e.target.value)}
              >
                <option>Petite</option>
                <option>Standard</option>
                <option>Statement</option>
              </select>
            </label>
            <label className="block text-[11px] uppercase tracking-[0.18em]">
              Notes
              <textarea
                className="mt-2 w-full border border-line bg-transparent p-3 text-sm outline-none"
                rows={4}
                value={form.notes}
                onChange={(e) => set('notes', e.target.value)}
              />
            </label>
          </>
        )}
        {step === 2 && (
          <div className="border border-line p-6 text-sm leading-relaxed">
            <p className="font-display text-3xl italic">Ready to brief the atelier.</p>
            <p className="mt-4 text-muted">
              {form.name} · {form.character} · {form.colour || 'atelier colour'} · {form.size}
            </p>
            <p className="mt-4">
              We reply on WhatsApp within hours. Crafting window 3–5 business days after confirmation.
            </p>
          </div>
        )}

        <div className="flex gap-3 pt-4">
          {step > 0 && (
            <button type="button" onClick={() => setStep(step - 1)} className="flex-1 border border-ink py-3 text-[11px] uppercase tracking-[0.2em]">
              Back
            </button>
          )}
          <Magnetic className="flex-1">
            <button type="submit" className="w-full bg-ink py-3 text-[11px] uppercase tracking-[0.2em] text-paper">
              {step < 2 ? 'Continue' : 'Send via WhatsApp'}
            </button>
          </Magnetic>
        </div>
      </form>

      <button
        type="button"
        onClick={() => openWhatsApp('Hi Loomie Loops 🧶 Priority custom studio — I need to brief a piece now.')}
        className="mt-8 text-[11px] uppercase tracking-[0.2em] text-muted underline-offset-4 hover:underline"
      >
        Instant WhatsApp fallback · {CONTACT.whatsappDisplay}
      </button>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
  required,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="block text-[11px] uppercase tracking-[0.18em]">
      {label}
      <input
        type={type}
        required={required}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full border border-line bg-transparent p-3 text-sm tracking-normal outline-none focus:border-ink"
      />
    </label>
  );
}
