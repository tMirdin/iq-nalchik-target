// Таймер «лучшее предложение» и поп-ап через 10 секунд.
const TIMER_SECONDS = 60;
const POPUP_DELAY_MS = 10000;

const timerEls = document.querySelectorAll("#timer, .timer-val");
let left = TIMER_SECONDS;
const tick = () => {
  const t = String(Math.floor(left / 60)).padStart(2, "0") + ":" + String(left % 60).padStart(2, "0");
  timerEls.forEach((el) => (el.textContent = t));
  if (left > 0) left--;
  else left = TIMER_SECONDS; // по окончании запускаем заново
};
tick();
setInterval(tick, 1000);

const popup = document.getElementById("popup");
const close = () => {
  popup.hidden = true;
  try { sessionStorage.setItem("popupShown", "1"); } catch (_) {}
};
popup.querySelector(".modal-x").addEventListener("click", close);
popup.addEventListener("click", (e) => { if (e.target === popup) close(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });

let shown = false;
try { shown = sessionStorage.getItem("popupShown") === "1"; } catch (_) {}
if (!shown) {
  setTimeout(() => {
    popup.hidden = false;
    try { sessionStorage.setItem("popupShown", "1"); } catch (_) {}
  }, POPUP_DELAY_MS);
}
