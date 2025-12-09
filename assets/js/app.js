/* ------------------------------------------------------ */
/* app.js — Tianji App (Stability-Fixed Version)          */
/* ------------------------------------------------------ */
/* 修复内容：                                              */
/* 1. 永不因误触重绘问卷                                   */
/* 2. 用户选择永不消失（实时缓存）                         */
/* 3. Appendix 永远能打开                                 */
/* 4. 防止语言按钮误触与 click 冒泡                        */
/* 5. 安全 scroll + 重绘保护                                */
/* ------------------------------------------------------ */


// =====================
// 1. GLOBAL STATE
// =====================

// 保存用户选项（避免 DOM 重新渲染造成丢失）
let savedAnswers = {};

// 控制语言切换按钮的误触
let allowLangSwitch = true;

// 当前语言
let currentLang = localStorage.getItem("tianji_lang") || "zh-CN";


// =====================
// 2. SAFE DOM READY
// =====================
document.addEventListener("DOMContentLoaded", () => {
  switchLang(currentLang);

  // 初始化问卷（只加载一次）
  loadQuestions(false);

  // 加载附录
  loadAppendix();

  // 绑定选项记录
  setupAnswerPersistence();

  // 防止语言按钮误触
  protectLanguageButtons();
});



// =====================
// 3. 防止语言按钮误触
// =====================
function protectLanguageButtons() {
  const btns = document.querySelectorAll(".lang-btn");

  btns.forEach(btn => {
    btn.addEventListener("click", (event) => {
      event.stopPropagation(); // 阻止冒泡
    });

    btn.addEventListener("touchstart", (event) => {
      event.stopPropagation();
    });
  });
}



// =====================
// 4. 语言切换（安全模式）
// =====================
function switchLang(lang) {
  if (!allowLangSwitch) return;

  allowLangSwitch = false;
  setTimeout(() => allowLangSwitch = true, 500); // 防止双触发

  currentLang = lang;
  localStorage.setItem("tianji_lang", lang);

  // 只翻译标签，不重绘问题
  document.querySelectorAll("[data-i18n]").forEach(el => {
    let key = el.getAttribute("data-i18n");
    if (LANG[lang] && LANG[lang][key]) {
      el.innerHTML = LANG[lang][key];
    }
  });

  // 翻译问题文字（不清空、不重建选项）
  translateQuestionTexts();
}



// =====================
// 5. 翻译问题内容（安全写法）
// =====================
function translateQuestionTexts() {
  assessmentQuestions.forEach((q, index) => {
    const qId = `q${index+1}`;
    const el = document.querySelector(`[data-qid="${qId}"]`);
    if (el) {
      el.innerHTML = LANG[currentLang][q.i18nKey] || q.text;
    }

    // 翻译选项
    q.options.forEach((opt, optIndex) => {
      const optEl = document.querySelector(`#${qId}_opt${optIndex} + span`);
      if (optEl) {
        optEl.innerHTML = LANG[currentLang][opt.i18nKey] || opt.text;
      }
    });
  });
}



// =====================
// 6. 加载题目（不会清空已选）
// =====================
function loadQuestions(isLangChange = false) {
  const container = document.getElementById("question-container");

  // 仅首次渲染，语言切换不再重绘
  if (isLangChange) return;

  container.innerHTML = "";

  assessmentQuestions.forEach((q, index) => {
    const qId = `q${index+1}`;
    const card = document.createElement("div");
    card.className = "card";

    // 问题文字
    const qt = document.createElement("div");
    qt.className = "question-text";
    qt.setAttribute("data-i18n", q.i18nKey);
    qt.setAttribute("data-qid", qId);
    qt.innerHTML = LANG[currentLang][q.i18nKey] || q.text;

    // 选项
    const optWrap = document.createElement("div");
    optWrap.className = "options";

    q.options.forEach((opt, optIndex) => {
      const optId = `${qId}_opt${optIndex}`;

      const label = document.createElement("label");
      label.className = "option-label";
      label.setAttribute("for", optId);

      const input = document.createElement("input");
      input.type = "radio";
      input.name = qId;
      input.id = optId;
      input.value = opt.value;

      // 恢复用户之前的选择
      if (savedAnswers[qId] != null && savedAnswers[qId] == opt.value) {
        input.checked = true;
      }

      const textSpan = document.createElement("span");
      textSpan.innerHTML = LANG[currentLang][opt.i18nKey] || opt.text;

      label.appendChild(input);
      label.appendChild(textSpan);
      optWrap.appendChild(label);
    });

    card.appendChild(qt);
    card.appendChild(optWrap);
    container.appendChild(card);
  });
}



// =====================
// 7. 保存用户选项（核心修复）
// =====================
function setupAnswerPersistence() {
  document.addEventListener("change", (event) => {
    if (event.target.type === "radio") {
      savedAnswers[event.target.name] = event.target.value;
    }
  });
}



// =====================
// 8. 生成结果（不受 redraw 影响）
// =====================
function generateReport() {
  const answers = {};

  assessmentQuestions.forEach((q, index) => {
    const qId = `q${index+1}`;
    const selected = document.querySelector(`input[name="${qId}"]:checked`);
    answers[qId] = selected ? parseInt(selected.value) : 0;
  });

  const scores = calculateFiveElementScores(answers);

  renderScoreBars(scores);
  renderSummary(scores);
  renderRecommendations(scores);

  document.getElementById("result").classList.remove("hidden");

  safeScrollTo("result");
}



// =====================
// 9. 安全滚动（避免跳回）
// =====================
function safeScrollTo(id) {
  setTimeout(() => {
    document.getElementById(id).scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }, 50);
}



// =====================
// 10. Reset（不会闪动）
// =====================
function resetAssessment() {
  savedAnswers = {};
  document.querySelectorAll("input[type=radio]").forEach(el => el.checked = false);
  document.getElementById("result").classList.add("hidden");
  safeScrollTo("assessment");
}
