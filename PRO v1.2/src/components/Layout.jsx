import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function useScrollReveal() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      const timer = window.setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 80);
      return () => window.clearTimeout(timer);
    }
    window.scrollTo(0, 0);
    return undefined;
  }, [pathname, hash]);

  useEffect(() => {
    let cancelled = false;
    let observer;
    let safetyTimer;

    const run = () => {
      if (cancelled) return;
      const nodes = document.querySelectorAll(".reveal");
      if (!nodes.length) return;

      const reveal = (el) => el.classList.add("is-visible");
      const nearViewport = (el) => {
        const rect = el.getBoundingClientRect();
        return rect.top < window.innerHeight + 120 && rect.bottom > -40;
      };

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              reveal(entry.target);
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.05, rootMargin: "120px 0px 120px 0px" }
      );

      nodes.forEach((node) => {
        if (nearViewport(node)) {
          reveal(node);
        } else {
          observer.observe(node);
        }
      });

      safetyTimer = window.setTimeout(() => {
        if (cancelled) return;
        document.querySelectorAll(".reveal:not(.is-visible)").forEach(reveal);
      }, 1800);
    };

    const frame = window.requestAnimationFrame(run);

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frame);
      window.clearTimeout(safetyTimer);
      observer?.disconnect();
    };
  }, [pathname]);
}

export default function Layout() {
  useScrollReveal();

  return (
    <>
      <Navbar />
      <main className="page-main">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
