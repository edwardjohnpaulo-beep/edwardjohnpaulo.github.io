// ==========================
// script.js
// Centralized theme, EmailJS, form handling, UI interactions
// ==========================

/* ========= Config ========= */
const EMAILJS_PUBLIC_KEY = "kF9UbAjEFsKjFxohi"; // keep your key
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
  // Set current year
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Theme load
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    body.classList.add("light");
    if (themeToggle) themeToggle.textContent = "🌞";
  } else {
    body.classList.remove("light");
    if (themeToggle) themeToggle.textContent = "🌙";
  }

  // EmailJS init
  if (window.emailjs) {
    try { emailjs.init(EMAILJS_PUBLIC_KEY); } catch (e) { console.warn("EmailJS init error:", e); }
  }

  // Preloader: ensure fade out if still visible
  window.setTimeout(() => {
    if (preloader) {
      preloader.style.opacity = 0;
      preloader.style.pointerEvents = "none";
      setTimeout(() => { preloader.style.display = "none"; }, 500);
    }
  }, 600); // small fallback timeout
});

/* ========= Theme Toggle ========= */
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isLight = body.classList.toggle("light");
    themeToggle.textContent = isLight ? "🌞" : "🌙";
    localStorage.setItem("theme", isLight ? "light" : "dark");
  });
}

/* ========= Scroll to Top ========= */
window.addEventListener("scroll", () => {
  if (!scrollTopBtn) return;
  scrollTopBtn.style.display = window.scrollY > 200 ? "block" : "none";
});
if (scrollTopBtn) {
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ========= Contact Form (EmailJS) ========= */
if (contactForm) {
  contactForm.addEventListener("submit", function (evt) {
    evt.preventDefault();

    // collect form data
    const form = evt.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    payload.time = new Date().toLocaleString();

    // Validate basic fields (HTML required handles most)
    if (!payload.user_name || !payload.user_email || !payload.message) {
      alert("Please complete all required fields.");
      return;
    }

    // Send
    if (window.emailjs) {
      emailjs.send(EMAILJS_SERVICE, EMAILJS_TEMPLATE, payload)
        .then(() => {
          alert("✅ Message sent successfully!");
          form.reset();

          // Auto-reply
          emailjs.send(EMAILJS_SERVICE, EMAILJS_TEMPLATE_AUTOREPLY, {
            user_name: payload.user_name,
            user_email: payload.user_email,
            message: "Thank you for reaching out! I’ve received your message and will get back to you shortly.\n\n— Edward John Paulo",
            time: payload.time
          }).catch(err => console.warn("Auto-reply failed:", err));
        }, (err) => {
          console.error("EmailJS error:", err);
          alert("❌ Error sending message. Please try again later.");
        });
    } else {
      alert("Email service is unavailable. Please contact me directly at edwardjohnpaulo@gmail.com");
    }
  });
}

/* ========= Window load: hide preloader reliably ========= */
window.addEventListener("load", () => {
  if (preloader) {
    preloader.style.opacity = 0;
    preloader.style.pointerEvents = "none";
    setTimeout(() => { preloader.style.display = "none"; }, 350);
  }
});