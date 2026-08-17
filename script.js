/* ===========================================================
   DOORSTEP SHINE — script.js
   Vanilla JavaScript only. No frameworks, no backend.
   =========================================================== */

/* ======================================================
   1. BUSINESS CONTACT CONFIG
   Change these two lines only — every WhatsApp/call button
   on the site reads from here.
   ====================================================== */
// REPLACE 1: WhatsApp number in international format, no "+", no spaces
const WHATSAPP_NUMBER = "919360244726";
// REPLACE 2: Phone number used for tel: links
const PHONE_NUMBER = "+919360244726";

/* ====================================================== */

(function () {
  "use strict";

  /* ---------- Helpers ---------- */
  function waLink(message) {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }
  function telLink() {
    return `tel:${PHONE_NUMBER}`;
  }
  function showToast(message, duration = 3200) {
    const toast = document.getElementById("toast");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => toast.classList.remove("show"), duration);
  }

  /* ---------- Loader ---------- */
  window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    if (loader) setTimeout(() => loader.classList.add("hidden"), 400);
  });

  /* ---------- Sticky Navbar + Active link highlighting ---------- */
  const navbar = document.getElementById("navbar");
  const navLinks = document.querySelectorAll("[data-nav]");
  const sections = document.querySelectorAll("main section[id]");
  const scrollTopBtn = document.getElementById("scrollTop");

  function onScroll() {
    const y = window.scrollY;
    navbar.classList.toggle("scrolled", y > 40);
    scrollTopBtn.classList.toggle("visible", y > 600);

    let currentId = sections[0] ? sections[0].id : "";
    const offset = window.innerHeight * 0.35;
    sections.forEach((sec) => {
      if (sec.getBoundingClientRect().top - offset <= 0) currentId = sec.id;
    });
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${currentId}`);
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  scrollTopBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  /* ---------- Mobile hamburger menu ---------- */
  const hamburger = document.getElementById("hamburger");
  const navLinksWrap = document.getElementById("navLinks");

  function closeMenu() {
    hamburger.classList.remove("open");
    navLinksWrap.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
  }
  hamburger.addEventListener("click", () => {
    const open = hamburger.classList.toggle("open");
    navLinksWrap.classList.toggle("open", open);
    hamburger.setAttribute("aria-expanded", String(open));
  });
  navLinksWrap.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));

  /* ---------- Smooth scroll (native CSS handles most; JS closes menu + adjusts for fixed nav) ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (id.length > 1) {
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          const navH = document.getElementById("navbar").offsetHeight;
          const top = target.getBoundingClientRect().top + window.scrollY - navH + 1;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }
    });
  });

  /* ---------- Scroll reveal animations ---------- */
  const revealItems = document.querySelectorAll("[data-reveal]");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealItems.forEach((el) => revealObserver.observe(el));

  /* ---------- Timeline fill-on-scroll ---------- */
  const timeline = document.getElementById("timeline");
  const timelineFill = document.getElementById("timelineFill");
  if (timeline && timelineFill) {
    const timelineObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            timelineFill.style.width = "100%";
            timelineObserver.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );
    timelineObserver.observe(timeline);
  }

  /* ======================================================
     2. WHATSAPP / CALL BUTTONS
     ====================================================== */
  const heroMsg = "Hi Doorstep Shine! I would like to book a premium foam wash at my doorstep.";
  const areaMsg = "Hi Doorstep Shine! I want to check if doorstep vehicle washing is available in my area.";

  const waButtonIds = ["heroWhatsapp", "finalWhatsapp", "footerWhatsapp"];
  waButtonIds.forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.setAttribute("href", waLink(heroMsg));
  });

  const callButtonIds = ["heroCall", "finalCall", "footerCall", "bookingCall"];
  callButtonIds.forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.setAttribute("href", telLink());
  });

  const areaCheckBtn = document.getElementById("areaCheck");
  if (areaCheckBtn) {
    areaCheckBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.open(waLink(areaMsg), "_blank", "noopener");
    });
  }

  /* Service card "Book Now" buttons — message includes the specific service */
  document.querySelectorAll("[data-service]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const service = btn.getAttribute("data-service");
      const msg = `Hi Doorstep Shine! I would like to book the "${service}" service at my doorstep.`;
      window.open(waLink(msg), "_blank", "noopener");
    });
  });

  /* ======================================================
     3. VEHICLE SHOWCASE — inline SVG placeholder gallery
     REPLACE 3: To use real photos, replace the `svg` string
     for each vehicle below with `<img src="images/your-photo.jpg" alt="...">`
     ====================================================== */
  const vehicles = [
    { name: "Tata Nexon", cat: "Compact SUV", color: "#2f6fed" },
    { name: "Mahindra XUV700", cat: "SUV", color: "#4a5a7a" },
    { name: "Hyundai Creta", cat: "SUV", color: "#5fd0ff" },
    { name: "Maruti Suzuki Swift", cat: "Hatchback", color: "#ff8a5c" },
    { name: "Royal Enfield Classic 350", cat: "Motorcycle", color: "#3a7bff" },
    { name: "TVS Apache", cat: "Motorcycle", color: "#ff5c5c" },
    { name: "Honda Activa", cat: "Scooter", color: "#22c55e" },
    { name: "TVS Jupiter", cat: "Scooter", color: "#ffcb47" },
  ];

  function carSvg(color) {
    return `<svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="150" fill="#0e1626"/>
      <rect y="120" width="200" height="30" fill="#0a0f1c"/>
      <rect x="30" y="70" width="140" height="45" rx="14" fill="${color}"/>
      <path d="M50 70 Q65 42 90 42 H115 Q140 42 155 70 Z" fill="${color}"/>
      <rect x="65" y="50" width="70" height="22" rx="5" fill="#dceaff" opacity=".5"/>
      <circle cx="60" cy="118" r="15" fill="#0a0f1c"/><circle cx="60" cy="118" r="6" fill="#586a8f"/>
      <circle cx="145" cy="118" r="15" fill="#0a0f1c"/><circle cx="145" cy="118" r="6" fill="#586a8f"/>
    </svg>`;
  }
  function bikeSvg(color) {
    return `<svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="150" fill="#0e1626"/>
      <rect y="120" width="200" height="30" fill="#0a0f1c"/>
      <circle cx="55" cy="115" r="22" fill="none" stroke="#0a0f1c" stroke-width="8"/>
      <circle cx="150" cy="115" r="22" fill="none" stroke="#0a0f1c" stroke-width="8"/>
      <path d="M55 115 90 75h35l20 40" fill="none" stroke="${color}" stroke-width="7" stroke-linecap="round"/>
      <path d="M90 75 75 100h40" fill="none" stroke="${color}" stroke-width="6"/>
      <rect x="118" y="66" width="26" height="10" rx="4" fill="${color}"/>
    </svg>`;
  }
  function scooterSvg(color) {
    return `<svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="150" fill="#0e1626"/>
      <rect y="120" width="200" height="30" fill="#0a0f1c"/>
      <circle cx="55" cy="115" r="20" fill="none" stroke="#0a0f1c" stroke-width="8"/>
      <circle cx="150" cy="115" r="20" fill="none" stroke="#0a0f1c" stroke-width="8"/>
      <path d="M55 115 Q75 70 100 70 Q120 70 130 90 L150 115" fill="none" stroke="${color}" stroke-width="8" stroke-linecap="round"/>
      <rect x="120" y="55" width="16" height="10" rx="3" fill="${color}"/>
    </svg>`;
  }

  const vehicleGrid = document.getElementById("vehicleGrid");
  if (vehicleGrid) {
    vehicles.forEach((v, i) => {
      const isBike = v.cat === "Motorcycle";
      const isScooter = v.cat === "Scooter";
      const svg = isBike ? bikeSvg(v.color) : isScooter ? scooterSvg(v.color) : carSvg(v.color);
      const card = document.createElement("div");
      card.className = "vehicle-card";
      card.setAttribute("data-reveal", "");
      card.style.transitionDelay = `${(i % 4) * 0.06}s`;
      card.innerHTML = `
        <div class="vehicle-card-img">
          ${svg}
          <div class="vehicle-shine"></div>
        </div>
        <div class="vehicle-card-body">
          <p class="vehicle-cat">${v.cat}</p>
          <p class="vehicle-name">${v.name}</p>
        </div>`;
      vehicleGrid.appendChild(card);
      revealObserver.observe(card);
    });
  }

  /* ======================================================
     4. BEFORE / AFTER SLIDER
     ====================================================== */
  const baSlider = document.getElementById("baSlider");
  const baAfter = document.getElementById("baAfter");
  const baHandle = document.getElementById("baHandle");

  if (baSlider && baAfter && baHandle) {
    let dragging = false;

    function setSlider(percent) {
      percent = Math.min(100, Math.max(0, percent));
      baAfter.style.clipPath = `inset(0 ${100 - percent}% 0 0)`;
      baHandle.style.left = `${percent}%`;
    }
    function percentFromEvent(clientX) {
      const rect = baSlider.getBoundingClientRect();
      return ((clientX - rect.left) / rect.width) * 100;
    }

    baHandle.addEventListener("pointerdown", (e) => {
      dragging = true;
      baHandle.setPointerCapture(e.pointerId);
    });
    baSlider.addEventListener("pointerdown", (e) => {
      dragging = true;
      setSlider(percentFromEvent(e.clientX));
    });
    window.addEventListener("pointermove", (e) => {
      if (dragging) setSlider(percentFromEvent(e.clientX));
    });
    window.addEventListener("pointerup", () => (dragging = false));

    // Keyboard accessibility
    baHandle.setAttribute("tabindex", "0");
    baHandle.setAttribute("role", "slider");
    baHandle.setAttribute("aria-label", "Before and after comparison slider");
    baHandle.setAttribute("aria-valuemin", "0");
    baHandle.setAttribute("aria-valuemax", "100");
    baHandle.addEventListener("keydown", (e) => {
      const current = parseFloat(baHandle.style.left) || 50;
      if (e.key === "ArrowLeft") setSlider(current - 5);
      if (e.key === "ArrowRight") setSlider(current + 5);
    });

    setSlider(50);
  }

  /* ======================================================
     5. BOOKING FORM — validation + WhatsApp message
     ====================================================== */
  const bookingForm = document.getElementById("bookingForm");
  if (bookingForm) {
    bookingForm.addEventListener("submit", (e) => {
      e.preventDefault();
      let valid = true;

      const fields = [
        { id: "fName", type: "text" },
        { id: "fPhone", type: "phone" },
        { id: "fVehicleType", type: "select" },
        { id: "fModel", type: "text" },
        { id: "fService", type: "select" },
        { id: "fLocation", type: "text" },
        { id: "fDate", type: "text" },
        { id: "fTime", type: "text" },
      ];

      fields.forEach(({ id, type }) => {
        const input = document.getElementById(id);
        const wrap = input.closest(".form-field");
        let ok = input.value.trim().length > 0;
        if (ok && type === "phone") {
          ok = /^[\d\s+()-]{7,15}$/.test(input.value.trim());
        }
        wrap.classList.toggle("invalid", !ok);
        if (!ok) valid = false;
      });

      if (!valid) {
        showToast("Please fill in all required fields correctly.");
        return;
      }

      const data = Object.fromEntries(new FormData(bookingForm).entries());
      const message =
        `Hi Doorstep Shine!\n\n` +
        `I would like to book a doorstep wash.\n\n` +
        `Name: ${data.name}\n` +
        `Phone: ${data.phone}\n` +
        `Vehicle: ${data.vehicleType}\n` +
        `Model: ${data.model}\n` +
        `Service: ${data.service}\n` +
        `Location: ${data.location}\n` +
        `Preferred Date: ${data.date}\n` +
        `Preferred Time: ${data.time}`;

      window.open(waLink(message), "_blank", "noopener");
      showToast("Booking details ready — opening WhatsApp…");
      bookingForm.reset();
    });

    // Clear invalid state as the user types
    bookingForm.querySelectorAll("input, select").forEach((el) => {
      el.addEventListener("input", () => el.closest(".form-field").classList.remove("invalid"));
      el.addEventListener("change", () => el.closest(".form-field").classList.remove("invalid"));
    });

    // Prevent selecting a past date
    const dateInput = document.getElementById("fDate");
    if (dateInput) dateInput.min = new Date().toISOString().split("T")[0];
  }

  /* ======================================================
     6. TESTIMONIAL CAROUSEL
     ====================================================== */
  const track = document.getElementById("testimonialTrack");
  const prevBtn = document.getElementById("carouselPrev");
  const nextBtn = document.getElementById("carouselNext");
  const dotsWrap = document.getElementById("carouselDots");

  if (track) {
    const slides = track.children.length;
    let index = 0;
    let autoTimer;

    for (let i = 0; i < slides; i++) {
      const dot = document.createElement("button");
      dot.setAttribute("aria-label", `Go to testimonial ${i + 1}`);
      if (i === 0) dot.classList.add("active");
      dot.addEventListener("click", () => goTo(i));
      dotsWrap.appendChild(dot);
    }

    function update() {
      track.style.transform = `translateX(-${index * 100}%)`;
      [...dotsWrap.children].forEach((d, i) => d.classList.toggle("active", i === index));
    }
    function goTo(i) {
      index = (i + slides) % slides;
      update();
      resetAuto();
    }
    function resetAuto() {
      clearInterval(autoTimer);
      autoTimer = setInterval(() => goTo(index + 1), 5500);
    }

    prevBtn.addEventListener("click", () => goTo(index - 1));
    nextBtn.addEventListener("click", () => goTo(index + 1));
    resetAuto();
  }

  /* ======================================================
     7. FAQ ACCORDION
     ====================================================== */
  document.querySelectorAll(".faq-item").forEach((item) => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");
    question.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");
      document.querySelectorAll(".faq-item.open").forEach((openItem) => {
        openItem.classList.remove("open");
        openItem.querySelector(".faq-answer").style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add("open");
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });

})();
