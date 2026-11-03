// Тот же Google Apps Script (Google Таблица), что и на основном сайте.
const LEAD_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbwSLKEvjcgUpMXUGxWZkiYDrY_oLAJh5aqSx2HFBof-gt1ZxTDt6x7qC8m55CUeVPzK/exec";

document.querySelectorAll(".lead-form").forEach((form) => {
  const phone = form.querySelector("[name=phone]");
  const err = form.querySelector(".err");

  phone.addEventListener("input", () => {
    let d = phone.value.replace(/\D/g, "");
    if (d[0] === "8" || d[0] === "7") d = d.slice(1);
    d = d.slice(0, 10);
    let o = "+7";
    if (d.length) o += " (" + d.slice(0, 3);
    if (d.length >= 3) o += ")";
    if (d.length > 3) o += " " + d.slice(3, 6);
    if (d.length > 6) o += "-" + d.slice(6, 8);
    if (d.length > 8) o += "-" + d.slice(8, 10);
    phone.value = o;
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const digits = phone.value.replace(/\D/g, "");
    if (name.length < 2 || digits.length !== 11) {
      err.style.display = "block";
      return;
    }
    err.style.display = "none";
    const btn = form.querySelector("button");
    btn.disabled = true;
    btn.textContent = "Отправляем…";

    const data = new URLSearchParams({ name, phone: phone.value });
    try {
      await fetch(LEAD_ENDPOINT, { method: "POST", mode: "no-cors", body: data });
    } catch (_) {}
    location.href = "thanks.html" + location.search;
  });
});
