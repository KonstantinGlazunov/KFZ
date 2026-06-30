const form = document.querySelector(".booking-form");
const serviceSelect = document.querySelector("#service");
const quickButtons = document.querySelectorAll(".quick-services button");
const timelineSteps = document.querySelectorAll(".timeline-step");

const translate = (key) => (window.i18n && window.i18n.t(key)) || key;

quickButtons.forEach((button) => {
  button.addEventListener("click", () => {
    serviceSelect.value = button.dataset.service;
    serviceSelect.focus();
    document.querySelector("#termin").scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let valid = true;

  form.querySelectorAll(".field").forEach((field) => {
    const input = field.querySelector("input, select");
    const invalid = !input.value.trim();
    field.classList.toggle("invalid", invalid);
    input.setAttribute("aria-invalid", invalid ? "true" : "false");
    if (invalid) valid = false;
  });

  const status = form.querySelector(".form-status");
  if (!valid) {
    status.textContent = translate("form.invalid");
    return;
  }

  status.textContent = translate("form.success");
  form.reset();
});

form.querySelectorAll("input, select").forEach((input) => {
  input.addEventListener("input", () => {
    input.closest(".field").classList.remove("invalid");
    input.removeAttribute("aria-invalid");
  });
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  timelineSteps.forEach((step) => observer.observe(step));
} else {
  timelineSteps.forEach((step) => step.classList.add("visible"));
}

window.addEventListener("languagechange", () => {
  const status = form.querySelector(".form-status");
  if (status) status.textContent = "";
});
