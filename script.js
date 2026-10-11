const cover = document.querySelector("#cover");
const openButton = document.querySelector("#open-invite");
const invitation = document.querySelector("#invitation");

openButton.addEventListener("click", () => {
  if (openButton.disabled) return;
  openButton.disabled = true;
  startWeddingSong();
  cover.classList.add("opened");
  window.setTimeout(() => {
    document.body.classList.add("invitation-open");
    document.body.classList.remove("cover-closed");
    cover.classList.add("is-opening");
    invitation.removeAttribute("inert");
    invitation.setAttribute("aria-hidden", "false");
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.setTimeout(() => cover.hidden = true, 900);
  }, 520);
}, { once: true });

const weddingTime = new Date("2026-12-12T18:00:00+05:30").getTime();
const countdownFields = {
  days: document.querySelector("#count-days"),
  hours: document.querySelector("#count-hours"),
  minutes: document.querySelector("#count-minutes"),
  seconds: document.querySelector("#count-seconds")
};
const countdownCaption = document.querySelector("#countdown-caption");

function updateCountdown() {
  const remaining = Math.max(0, weddingTime - Date.now());
  const days = Math.floor(remaining / 86_400_000);
  const hours = Math.floor((remaining % 86_400_000) / 3_600_000);
  const minutes = Math.floor((remaining % 3_600_000) / 60_000);
  const seconds = Math.floor((remaining % 60_000) / 1_000);
  countdownFields.days.textContent = String(days).padStart(2, "0");
  countdownFields.hours.textContent = String(hours).padStart(2, "0");
  countdownFields.minutes.textContent = String(minutes).padStart(2, "0");
  countdownFields.seconds.textContent = String(seconds).padStart(2, "0");
  if (remaining === 0) countdownCaption.textContent = "Rahul & Shreya’s wedding evening is here!";
}

updateCountdown();
window.setInterval(updateCountdown, 1000);

const soundButton = document.querySelector("#sound-button");
const soundLabel = soundButton.querySelector(".sound-label");
const invitationAudio = document.querySelector("#invitation-audio");
function startWeddingSong() {
  if (!invitationAudio || !invitationAudio.querySelector("source")?.getAttribute("src")) {
    soundLabel.textContent = "Wedding audio unavailable";
    return;
  }
  invitationAudio.play().then(() => {
      soundButton.setAttribute("aria-pressed", "true");
      soundLabel.textContent = "Pause wedding mantra";
  }).catch(() => {
    soundLabel.textContent = "Tap to start wedding mantra";
  });
}
soundButton.addEventListener("click", () => {
  if (invitationAudio.paused) startWeddingSong();
  else invitationAudio.pause();
});
invitationAudio?.addEventListener("pause", () => {
  soundButton.setAttribute("aria-pressed", "false");
  soundLabel.textContent = "Resume wedding mantra";
});
invitationAudio?.addEventListener("ended", () => {
  soundButton.setAttribute("aria-pressed", "false");
  soundLabel.textContent = "Replay wedding mantra";
});

if ("IntersectionObserver" in window) {
  const revealTargets = document.querySelectorAll(".reveal-section, .celebration-heading, .event-row, .countdown-section, .closing");
  revealTargets.forEach(element => element.classList.add("reveal-section"));
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealTargets.forEach(element => observer.observe(element));
}
