/* ------------------------------------------------------ */
/* app.js — Tianji Assessment Core Logic (Stable Build)   */
/* ------------------------------------------------------ */

/* GLOBAL STATES ---------------------------------------- */
let userAnswers = {};          // Stores all answers
let currentLang = "zh-CN";     // Default language


/* ------------------------------------------------------ */
/* 1. RENDER QUESTIONS                                    */
/* ------------------------------------------------------ */

function renderQuestions() {
  const container = document.getElementById("question-container");
  container.innerHTML = "";

  assessmentQuestions.forEach((q, index) => {
    const qId = `q${index + 1}`;

    const card = document.createElement("div");
    card.className = "card";

    let questionHTML = `
      <div class="question">
        <div class="question-text">${q.text}</div>
        <div class="options">
    `;

    q.options.forEach((opt, optIndex) => {
      const optId = `${qId}_opt${optIndex}`;

      questionHTML += `
        <label class="option-label" for="${optId}">
          <input 
            type="radio" 
            id="${optId}" 
            name="${qId}"
            value='${opt.value}'
            ${userAnswers[qId]?.raw === opt.value ? "checked" : ""}
          />
          ${opt.text}
        </label>
      `;
    });

    questionHTML += `
        </div>
      </div>
    `;

    card.innerHTML = questionHTML;
    container.appendChild(card);
  });

  bindInputListeners();
}


/* ------------------------------------------------------ */
/* 2. STORE ANSWERS SAFELY                                */
/* ------------------------------------------------------ */

function bindInputListeners() {
  const radios = document.querySelectorAll("input[type=radio]");

  radios.forEach(radio => {
    radio.addEventListener("change", () => {
      const qId = radio.name;
      const parsed = JSON.parse(radio.value);

      userAnswers[qId] = {
        raw: radio.value,
        score: parsed.score
      };
    });
  });
}


/* ------------------------------------------------------ */
/* 3. GENERATE REPORT                                      */
/* ------------------------------------------------------ */

function generateReport() {
  // Must answer at least 1 question
  const answered = Object.keys(userAnswers).length;
  if (answered === 0) {
    alert("请先完成问卷再生成报告。");
    return;
  }

  const score = calculateFiveElementScores(userAnswers);
  renderScoreBars(score);
  renderSummary(score);
  renderRecommendations(score);

  // Show result section
  document.getElementById("result").classList.remove("hidden");
  safeScrollTo("result");
}


/* ------------------------------------------------------ */
/* 3A. SCORE BAR RENDERING                                 */
/* ------------------------------------------------------ */

function renderScoreBars(score) {
  const container = document.getElementById("score-bars");
  container.innerHTML = "";

  const elements = [
    { key: "wood",  label: "木" },
    { key: "fire",  label: "火" },
    { key: "earth", label: "土" },
    { key: "metal", label: "金" },
    { key: "water", label: "水" }
  ];

  elements.forEach(el => {
    const percent = score[el.key];

    container.innerHTML += `
      <div class="score-row">
        <div class="score-label">${el.label}</div>
        <div class="score-bar-wrapper">
          <div class="score-bar ${el.key}" style="width:${percent}%"></div>
        </div>
        <div class="score-value">${percent}%</div>
      </div>
    `;
  });
}


/* ------------------------------------------------------ */
/* 3B. SUMMARY BLOCK                                       */
/* ------------------------------------------------------ */

function renderSummary(score) {
  const blk = document.getElementById("summary-block");

  let dominant = Object.entries(score).sort((a,b) => b[1] - a[1])[0][0];

  const map = {
    wood: "木象偏旺：压力外散、情绪张力高、肝气上浮。",
    fire: "火象偏旺：神明太亮、睡不深、精神紧绷发热。",
    earth: "土象偏旺：消化疲乏、吃完累、身体沉重。",
    metal: "金象偏旺：皮肤燥、鼻敏、呼吸浅、界限下降。",
    water: "水象偏弱：底气不足、耐力下降、精神储备不足。"
  };

  blk.innerHTML = `
    <div class="insight-bubble">
      <strong>主导节律：</strong> ${map[dominant]}
    </div>
  `;
}


/* ------------------------------------------------------ */
/* 3C. RECOMMENDATIONS                                    */
/* ------------------------------------------------------ */

function renderRecommendations(score) {
  const blk = document.getElementById("recommendations-block");
  blk.innerHTML = getRecommendations(score);
}


/* ------------------------------------------------------ */
/* 4. RESET ASSESSMENT                                     */
/* ------------------------------------------------------ */

function resetAssessment() {
  userAnswers = {};
  renderQuestions();
  document.getElementById("result").classList.add("hidden");
  safeScrollTo("assessment");
}


/* ------------------------------------------------------ */
/* 5. SECTION SMOOTH SCROLL                                */
/* ------------------------------------------------------ */

function safeScrollTo(id) {
  const el = document.getElementById(id);
  if (!el) return;

  setTimeout(() => {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 80);
}


/* ------------------------------------------------------ */
/* 6. INITIALIZATION                                       */
/* ------------------------------------------------------ */

window.addEventListener("DOMContentLoaded", () => {
  renderQuestions();
  loadAppendix();     // from appendix.js
  applyI18n();        // from i18n.js
});
