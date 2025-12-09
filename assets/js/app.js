/* ------------------------------------------------------ */
/* app.js — Tianji Assessment Main Logic (Final Version)  */
/* ------------------------------------------------------ */

/* 题目数据从 assessment.js 注入 */
function loadQuestions() {
  const container = document.getElementById("question-container");
  container.innerHTML = "";

  QUESTIONS.forEach((q, index) => {
    const card = document.createElement("div");
    card.className = "card";

    let optionsHTML = "";
    q.options.forEach((opt, optIndex) => {
      const inputId = `q${index}_opt${optIndex}`;
      optionsHTML += `
        <label for="${inputId}" class="option-label">
          <input type="radio" name="q${index}" id="${inputId}" value="${opt.score}" />
          ${opt.text}
        </label>
      `;
    });

    card.innerHTML = `
      <div class="question">
        <div class="question-text">${q.text}</div>
        <div class="options">${optionsHTML}</div>
      </div>
    `;

    container.appendChild(card);
  });
}


/* 计算结果 -------------------------------------------- */

function generateReport() {
  const results = { wood: 0, fire: 0, earth: 0, metal: 0, water: 0 };

  // 遍历所有题目
  QUESTIONS.forEach((q, index) => {
    const selected = document.querySelector(`input[name="q${index}"]:checked`);
    if (selected) {
      const scoreObj = JSON.parse(selected.value); 
      // opt.score 是 {wood:0, fire:1,...}
      Object.keys(scoreObj).forEach(key => {
        results[key] += scoreObj[key];
      });
    }
  });

  renderBars(results);
  renderSummary(results);
  renderRecommendations(results);

  // 显示结果页
  showSection("result");
}


/* 结果：五行条形图 ------------------------------- */

function renderBars(results) {
  const container = document.getElementById("score-bars");
  container.innerHTML = "";

  Object.keys(results).forEach(type => {
    container.innerHTML += `
      <div class="score-row">
        <div class="score-label">${type.toUpperCase()}</div>
        <div class="score-bar-wrapper">
          <div class="score-bar ${type}" style="width: ${results[type] * 15}%;"></div>
        </div>
      </div>
    `;
  });
}


/* 结果摘要 -------------------------------------- */
function renderSummary(results) {
  const block = document.getElementById("summary-block");
  block.innerHTML = getSummaryText(results); // 来自 recommendations.js 或你自己的逻辑
}


/* 改善建议 -------------------------------------- */
function renderRecommendations(results) {
  const block = document.getElementById("recommendations-block");
  block.innerHTML = getRecommendationText(results);
}


/* 重置表单 -------------------------------------- */

function resetAssessment() {
  document.querySelectorAll("input[type=radio]").forEach(r => r.checked = false);
  showSection("assessment");
}


/* 初始化 ---------------------------------------- */
window.onload = function () {
  loadQuestions();
  showSection("home");
};
