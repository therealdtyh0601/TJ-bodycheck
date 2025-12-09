/* ------------------------------------------------------ */
/* ui.js — UI Rendering Utilities for Tianji WebApp       */
/* ------------------------------------------------------ */
/* Handles:                                               */
/*  - section switching                                   */
/*  - smooth scrolling                                    */
/*  - dynamic state toggles                               */
/*  - animated transitions                                */
/*  - toast / modal helpers (optional hooks added)         */
/* ------------------------------------------------------ */


/* ------------------------------------------------------ */
/* 1. SCROLLING / SECTION HANDLING                         */
/* ------------------------------------------------------ */

function UI_scrollTo(id) {
  const el = document.getElementById(id);
  if (!el) return;

  el.scrollIntoView({ behavior: "smooth" });
}

function UI_showSection(id) {
  document.querySelectorAll("section").forEach(sec => {
    sec.classList.add("hidden");
  });

  const target = document.getElementById(id);
  if (target) target.classList.remove("hidden");
}



/* ------------------------------------------------------ */
/* 2. LOADING STATE                                        */
/* ------------------------------------------------------ */

function UI_showLoading(msg = "Loading...") {
  let loader = document.getElementById("ui-loader");

  if (!loader) {
    loader = document.createElement("div");
    loader.id = "ui-loader";
    loader.className = "ui-loader";
    loader.innerHTML = `<div class="loader-spinner"></div><div class="loader-text">${msg}</div>`;
    document.body.appendChild(loader);
  }

  loader.classList.add("active");
}

function UI_hideLoading() {
  const loader = document.getElementById("ui-loader");
  if (loader) loader.classList.remove("active");
}



/* ------------------------------------------------------ */
/* 3. TOAST (非阻断提示)                                   */
/* ------------------------------------------------------ */

function UI_toast(msg, duration = 2400) {
  let toast = document.getElementById("ui-toast");

  if (!toast) {
    toast = document.createElement("div");
    toast.id = "ui-toast";
    toast.className = "ui-toast";
    document.body.appendChild(toast);
  }

  toast.innerHTML = msg;
  toast.classList.add("active");

  setTimeout(() => {
    toast.classList.remove("active");
  }, duration);
}



/* ------------------------------------------------------ */
/* 4. MODAL (阻断式提示框)                                 */
/* ------------------------------------------------------ */

function UI_showModal(title, message, btnText = "OK") {
  let modal = document.getElementById("ui-modal");

  if (!modal) {
    modal = document.createElement("div");
    modal.id = "ui-modal";
    modal.className = "ui-modal-overlay";
    modal.innerHTML = `
      <div class="ui-modal">
        <div class="ui-modal-title"></div>
        <div class="ui-modal-body"></div>
        <button class="ui-modal-btn"></button>
      </div>
    `;
    document.body.appendChild(modal);
  }

  modal.querySelector(".ui-modal-title").innerHTML = title;
  modal.querySelector(".ui-modal-body").innerHTML = message;
  modal.querySelector(".ui-modal-btn").innerHTML = btnText;

  modal.classList.add("active");

  modal.querySelector(".ui-modal-btn").onclick = () => {
    modal.classList.remove("active");
  };
}



/* ------------------------------------------------------ */
/* 5. BUTTON STATE / DISABLED 状态控制                    */
/* ------------------------------------------------------ */

function UI_disable(btnId) {
  const btn = document.getElementById(btnId);
  if (btn) {
    btn.disabled = true;
    btn.classList.add("disabled");
  }
}

function UI_enable(btnId) {
  const btn = document.getElementById(btnId);
  if (btn) {
    btn.disabled = false;
    btn.classList.remove("disabled");
  }
}



/* ------------------------------------------------------ */
/* 6. SMOOTH FADE EFFECTS                                  */
/* ------------------------------------------------------ */

function UI_fadeIn(el, duration = 250) {
  el.style.opacity = 0;
  el.style.display = "block";
  let last = +new Date();

  const tick = function () {
    el.style.opacity = +el.style.opacity + (new Date() - last) / duration;
    last = +new Date();

    if (+el.style.opacity < 1) {
      requestAnimationFrame(tick);
    }
  };

  tick();
}

function UI_fadeOut(el, duration = 250) {
  el.style.opacity = 1;
  let last = +new Date();

  const tick = function () {
    el.style.opacity = +el.style.opacity - (new Date() - last) / duration;
    last = +new Date();

    if (+el.style.opacity > 0) {
      requestAnimationFrame(tick);
    } else {
      el.style.display = "none";
    }
  };

  tick();
}



/* ------------------------------------------------------ */
/* 7. LANGUAGE SWITCH VISUAL SUPPORT                       */
/* ------------------------------------------------------ */

function UI_updateLanguageIndicator(lang) {
  const selector = document.getElementById("lang-indicator");
  if (!selector) return;

  selector.innerHTML = lang.toUpperCase();
}



/* ------------------------------------------------------ */
/* 8. PROGRESS / STEPS INDICATOR                           */
/* ------------------------------------------------------ */

function UI_updateProgress(current, total) {
  const bar = document.getElementById("progress-bar");
  const label = document.getElementById("progress-label");

  if (!bar) return;

  const percentage = Math.round((current / total) * 100);
  bar.style.width = `${percentage}%`;

  if (label) label.innerHTML = `${current} / ${total}`;
}



/* ------------------------------------------------------ */
/* 9. SAFE LOG (未来可接 Analytics)                        */
/* ------------------------------------------------------ */

function UI_log(message) {
  console.log(`[UI] ${message}`);
}
