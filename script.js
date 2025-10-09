/* === Preloader === */
window.addEventListener("load", () => {
  document.getElementById("preloader").style.display = "none";
});

/* === Dark / Light Mode Toggle === */
const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  if (document.body.classList.contains("light")) {
    themeToggle.innerHTML = "🌙";
  } else {
    themeToggle.innerHTML = "☀️";
  }
});

/* === Scroll To Top Button === */
const scrollTopBtn = document.getElementById("scrollTop");
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollTopBtn.style.display = "block";
  } else {
    scrollTopBtn.style.display = "none";
  }
});
scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* === Typed Text Animation === */
const typedRoles = ["IT Specialist 💻", "Network Technician 🌐", "AI Enthusiast 🤖", "Piso WiFi Builder 📡", "Quality Assurance Associate 🔍"];
let typeIndex = 0, charIndex = 0, typingForward = true;
const typedEl = document.getElementById("typed");

function typeEffect() {
  if (typingForward) {
    if (charIndex < typedRoles[typeIndex].length) {
      typedEl.textContent += typedRoles[typeIndex].charAt(charIndex);
      charIndex++;
      setTimeout(typeEffect, 100);
    } else {
      typingForward = false;
      setTimeout(typeEffect, 1500);
    }
  } else {
    if (charIndex > 0) {
      typedEl.textContent = typedRoles[typeIndex].substring(0, charIndex - 1);
      charIndex--;
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
// Replace the following IDs with your EmailJS credentials
// 👉 Get them from https://www.emailjs.com/ after signing up
emailjs.init("yVpwOLOwkOjxlZLIx"); // e.g., "JH83XWyzabc123"

document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  emailjs.sendForm("service_3drpftj", "template_fxp52wq", this).then(
    function () {
      alert("✅ Message sent successfully!");
      document.getElementById("contactForm").reset();
    },
    function (error) {
      alert("❌ Failed to send message. Check console for details.");
      console.error(error);
    }
  );
});