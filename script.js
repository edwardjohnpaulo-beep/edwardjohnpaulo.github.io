// ==========================
// script.js
// Theme, EmailJS, UI interactions
// ==========================

/* ========= Config ========= */
const EMAILJS_PUBLIC_KEY = "kF9UbAjEFsKjFxohi";
const EMAILJS_SERVICE = "service_3drpftj";
const EMAILJS_TEMPLATE = "template_fxp52wq";
const EMAILJS_TEMPLATE_AUTOREPLY = "template_autoreply";

/* ========= DOM ========= */
const body = document.body;
const themeToggle = document.getElementById("themeToggle");
const scrollTopBtn = document.getElementById("scrollTop");
const preloader = document.getElementById("preloader");
const contactForm = document.getElementById("contact-form");
const yearEl = document.getElementById("year");

/* ========= Init ========= */
document.addEventListener("DOMContentLoaded", () => {
  // Footer year
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Load saved theme
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    body.classList.add("light");
    if (themeToggle) themeToggle.textContent = "☀️";
  } else {
    if (themeToggle) themeToggle.textContent = "🌙";
  }

  // Init EmailJS
  if (window.emailjs) {
    try {
      emailjs.init(EMAILJS_PUBLIC_KEY);
    } catch (err) {
      console.warn("EmailJS init failed:", err);
    }
  }
});

/* ========= Theme Toggle ========= */
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isLight = body.classList.toggle("light");
    themeToggle.textContent = isLight ? "☀️" : "🌙";
    localStorage.setItem("theme", isLight ? "light" : "dark");
  });
}

/* ========= Scroll to Top ========= */
window.addEventListener("scroll", () => {
  if (!scrollTopBtn) return;
  scrollTopBtn.style.display = window.scrollY > 200 ? "flex" : "none";
});

if (scrollTopBtn) {
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ========= Contact Form ========= */
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const payload = Object.fromEntries(formData.entries());
    payload.time = new Date().toLocaleString();

    if (!payload.user_name || !payload.user_email || !payload.message) {
      alert("Please complete all required fields.");
      return;
    }

    if (!window.emailjs) {
      alert("Email service unavailable. Please email me directly.");
      return;
    }

    emailjs.send(EMAILJS_SERVICE, EMAILJS_TEMPLATE, payload)
      .then(() => {
        alert("✅ Message sent successfully!");
        contactForm.reset();

        // Auto reply
        emailjs.send(EMAILJS_SERVICE, EMAILJS_TEMPLATE_AUTOREPLY, {
          user_name: payload.user_name,
          user_email: payload.user_email,
          message:
            "Thank you for reaching out! I’ve received your message and will get back to you shortly.\n\n— Edward John Paulo",
          time: payload.time
        }).catch(err => console.warn("Auto-reply failed:", err));
      })
      .catch(err => {
        console.error("EmailJS error:", err);
        alert("❌ Failed to send message. Please try again later.");
      });
  });
}

/* ========= Preloader ========= */
window.addEventListener("load", () => {
  if (!preloader) return;
  preloader.style.opacity = "0";
  preloader.style.pointerEvents = "none";
  setTimeout(() => {
    preloader.style.display = "none";
  }, 400);
});
