
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const themeToggle = document.getElementById("theme-toggle");
const yearElement = document.getElementById("year");

// Current year in the footer
yearElement.textContent = new Date().getFullYear();

// Mobile navigation
menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute(
    "aria-label",
    open ? "Close navigation" : "Open navigation"
  );
  menuToggle.textContent = open ? "✕" : "☰";
});

// Close navigation after selecting a link
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    menuToggle.textContent = "☰";
  });
});

// Dark and light theme
function applyTheme(theme) {
  document.body.classList.toggle("light", theme === "light");
  themeToggle.textContent = theme === "light" ? "☾" : "☀";
  themeToggle.setAttribute(
    "aria-label",
    theme === "light" ? "Switch to dark theme" : "Switch to light theme"
  );
  document.querySelector('meta[name="theme-color"]')
    .setAttribute("content", theme === "light" ? "#f5f7fc" : "#080d19");
}

themeToggle.addEventListener("click", () => {
  const nextTheme = document.body.classList.contains("light")
    ? "dark"
    : "light";

  applyTheme(nextTheme);

  try {
    localStorage.setItem("portfolio-theme", nextTheme);
  } catch (error) {
    // Theme switching still works if browser storage is unavailable.
  }
});

let initialTheme = "dark";

try {
  initialTheme = localStorage.getItem("portfolio-theme") || "dark";
} catch (error) {
  // Use the default dark theme if browser storage is unavailable.
}

applyTheme(initialTheme);
