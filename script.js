// ==========================
// 🌙 Theme Toggle (Dark/Light)
// ==========================
const toggle = document.getElementById("themeToggle");
toggle.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");
  toggle.textContent = document.body.classList.contains("light-theme") ? "☀️" : "🌙";
});

// ==========================
// ⬆ Scroll to Top Button
// ==========================
const scrollTopBtn = document.getElementById("scrollTop");
window.addEventListener("scroll", () => {
  scrollTopBtn.style.display = window.scrollY > 200 ? "block" : "none";
});
scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ==========================
// 📧 EmailJS Integration
// ==========================
(function() {
  emailjs.init("kF9UbAjEFsKjFxohi"); // ✅ Your new public key
})();

document.getElementById("contact-form").addEventListener("submit", function(event) {
  event.preventDefault();

  // Add timestamp to form before sending
  const timestamp = new Date().toLocaleString();
  const formData = new FormData(this);
  formData.append("time", timestamp);

  emailjs.send("service_3drpftj", "template_fxp52wq", Object.fromEntries(formData))
    .then(() => {
      alert("✅ Message sent successfully!");
      this.reset();

      // Auto-reply to sender
      emailjs.send("service_3drpftj", "template_autoreply", {
        user_name: formData.get("user_name"),
        user_email: formData.get("user_email"),
        message: "Thank you for reaching out! I’ve received your message and will get back to you shortly.\n\n— Edward John Paulo",
        time: timestamp
      });
    }, (error) => {
      alert("❌ Error sending message:\n" + JSON.stringify(error));
    });
});

// ==========================
// ⏳ Preloader
// ==========================
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  preloader.style.display = "none";
});