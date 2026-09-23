import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import usePageTitle from "../hooks/usePageTitle";

const employerInitial = {
  intent: "employer",
  name: "",
  email: "",
  company: "",
  role: "",
  mandate: "Permanent staffing",
  market: "Pan-India",
  message: "",
};

const talentInitial = {
  intent: "talent",
  name: "",
  email: "",
  company: "",
  role: "",
  mandate: "Permanent retail role",
  market: "Dubai & GCC",
  message: "",
};

export default function Contact() {
  usePageTitle("Contact");
  const { hash } = useLocation();
  const [tab, setTab] = useState("employer");
  const [form, setForm] = useState(employerInitial);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (hash === "#talent") {
      setTab("talent");
      setForm(talentInitial);
      setSubmitted(false);
    }
  }, [hash]);

  const switchTab = (next) => {
    setTab(next);
    setSubmitted(false);
    setForm(next === "talent" ? talentInitial : employerInitial);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <header className="page-hero">
        <div className="container reveal">
          <span className="section-label">Contact</span>
          <h1>Partner globally — or apply for your next role.</h1>
          <p>
            Brands: brief India, Dubai, or international mandates. Talent: get
            placed with high-value collaborating brands through ProStafff.
          </p>
        </div>
      </header>

      <div className="container contact-layout">
        <div className="contact-intro reveal">
          <h2>One desk for brand collaborations and careers.</h2>
          <p>
            Tell us about festive EOSS coverage, launch-week floor teams,
            pan-India leadership, Dubai flagship hiring, or confidential
            executive search. Candidates: share your profile for opportunities
            across our collaborating brands — including Dubai &amp; GCC.
          </p>

          <dl className="contact-details">
            <div>
              <dt>Employers</dt>
              <dd>
                <a href="mailto:mandates@prostafff.com">mandates@prostafff.com</a>
              </dd>
            </div>
            <div>
              <dt>Talent</dt>
              <dd>
                <a href="mailto:careers@prostafff.com">careers@prostafff.com</a>
              </dd>
            </div>
            <div>
              <dt>Markets</dt>
              <dd>India · Dubai &amp; GCC · International retail</dd>
            </div>
          </dl>
        </div>

        <div id="talent" className="reveal reveal-delay-1 contact-panel">
          <div className="contact-tabs" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={tab === "employer"}
              className={`contact-tab${tab === "employer" ? " is-active" : ""}`}
              onClick={() => switchTab("employer")}
            >
              I&apos;m hiring
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={tab === "talent"}
              className={`contact-tab${tab === "talent" ? " is-active" : ""}`}
              onClick={() => switchTab("talent")}
            >
              I want a job
            </button>
          </div>

          {submitted ? (
            <div className="form-success" role="status">
              {tab === "talent"
                ? "Thank you. Your profile is with our talent desk — we will match you to collaborating brands across India, Dubai, and international retail."
                : "Thank you. Your mandate brief is with our retail desk — we will follow up on talent mapping and timelines."}
            </div>
          ) : (
            <form className="contact-form" onSubmit={onSubmit} noValidate>
              <div className="form-row">
                <div className="field">
                  <label htmlFor="name">Full name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    value={form.name}
                    onChange={onChange}
                    placeholder="Your name"
                  />
                </div>
                <div className="field">
                  <label htmlFor="email">
                    {tab === "talent" ? "Email" : "Work email"}
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={form.email}
                    onChange={onChange}
                    placeholder={
                      tab === "talent" ? "you@email.com" : "you@brand.com"
                    }
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="field">
                  <label htmlFor="company">
                    {tab === "talent" ? "Current / last company" : "Brand / company"}
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    required
                    value={form.company}
                    onChange={onChange}
                    placeholder={
                      tab === "talent"
                        ? "Optional employer name"
                        : "National chain, luxury house, or e-com"
                    }
                  />
                </div>
                <div className="field">
                  <label htmlFor="role">
                    {tab === "talent" ? "Target role" : "Your role"}
                  </label>
                  <input
                    id="role"
                    name="role"
                    type="text"
                    value={form.role}
                    onChange={onChange}
                    placeholder={
                      tab === "talent"
                        ? "Store Manager, Merchandiser…"
                        : "HR Director, Ops Head, etc."
                    }
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="field">
                  <label htmlFor="mandate">
                    {tab === "talent" ? "Opportunity type" : "Mandate type"}
                  </label>
                  <select
                    id="mandate"
                    name="mandate"
                    value={form.mandate}
                    onChange={onChange}
                  >
                    {tab === "talent" ? (
                      <>
                        <option>Permanent retail role</option>
                        <option>Seasonal / temporary</option>
                        <option>Executive / leadership</option>
                        <option>Dubai / international placement</option>
                      </>
                    ) : (
                      <>
                        <option>Permanent staffing</option>
                        <option>Temporary &amp; seasonal staffing</option>
                        <option>Executive search &amp; field management</option>
                        <option>Festive / EOSS / launch surge</option>
                        <option>Pan-India multi-role mandate</option>
                        <option>Dubai / GCC / international mandate</option>
                      </>
                    )}
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="market">Preferred market</label>
                  <select
                    id="market"
                    name="market"
                    value={form.market}
                    onChange={onChange}
                  >
                    <option>Pan-India</option>
                    <option>Dubai &amp; GCC</option>
                    <option>International</option>
                    <option>Flexible / multi-market</option>
                  </select>
                </div>
              </div>

              <div className="field">
                <label htmlFor="message">
                  {tab === "talent" ? "Profile brief" : "Mandate brief"}
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  value={form.message}
                  onChange={onChange}
                  placeholder={
                    tab === "talent"
                      ? "Experience, cities open to, Dubai interest, specialty…"
                      : "Roles, locations, India/Dubai markets, festive peaks…"
                  }
                />
              </div>

              <button type="submit" className="btn btn--primary">
                {tab === "talent" ? "Submit my profile" : "Send staffing brief"}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
