/* ------------------------------------------------------ */
/* ui.js — Tianji Single-Page Navigation (Final Version)  */
/* ------------------------------------------------------ */

const SECTIONS = ["home", "assessment", "result", "appendix"];

/* 为单页模式设计：一次只显示一个 section */
function showSection(id) {
  SECTIONS.forEach(sec => {
    const el = document.getElementById(sec);
    if (!el) return;

    if (sec === id) {
      el.classList.remove("hidden");   // 显示
    } else {
      el.classList.add("hidden");      // 隐藏（soft-hide，不销毁 DOM）
    }
  });

  // 确保滚动到正确位置（避免 sticky nav 遮到）
  setTimeout(() => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, 50);
}


/* Navigation Buttons (首页 / 评估 / 附录) */
function safeScrollTo(id) {
  showSection(id);
}
