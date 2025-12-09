/* ------------------------------------------------------ */
/* app.js — Tianji WebApp (Stable Production Version)     */
/* ------------------------------------------------------ */
/* 关键修复：                                              */
/* 1. 语言切换不再重绘问卷                                 */
/* 2. 用户答案永不丢失                                     */
/* 3. 不再误触语言按钮                                     */
/* 4. Appendix 永远可打开                                 */
/* 5. 移动端不会误触                                       */
/* 6. 所有滚动操作安全稳定                                */
/* ------------------------------------------------------ */


/* ===============================
   GLOBAL STATE
================================= */

let savedAnswers = {}; // 永久保存用户答案（直到 reset）
let currentLang = localStorage.getItem("tianji_lang") || "zh-CN";

let allowLangSwitch = true;  // 防止误触语言按钮



/* ===============================
   DOM READY
================================= */

document.addEventListener("DOMContentLoaded", () => {

  // 设置语言（安全模式）
  switchLang(currentLang);

  // 初始化问卷（只渲染一次）
  loadQuestions(false);

  // 加载附录
  loadAppendix();

  // 启动选项持久化（radio 不会再丢失）
  setupAnswerPersistence();

  // 保护语言按钮避免误触
  protectLanguageButtons();

  // 更新显示语言标记
  UI_updateLanguageIndicator(currentLang);
});



/* ===============================
   LANGUAGE SWITCH (SAFE MODE)
================================= */

function switchLang(lang) {
  if (!allowLangSwitch) return;

  allowLangSwitch = false;
  setTimeout(() => allowLangSwitch = true, 500);

  currentLang = lang;
  localStorage.setItem("tianji_lang", lang);

  // 更新UI语言标签
  UI_updateLanguageIndicator(lang);

  // 翻译静态文本
  document.querySelectorAll("[data-i18n]").forEach(el => {
    let key = el.getAttribute("data-i18n");
    if (LANG[lang] && LANG[lang][key]) {
      el.innerHTML = LANG[lang][key];
    }
  });

  // 翻译问卷文字（不重绘、不清空）
  translateQuestionTexts();
}



/* ===============================
   PREVENT MIS-CLICK
================================= */

function protectLanguageButtons() {
  const btns = document.querySelectorAll(".lang-btn");
  btns.forEach(btn => {
    btn.addEventListener("click", (e) => e.stopPropagation());
    btn.addEventListener("touchstart", (e) => e.stopPropagation());
  });
}



/* ===============================
   TRANSLATE QUESTIONS ONLY
   （不清空、不重建、不改变 radio）
================================= */

function translateQuestionTexts() {
  assessmentQuestions.forEach((q, index) => {
    const qId = `q${index + 1}`;

    // 翻译问题标题
    const questionEl = document.querySelector(`[data-qid="${qId}"]`);
    if (questionEl) {
      questionEl.innerHTML = LANG[currentLang][q.i18nKey] || q.text;
    }

    // 翻译选项
    q.options.forEach((opt, optIndex) => {
      const spanEl = document.querySelector(`#${qId}_opt${optIndex} + span`);
      if (spanEl) {
        spanEl.innerHTML = LANG[currentLang][opt.i18nKey] || opt.text;
      }
    });
  });
}



/* ===============================
   INITIAL QUESTION RENDER
   （只执行一次，不重复渲染）
================================= */

function loadQuestions(isLangChange = false) {
  if (isLangChange) return; // 禁止语言切换重绘问卷

  const container = document.getElementById("question-container");
  container.innerHTML = "";

  assessmentQuestions.forEach((q, index) => {
    const qId = `q${index + 1}`;

    const card = document.createElement("div");
    card.className = "card";

    // 问题标题
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

      // 恢复用户选择
      if (savedAnswers[qId] == opt.value) {
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



/* ===============================
   RADIO ANSWER PERSISTENCE
================================= */

function setupAnswerPersistence() {
  document.addEventListener("change", (event) => {
    if (event.target.type === "radio") {
      savedAnswers[event.target.name] = event.target.value;
    }
  });
}



/* ===============================
   GENERATE REPORT
================================= */

function generateReport() {
  const answers = {};

  assessmentQuestions.forEach((q, index) => {
    const qId = `q${index + 1}`;
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



/* ===============================
   SAFE SCROLL
================================= */

function safeScrollTo(id) {
  setTimeout(() => {
    document.getElementById(id).scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }, 60);
}



/* ===============================
   RESET
================================= */

function resetAssessment() {
  savedAnswers = {};
  document.querySelectorAll("input[type='radio']").forEach(el => (el.checked = false));
  document.getElementById("result").classList.add("hidden");

  safeScrollTo("assessment");
}
