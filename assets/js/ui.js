/* ------------------------------------------------------ */
/* ui.js — Stable UI Utilities for Tianji WebApp          */
/* ------------------------------------------------------ */
/* 只负责：                                                */
/*  - toast 提示                                          */
/*  - loading 遮罩                                        */
/*  - 简单 modal                                          */
/*  - 语言指示 UI                                         */
/* 不接管：                                                */
/*  - 问卷渲染                                            */
/*  - section 显示/隐藏                                   */
/*  - 语言切换逻辑                                        */
/* ------------------------------------------------------ */


/* ============================
   1. TOAST（右下角小提示）
============================ */

function UI_toast(message, duration = 2200) {
  let toast = document.getElementById("ui-toast");

  if (!toast) {
    toast = document.createElement("div");
    toast.id = "ui-toast";
    toast.className = "ui-toast";
    toast.style.position = "fixed";
    toast.style.right = "16px";
    toast.style.bottom = "16px";
    toast.style.maxWidth = "260px";
    toast.style.padding = "10px 14px";
    toast.style.borderRadius = "10px";
    toast.style.fontSize = "0.85rem";
    toast.style.lineHeight = "1.4";
    toast.style.background = "rgba(15,23,42,0.9)";
    toast.style.color = "#e2e8f0";
    toast.style.border = "1px solid rgba(148,163,184,0.5)";
    toast.style.boxShadow = "0 10px 25px rgba(15,23,42,0.6)";
    toast.style.opacity = "0";
    toast.style.pointerEvents = "none";
    toast.style.transition = "opacity 0.25s ease";
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.style.opacity = "1";

  setTimeout(() => {
    toast.style.opacity = "0";
  }, duration);
}


/* ============================
   2. LOADING 遮罩（居中）
============================ */

function UI_showLoading(message = "处理中…") {
  let mask = document.getElementById("ui-loading");

  if (!mask) {
    mask = document.createElement("div");
    mask.id = "ui-loading";
    mask.style.position = "fixed";
    mask.style.inset = "0";
    mask.style.display = "flex";
    mask.style.alignItems = "center";
    mask.style.justifyContent = "center";
    mask.style.background = "rgba(15,23,42,0.45)";
    mask.style.backdropFilter = "blur(4px)";
    mask.style.zIndex = "9999";
    mask.style.opacity = "0";
    mask.style.transition = "opacity 0.2s ease";
    mask.style.pointerEvents = "none";

    const box = document.createElement("div");
    box.style.minWidth = "160px";
    box.style.padding = "14px 18px";
    box.style.borderRadius = "14px";
    box.style.background = "rgba(15,23,42,0.98)";
    box.style.border = "1px solid rgba(148,163,184,0.6)";
    box.style.color = "#e2e8f0";
    box.style.fontSize = "0.9rem";
    box.style.display = "flex";
    box.style.alignItems = "center";
    box.style.gap = "10px";
    box.style.boxShadow = "0 14px 35px rgba(15,23,42,0.8)";

    const dot = document.createElement("div");
    dot.style.width = "10px";
    dot.style.height = "10px";
    dot.style.borderRadius = "999px";
    dot.style.border = "2px solid rgba(148,163,184,0.5)";
    dot.style.borderTopColor = "#6366f1";
    dot.style.animation = "ui-spin 0.8s linear infinite";

    const text = document.createElement("span");
    text.id = "ui-loading-text";
    text.textContent = message;

    box.appendChild(dot);
    box.appendChild(text);
    mask.appendChild(box);
    document.body.appendChild(mask);

    // 简单旋转动画（纯 CSS keyframes）
    const style = document.createElement("style");
    style.textContent = `
      @keyframes ui-spin {
        from { transform: rotate(0deg); }
        to   { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
  } else {
    const text = document.getElementById("ui-loading-text");
    if (text) text.textContent = message;
  }

  mask.style.pointerEvents = "auto";
  mask.style.opacity = "1";
}

function UI_hideLoading() {
  const mask = document.getElementById("ui-loading");
  if (!mask) return;
  mask.style.opacity = "0";
  mask.style.pointerEvents = "none";
}


/* ============================
   3. MODAL（中心对话框）
============================ */

function UI_showModal(title, message, buttonText = "OK") {
  let overlay = document.getElementById("ui-modal-overlay");

  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = "ui-modal-overlay";
    overlay.style.position = "fixed";
    overlay.style.inset = "0";
    overlay.style.display = "flex";
    overlay.style.alignItems = "center";
    overlay.style.justifyContent = "center";
    overlay.style.background = "rgba(15,23,42,0.45)";
    overlay.style.backdropFilter = "blur(4px)";
    overlay.style.zIndex = "9998";
    overlay.style.opacity = "0";
    overlay.style.transition = "opacity 0.2s ease";
    overlay.style.pointerEvents = "none";

    const modal = document.createElement("div");
    modal.id = "ui-modal-box";
    modal.style.maxWidth = "320px";
    modal.style.width = "90%";
    modal.style.padding = "18px 20px";
    modal.style.borderRadius = "16px";
    modal.style.background = "rgba(15,23,42,0.98)";
    modal.style.border = "1px solid rgba(148,163,184,0.7)";
    modal.style.color = "#e2e8f0";
    modal.style.boxShadow = "0 16px 40px rgba(15,23,42,0.9)";
    modal.style.display = "flex";
    modal.style.flexDirection = "column";
    modal.style.gap = "10px";

    const titleEl = document.createElement("div");
    titleEl.id = "ui-modal-title";
    titleEl.style.fontSize = "0.95rem";
    titleEl.style.fontWeight = "600";

    const bodyEl = document.createElement("div");
    bodyEl.id = "ui-modal-body";
    bodyEl.style.fontSize = "0.85rem";
    bodyEl.style.lineHeight = "1.5";
    bodyEl.style.color = "#cbd5e1";

    const btn = document.createElement("button");
    btn.id = "ui-modal-btn";
    btn.style.marginTop = "8px";
    btn.style.alignSelf = "flex-end";
    btn.style.padding = "8px 16px";
    btn.style.borderRadius = "999px";
    btn.style.border = "none";
    btn.style.fontSize = "0.85rem";
    btn.style.cursor = "pointer";
    btn.style.background = "linear-gradient(135deg, #6366f1, #4f46e5)";
    btn.style.color = "#ffffff";
    btn.style.boxShadow = "0 8px 20px rgba(79,70,229,0.6)";

    modal.appendChild(titleEl);
    modal.appendChild(bodyEl);
    modal.appendChild(btn);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
  }

  const titleEl = document.getElementById("ui-modal-title");
  const bodyEl  = document.getElementById("ui-modal-body");
  const btnEl   = document.getElementById("ui-modal-btn");

  if (titleEl) titleEl.textContent = title || "";
  if (bodyEl)  bodyEl.innerHTML   = message || "";
  if (btnEl)   btnEl.textContent  = buttonText || "OK";

  overlay.onclick = (e) => {
    // 点击遮罩关闭；点击框内不关闭
    if (e.target.id === "ui-modal-overlay") {
      UI_hideModal();
    }
  };

  btnEl.onclick = () => UI_hideModal();

  overlay.style.opacity = "1";
  overlay.style.pointerEvents = "auto";
}

function UI_hideModal() {
  const overlay = document.getElementById("ui-modal-overlay");
  if (!overlay) return;
  overlay.style.opacity = "0";
  overlay.style.pointerEvents = "none";
}


/* ============================
   4. 语言指示（纯视觉）
============================ */

function UI_updateLanguageIndicator(langCode) {
  const el = document.getElementById("lang-indicator");
  if (!el) return;
  el.textContent = (langCode || "").toUpperCase();
}


/* ============================
   5. UI 日志（可接 analytics）
============================ */

function UI_log(msg) {
  console.log("[UI]", msg);
}
