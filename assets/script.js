// Mobile nav toggle
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", nav.classList.contains("open"));
    });
  }

  // Mark active nav link based on pathname
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav a").forEach((a) => {
    const href = a.getAttribute("href");
    if (href === path) a.classList.add("active");
  });

  // Lightbox for press clippings
  const clips = document.querySelector(".clips");
  if (clips) {
    const box = document.createElement("div");
    box.className = "lightbox";
    box.innerHTML =
      '<button class="lb-close" aria-label="Close">&times;</button>' +
      '<button class="lb-prev" aria-label="Previous">&#8249;</button>' +
      '<img alt="Newspaper clipping" />' +
      '<button class="lb-next" aria-label="Next">&#8250;</button>' +
      '<div class="lb-count"></div>';
    document.body.appendChild(box);
    const img = box.querySelector("img");
    const count = box.querySelector(".lb-count");
    const links = [...clips.querySelectorAll("a")];
    let idx = 0;
    const show = (i) => {
      idx = (i + links.length) % links.length;
      img.src = links[idx].getAttribute("href");
      count.textContent = idx + 1 + " / " + links.length;
    };
    const open = (i) => { show(i); box.classList.add("open"); document.body.style.overflow = "hidden"; };
    const close = () => { box.classList.remove("open"); document.body.style.overflow = ""; };
    links.forEach((a, i) =>
      a.addEventListener("click", (e) => { e.preventDefault(); open(i); })
    );
    box.querySelector(".lb-close").addEventListener("click", close);
    box.querySelector(".lb-next").addEventListener("click", (e) => { e.stopPropagation(); show(idx + 1); });
    box.querySelector(".lb-prev").addEventListener("click", (e) => { e.stopPropagation(); show(idx - 1); });
    box.addEventListener("click", (e) => { if (e.target === box) close(); });
    document.addEventListener("keydown", (e) => {
      if (!box.classList.contains("open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") show(idx + 1);
      if (e.key === "ArrowLeft") show(idx - 1);
    });
  }
});
