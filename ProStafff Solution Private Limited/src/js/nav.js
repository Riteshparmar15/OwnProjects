/**
 * Sticky header elevation, mobile drawer, and smooth-scroll helpers.
 */
const header = document.querySelector("#site-header");
const menuToggle = document.querySelector("#menu-toggle");
const menuClose = document.querySelector("#menu-close");
const drawer = document.querySelector("#nav-drawer");
const backdrop = document.querySelector("#nav-backdrop");
const drawerLinks = document.querySelectorAll("[data-close-drawer]");

function setHeaderState() {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 12);
}

function openDrawer() {
  drawer?.classList.add("is-open");
  backdrop?.classList.add("is-open");
  document.body.style.overflow = "hidden";
  menuToggle?.setAttribute("aria-expanded", "true");
  drawer?.setAttribute("aria-hidden", "false");
}

function closeDrawer() {
  drawer?.classList.remove("is-open");
  backdrop?.classList.remove("is-open");
  document.body.style.overflow = "";
  menuToggle?.setAttribute("aria-expanded", "false");
  drawer?.setAttribute("aria-hidden", "true");
}

function interceptHashLinks() {
  document.addEventListener("click", (event) => {
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;
    const id = link.getAttribute("href")?.slice(1);
    if (!id) return;
    event.preventDefault();
    scrollToId(id);
  });
}

export function initNav() {
  setHeaderState();
  window.addEventListener("scroll", setHeaderState, { passive: true });

  menuToggle?.addEventListener("click", openDrawer);
  menuClose?.addEventListener("click", closeDrawer);
  backdrop?.addEventListener("click", closeDrawer);
  drawerLinks.forEach((link) => link.addEventListener("click", closeDrawer));
  interceptHashLinks();

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeDrawer();
  });
}

/**
 * Scroll to a section, accounting for the sticky header.
 */
export function scrollToId(id) {
  const target = document.getElementById(id);
  if (!target) return;
  const offset = header ? header.offsetHeight + 8 : 80;
  const top = target.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: "smooth" });
}
