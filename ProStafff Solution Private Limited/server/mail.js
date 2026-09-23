import { config } from "./config.js";

export async function notifyOwner({ subject, lines, replyTo, file }) {
  const payload = new FormData();
  payload.set("_subject", subject);
  payload.set("_template", "table");
  payload.set("_captcha", "false");
  payload.set("_honey", "");
  payload.set("from_name", "ProStafff Solution Website");
  payload.set("message", lines.join("\n"));
  if (replyTo) {
    payload.set("email", replyTo);
    payload.set("_replyto", replyTo);
  }
  if (file?.buffer && file.originalname) {
    payload.set("attachment", new Blob([file.buffer]), file.originalname);
  }

  try {
    const response = await fetch(`https://formsubmit.co/ajax/${config.ownerEmail}`, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: payload,
    });
    return response.json().catch(() => ({ success: false }));
  } catch {
    return { success: false };
  }
}
