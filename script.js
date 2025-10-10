/* === Preloader === */
window.addEventListener("load", () => {
  document.getElementById("preloader").style.display = "none";
});

/* === Dark / Light Mode Toggle === */
const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");

  if (document.body.classList.contains("light")) {
    themeToggle.textContent = "🌙"; // Moon icon for light mode
    localStorage.setItem("theme", "light");
  } else {
    themeToggle.textContent = "☀️"; // Sun icon for dark mode
    localStorage.setItem("theme", "dark");
  }
});

// Remember theme preference
window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.body.classList.add("light");
    themeToggle.textContent = "🌙";
  }
});

/* === Scroll To Top Button === */
const scrollTopBtn = document.getElementById("scrollTop");
window.addEventListener("scroll", () => {
  scrollTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
});
scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* === Typed Text Animation === */
const typedRoles = [
  "IT Specialist 💻",
  "Network Technician 🌐",
  "AI Enthusiast 🤖",
  "Piso WiFi Builder 📡",
  "Quality Assurance Associate 🔍"
];
let typeIndex = 0, charIndex = 0, typingForward = true;
const typedEl = document.getElementById("typed");

function typeEffect() {
  if (typingForward) {
    if (charIndex < typedRoles[typeIndex].length) {
      typedEl.textContent += typedRoles[typeIndex].charAt(charIndex++);
      setTimeout(typeEffect, 100);
    } else {
      typingForward = false;
      setTimeout(typeEffect, 1500);
    }
  } else {
    if (charIndex > 0) {
      typedEl.textContent = typedRoles[typeIndex].substring(0, --charIndex);
      setTimeout(typeEffect, 50);
    } else {
      typingForward = true;
      typeIndex = (typeIndex + 1) % typedRoles.length;
      setTimeout(typeEffect, 300);
    }
  }
}
typeEffect();

/* === EmailJS Setup === */
emailjs.init("yVpwOLOwkOjxlZLIx"); // Replace with your EmailJS public key

document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  emailjs.sendForm("service_3drpftj", "template_fxp52wq", this)
    .then(() => {
      alert("✅ Message sent successfully!");
      this.reset();
    })
    .catch(error => {
      alert("❌ Failed to send message. Check console for details.");
      console.error(error);
    });
});
