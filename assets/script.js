(() => {
  "use strict";

  const body = document.body;
  const header = document.querySelector("[data-header]");
  const nav = document.querySelector("[data-nav]");
  const navToggle = document.querySelector("[data-nav-toggle]");
  const progress = document.querySelector(".read-progress span");
  const toast = document.querySelector("[data-toast]");

  const updateScrollUi = () => {
    const top = window.scrollY || document.documentElement.scrollTop;
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    if (header) header.classList.toggle("is-scrolled", top > 20);
    if (progress) progress.style.width = `${Math.min(100, (top / max) * 100)}%`;
  };

  updateScrollUi();
  window.addEventListener("scroll", updateScrollUi, { passive: true });
  window.addEventListener("resize", updateScrollUi, { passive: true });

  const closeNav = () => {
    if (!nav || !navToggle) return;
    nav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    body.classList.remove("nav-open");
  };

  if (nav && navToggle) {
    navToggle.addEventListener("click", () => {
      const shouldOpen = navToggle.getAttribute("aria-expanded") !== "true";
      nav.classList.toggle("is-open", shouldOpen);
      navToggle.setAttribute("aria-expanded", String(shouldOpen));
      body.classList.toggle("nav-open", shouldOpen);
    });

    nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeNav));
    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeNav();
    });
  }

  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8%", threshold: 0.08 }
    );
    reveals.forEach((item) => observer.observe(item));
  } else {
    reveals.forEach((item) => item.classList.add("is-visible"));
  }

  const filterButtons = document.querySelectorAll("[data-filter]");
  const riskCards = document.querySelectorAll("[data-category]");
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter || "all";
      filterButtons.forEach((candidate) => {
        const active = candidate === button;
        candidate.classList.toggle("is-active", active);
        candidate.setAttribute("aria-pressed", String(active));
      });

      riskCards.forEach((card) => {
        const categories = (card.dataset.category || "").split(/\s+/);
        card.classList.toggle("is-hidden", filter !== "all" && !categories.includes(filter));
      });
    });
  });

  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("is-visible");
    window.setTimeout(() => toast.classList.remove("is-visible"), 1800);
  };

  const fallbackCopy = (text) => {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    body.appendChild(textarea);
    textarea.select();
    const successful = document.execCommand("copy");
    textarea.remove();
    if (!successful) throw new Error("copy failed");
  };

  const copyButton = document.querySelector("[data-copy-checklist]");
  const questionList = document.querySelector("[data-question-list]");
  const copyStatus = document.querySelector("[data-copy-status]");
  if (copyButton && questionList) {
    copyButton.addEventListener("click", async () => {
      const questions = [...questionList.querySelectorAll("li")]
        .map((item, index) => `${index + 1}. ${item.textContent.trim()}`)
        .join("\n");
      const text = `应聘佛山墨家科技有限公司前，请书面确认以下问题：\n\n${questions}`;

      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(text);
        } else {
          fallbackCopy(text);
        }
        if (copyStatus) copyStatus.textContent = "已复制，可直接发给招聘人员。";
        showToast("16 个问题已复制");
      } catch (_error) {
        if (copyStatus) copyStatus.textContent = "浏览器未允许复制，请手动选择右侧问题。";
        showToast("复制失败，请手动选择");
      }
    });
  }

  const correctionLink = document.querySelector("[data-correction-link]");
  const correctionEmail = window.SITE_CONFIG && window.SITE_CONFIG.correctionEmail;
  if (correctionLink && correctionEmail) {
    const subject = encodeURIComponent("关于求职风险核查页的更正或企业回应");
    correctionLink.href = `mailto:${correctionEmail}?subject=${subject}`;
    correctionLink.textContent = "通过专用邮箱提交更正";
    correctionLink.classList.remove("is-disabled");
    correctionLink.removeAttribute("aria-disabled");
  }
})();
