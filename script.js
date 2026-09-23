// ============================================================
// ÉCLAT BEAUTY LOUNGE - JAVASCRIPT
// ============================================================

const servicesData = [
  {
    id: 1,
    name: "Caviar Deep Protein Hair Treatment",
    category: "hair",
    duration: "75 Mins",
    price: 95.00,
    priceEgp: "1,800 EGP",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80",
    desc: "Intensive deep conditioning utilizing micro-infused caviar extract and bio-keratin to restore brittle, chemically treated hair."
  },
  {
    id: 2,
    name: "French Balayage & Silk Glossing",
    category: "hair",
    duration: "120 Mins",
    price: 140.00,
    priceEgp: "2,650 EGP",
    image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=600&q=80",
    desc: "Freehand hand-painted dimensional highlights paired with an organic acidic glossing glaze for luminous shine."
  },
  {
    id: 3,
    name: "24K Gold Rejuvenation HydraFacial",
    category: "skin",
    duration: "60 Mins",
    price: 110.00,
    priceEgp: "2,100 EGP",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80",
    desc: "Patented vortex vacuum extraction, peptide dermal infusion, and pure 24K gold foil mask for red-carpet luminosity."
  },
  {
    id: 4,
    name: "Collagen Firming Micro-Infusion",
    category: "skin",
    duration: "50 Mins",
    price: 85.00,
    priceEgp: "1,600 EGP",
    image: "https://images.unsplash.com/photo-1512290900672-1f55b6a03194?auto=format&fit=crop&w=600&q=80",
    desc: "Gentle nano-needling introducing marine collagen and hyaluronic acid to diminish fine lines and plump the skin barrier."
  },
  {
    id: 5,
    name: "Russian Gel Manicure & Hand Spa",
    category: "nails",
    duration: "70 Mins",
    price: 55.00,
    priceEgp: "1,050 EGP",
    image: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=600&q=80",
    desc: "Dry electronic cuticle care, flawless apex gel sculpting, chrome finish, and therapeutic hot rose oil massage."
  },
  {
    id: 6,
    name: "Pedicure Deluxe with Paraffin Therapy",
    category: "nails",
    duration: "60 Mins",
    price: 50.00,
    priceEgp: "950 EGP",
    image: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=600&q=80",
    desc: "Epsom salt soak, callus smoothing, warm lavender paraffin mask, and long-lasting glossy gel polish."
  },
  {
    id: 7,
    name: "Royal Moroccan Hammam & Herbal Bath",
    category: "massage",
    duration: "90 Mins",
    price: 130.00,
    priceEgp: "2,500 EGP",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80",
    desc: "Traditional black olive soap steam ritual, Kessa exfoliation, Ghassoul clay body mask, and calming floral mist."
  },
  {
    id: 8,
    name: "Hot Stone Aromatherapy Massage",
    category: "massage",
    duration: "60 Mins",
    price: 90.00,
    priceEgp: "1,700 EGP",
    image: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=600&q=80",
    desc: "Heated volcanic basalt stones combined with cold-pressed jasmine and sandalwood essential oils to release all tension."
  }
];

// On Ready
document.addEventListener("DOMContentLoaded", () => {
  renderServices("hair");
  setupServiceTabs();
  setDefaultBookingDate();
  setupMobileNav();
});

// Render Services
function renderServices(category) {
  const grid = document.getElementById("servicesGrid");
  grid.innerHTML = "";

  const filtered = servicesData.filter(s => s.category === category);

  filtered.forEach(item => {
    const card = document.createElement("div");
    card.className = "service-card";
    card.innerHTML = `
      <div class="service-card-img">
        <img src="${item.image}" alt="${item.name}" loading="lazy">
        <span class="srv-duration"><i class="fa-regular fa-clock"></i> ${item.duration}</span>
      </div>
      <div class="service-card-body">
        <h3>${item.name}</h3>
        <p>${item.desc}</p>
        <div class="service-card-footer">
          <div class="service-price">$${item.price.toFixed(0)} <span style="font-size: 0.8rem; color: #888; font-weight: normal;">(${item.priceEgp})</span></div>
          <button class="btn-srv-book" onclick="openBookingModal('${item.name}')">
            Reserve <i class="fa-solid fa-calendar"></i>
          </button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

// Service Tabs
function setupServiceTabs() {
  const tabs = document.querySelectorAll(".srv-tab");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      renderServices(tab.dataset.cat);
    });
  });
}

// Set Minimum & Default Date
function setDefaultBookingDate() {
  const dateInput = document.getElementById("bookDate");
  const today = new Date();
  today.setDate(today.getDate() + 1); // Tomorrow by default
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  dateInput.min = `${yyyy}-${mm}-${dd}`;
  dateInput.value = `${yyyy}-${mm}-${dd}`;
}

// Booking Modal Controls
function openBookingModal(preselectedService = null) {
  const modal = document.getElementById("bookingModal");
  const form = document.getElementById("bookingForm");
  const receipt = document.getElementById("bookingReceipt");

  form.style.display = "block";
  receipt.style.display = "none";

  if (preselectedService) {
    const select = document.getElementById("bookService");
    for (let opt of select.options) {
      if (opt.value.includes(preselectedService) || preselectedService.includes(opt.value)) {
        opt.selected = true;
        break;
      }
    }
  }

  modal.classList.add("active");
}

function closeBookingModal() {
  document.getElementById("bookingModal").classList.remove("active");
}

document.getElementById("bookingModal").addEventListener("click", (e) => {
  if (e.target.id === "bookingModal") closeBookingModal();
});

// Handle Booking Form Submit
function handleBookingSubmit(e) {
  e.preventDefault();

  const service = document.getElementById("bookService").value;
  const specialist = document.getElementById("bookSpecialist").value;
  const date = document.getElementById("bookDate").value;
  const time = document.getElementById("bookTime").value;
  const name = document.getElementById("bookName").value;
  const phone = document.getElementById("bookPhone").value;

  const form = document.getElementById("bookingForm");
  const receipt = document.getElementById("bookingReceipt");
  const summary = document.getElementById("receiptSummary");

  summary.innerHTML = `
    <strong>Guest Name:</strong> ${name}<br>
    <strong>Mobile:</strong> ${phone}<br>
    <strong>Treatment:</strong> ${service}<br>
    <strong>Artisan:</strong> ${specialist}<br>
    <strong>Date & Time:</strong> ${date} at ${time}<br>
    <strong>Location:</strong> Royal Plaza Lounge, Borg El Arab, Alexandria<br>
    <div style="margin-top: 10px; color: #1c362d; font-weight: 600;">
      ✨ A confirmation SMS has been prepared for ${phone}.
    </div>
  `;

  form.style.display = "none";
  receipt.style.display = "block";
}

// Mobile Nav
function setupMobileNav() {
  const toggle = document.getElementById("mobileToggle");
  const nav = document.getElementById("navLinks");
  toggle.addEventListener("click", () => {
    nav.classList.toggle("active");
  });

  document.querySelectorAll(".nav-links a").forEach(a => {
    a.addEventListener("click", () => nav.classList.remove("active"));
  });
}
