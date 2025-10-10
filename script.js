(function(){emailjs.init("YOUR_PUBLIC_KEY");})();
window.addEventListener("load",()=>{document.getElementById("preloader").style.display="none"});
const scrollTopBtn=document.getElementById("scrollTop");
window.addEventListener("scroll",()=>{scrollTopBtn.style.display=window.scrollY>300?"block":"none"});
scrollTopBtn.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})});
const toggle=document.getElementById("themeToggle");
toggle.addEventListener("click",()=>{document.body.classList.toggle("light");toggle.textContent=document.body.classList.contains("light")?"☀️":"🌙"});
document.getElementById("contact-form").addEventListener("submit",function(event){event.preventDefault();emailjs.sendForm("YOUR_SERVICE_ID","YOUR_TEMPLATE_ID",this).then(()=>alert("✅ Message sent successfully!")).catch(err=>alert("❌ Error: "+JSON.stringify(err)))});
