// Mobile nav toggle
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.getElementById("navLinks");

navToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

// Close nav on link click (mobile)
navLinks.addEventListener("click", (e) => {
  if (e.target.closest("a")) {
    navLinks.classList.remove("open");
  }
});

// Smooth scrolling & active link highlight
const navAnchors = document.querySelectorAll(".nav-link");
const sections = [...document.querySelectorAll("section")];

function setActiveLink() {
  let currentId = "";
  const scrollY = window.scrollY + 120;

  for (const section of sections) {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    if (scrollY >= top && scrollY < top + height) {
      currentId = section.id;
      break;
    }
  }

  navAnchors.forEach((a) => {
    a.classList.toggle("active", a.getAttribute("href") === "#" + currentId);
  });
}

window.addEventListener("scroll", setActiveLink);
setActiveLink();

// Scroll to top button
const scrollTopBtn = document.getElementById("scrollTopBtn");
window.addEventListener("scroll", () => {
  if (window.scrollY > 250) {
    scrollTopBtn.classList.add("visible");
  } else {
    scrollTopBtn.classList.remove("visible");
  }
});
scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Reveal on scroll
const revealEls = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealEls.forEach((el) => observer.observe(el));

// Experience filters
const filterButtons = document.querySelectorAll("#experienceFilters .tag-pill");
const experienceItems = document.querySelectorAll("#experienceTimeline .timeline-item");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const filter = btn.getAttribute("data-filter");
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    experienceItems.forEach((item) => {
      if (filter === "all") {
        item.style.display = "";
      } else {
        const tags = item.getAttribute("data-tags") || "";
        item.style.display = tags.includes(filter) ? "" : "none";
      }
    });
  });
});

// Progress bars animation
const progressFills = document.querySelectorAll(".progress-fill");
const progressRow = document.getElementById("progressRow");

const progressObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        progressFills.forEach((fill) => {
          const width = fill.getAttribute("data-width");
          fill.style.width = width + "%";
        });
        progressObserver.disconnect();
      }
    });
  },
  { threshold: 0.4 }
);

if (progressRow) {
  progressObserver.observe(progressRow);
}

// Dynamic year
document.getElementById("year").textContent = new Date().getFullYear();

