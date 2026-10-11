document.addEventListener("DOMContentLoaded", () => {
  const buttons = Array.from(document.querySelectorAll("[data-filter]"));
  const cards = Array.from(document.querySelectorAll(".notes-grid [data-topic]"));
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      buttons.forEach((candidate) => candidate.setAttribute("aria-pressed", String(candidate === button)));
      cards.forEach((card) => { card.hidden = filter !== "all" && card.dataset.topic !== filter; });
    });
  });
});