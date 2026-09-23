import { useState } from 'react';
import { CONTACT } from '../lib/constants';
import { openWhatsApp } from '../lib/whatsapp';
import { Eyebrow, Magnetic } from '../components/ui/Motion';

const STEPS = ['Client', 'Programme', 'Brief'];

export function BulkPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    type: 'Corporate gift boxes',
    qty: '25',
    deadline: '',
    notes: '',
  });

  function set<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  function submit() {
    openWhatsApp(
      `Hi Loomie Loops 🧶 B2B / Bulk inquiry:\n${form.name} · ${form.company}\n${form.email} · ${form.phone}\nProgramme: ${form.type}\nQty: ${form.qty}\nDeadline: ${form.deadline}\nBrief: ${form.notes}`,
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-6 pb-24 pt-28 md:pt-32">
      <Eyebrow>B2B / Bulk</Eyebrow>
      <h1 className="font-display text-5xl italic md:text-7xl">Corporate, festival, house gifting.</h1>
      <p className="mt-4 text-sm text-muted">
        Clean briefs for gift boxes, seasonal drops, and volume colourways. Priority routing on WhatsApp.
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
            <Input label="Name" value={form.name} onChange={(v) => set('name', v)} required />
            <Input label="Company / house" value={form.company} onChange={(v) => set('company', v)} required />
            <Input label="Email" type="email" value={form.email} onChange={(v) => set('email', v)} required />
            <Input label="Phone" value={form.phone} onChange={(v) => set('phone', v)} required />
          </>
        )}
        {step === 1 && (
          <>
            <label className="block text-[11px] uppercase tracking-[0.18em]">
              Programme
              <select
                className="mt-2 w-full border border-line bg-transparent p-3 text-sm"
                value={form.type}
                onChange={(e) => set('type', e.target.value)}
              >
                <option>Corporate gift boxes</option>
                <option>Festival bulk</option>
                <option>Custom design series</option>
                <option>Retail / pop-up</option>
              </select>
            </label>
            <Input label="Quantity" value={form.qty} onChange={(v) => set('qty', v)} />
            <Input label="Deadline" type="date" value={form.deadline} onChange={(v) => set('deadline', v)} />
          </>
        )}
        {step === 2 && (
          <label className="block text-[11px] uppercase tracking-[0.18em]">
            Design brief
            <textarea
              required
              rows={5}
              className="mt-2 w-full border border-line bg-transparent p-3 text-sm outline-none"
              value={form.notes}
              onChange={(e) => set('notes', e.target.value)}
              placeholder="Palette, characters, packaging, brand cues…"
            />
          </label>
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
      <p className="mt-8 text-xs text-muted">Priority desk · {CONTACT.whatsappDisplay} · {CONTACT.email}</p>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  type = 'text',
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block text-[11px] uppercase tracking-[0.18em]">
      {label}
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full border border-line bg-transparent p-3 text-sm tracking-normal outline-none focus:border-ink"
      />
    </label>
  );
}
