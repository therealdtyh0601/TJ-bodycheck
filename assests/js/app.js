/* ------------------------------------------------------ */
/* app.js — Tianji Assessment App Controller               */
/* ------------------------------------------------------ */
/* This file connects all modules: i18n, assessment, UI,  */
/* score rendering, and appendix loader.                  */
/* ------------------------------------------------------ */


/* ------------------------------------------------------ */
/* 1. INITIAL SETUP                                        */
/* ------------------------------------------------------ */

// Default language
let currentLang = localStorage.getItem("tianji_lang") || "zh-CN";

document.addEventListener("DOMContentLoaded", () => {
  switchLang(currentLang);
  loadQuestions();
  loadAppendix();
});



/* ------------------------------------------------------ */
/* 2. LANGUAGE SWITCHING                                   */
/* ------------------------------------------------------ */

function switchLang(lang) {
  currentLang = lang;
  localStorage.setItem("tianji_lang", lang);

  // Update all elements with data-i18n
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (LANG[lang] && LANG[lang][key]) {
      el.innerHTML = LANG[lang][key];
    }
  });

  // Update questions again to reflect translation
  loadQuestions(true);
}



/* ------------------------------------------------------ */
/* 3. LOAD QUESTIONS INTO PAGE                             */
/* ------------------------------------------------------ */

function loadQuestions(isLangChange = false) {
  const container = document.getElementById("question-container");
  
  // If language changed → clear container to redraw
  if (isLangChange) container.innerHTML = "";

  // Build questions dynamically
  assessmentQuestions.forEach((q, index) => {
    const qId = `q${index+1}`;

    // Create card wrapper
    const card = document.createElement("div");
    card.className = "card";

    // Question text
    const qt = document.createElement("div");
    qt.className = "question-text";
    qt.setAttribute("data-i18n", q.i18nKey);
    qt.innerHTML = LANG[currentLang][q.i18nKey] || q.text;

    // Options wrapper
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



/* ------------------------------------------------------ */
/* 4. RESET ASSESSMENT                                     */
/* ------------------------------------------------------ */

function resetAssessment() {
  document.querySelectorAll("input[type=radio]").forEach(r => (r.checked = false));
  document.getElementById("result").classList.add("hidden");
  scrollToSection("assessment");
}



/* ------------------------------------------------------ */
/* 5. GENERATE REPORT                                      */
/* ------------------------------------------------------ */

function generateReport() {
  const answers = {};

  // Collect answers
  assessmentQuestions.forEach((q, index) => {
    const qId = `q${index+1}`;
    const selected = document.querySelector(`input[name="${qId}"]:checked`);
    answers[qId] = selected ? parseInt(selected.value) : 0;
  });

  // Calculate scores (assessment.js)
  const scores = calculateFiveElementScores(answers);

  // Render output
  renderScoreBars(scores);
  renderSummary(scores);
  renderRecommendations(scores);

  document.getElementById("result").classList.remove("hidden");
  scrollToSection("result");
}



/* ------------------------------------------------------ */
/* 6. SCORE BAR RENDERER                                   */
/* ------------------------------------------------------ */

function renderScoreBars(scoreObj) {
  const container = document.getElementById("score-bars");
  container.innerHTML = "";

  const elements = [
    { key: "wood",  label: LANG[currentLang]["label_wood"]  || "Wood" },
    { key: "fire",  label: LANG[currentLang]["label_fire"]  || "Fire" },
    { key: "earth", label: LANG[currentLang]["label_earth"] || "Earth" },
    { key: "metal", label: LANG[currentLang]["label_metal"] || "Metal" },
    { key: "water", label: LANG[currentLang]["label_water"] || "Water" },
  ];

  elements.forEach(el => {
    const row = document.createElement("div");
    row.className = "score-row";

    const lbl = document.createElement("div");
    lbl.className = "score-label";
    lbl.innerHTML = el.label;

    const wrap = document.createElement("div");
    wrap.className = "score-bar-wrapper";

    const bar = document.createElement("div");
    bar.className = `score-bar ${el.key}`;
    bar.style.width = "0%";

    wrap.appendChild(bar);
    row.appendChild(lbl);
    row.appendChild(wrap);
    container.appendChild(row);

    // Animate
    setTimeout(() => {
      bar.style.width = `${scoreObj[el.key]}%`;
    }, 150);
  });
}



/* ------------------------------------------------------ */
/* 7. SUMMARY RENDERER                                     */
/* ------------------------------------------------------ */

function renderSummary(scores) {
  const summaryMain = document.getElementById("summary-main");
  const summaryDetail = document.getElementById("summary-detail");

  const dominant = Object.keys(scores).reduce((a, b) =>
    scores[a] > scores[b] ? a : b
  );

  summaryMain.innerHTML = `
    <div class="insight-bubble">
      <strong>${LANG[currentLang]["summary_dominant"] || "Dominant Element"}:</strong> 
      ${LANG[currentLang]["label_" + dominant]} (${scores[dominant]}%)
    </div>
  `;

  summaryDetail.innerHTML = `
    <div class="insight-bubble">
      ${(LANG[currentLang]["summary_detail"] || "Your body’s Qi dynamics show the following distribution:")}
    </div>
  `;
}



/* ------------------------------------------------------ */
/* 8. RECOMMENDATIONS                                      */
/* ------------------------------------------------------ */

function renderRecommendations(scores) {
  const recBox = document.getElementById("recommendations");
  recBox.innerHTML = "";

  const recList = generateRecommendations(scores); // from recommendations.js

  recList.forEach(rec => {
    const card = document.createElement("div");
    card.className = "insight-bubble";
    card.innerHTML = `<strong>${rec.title}</strong><br>${rec.body}`;
    recBox.appendChild(card);
  });
}



/* ------------------------------------------------------ */
/* 9. SCROLL UTILITY                                       */
/* ------------------------------------------------------ */

function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({
    behavior: "smooth"
  });
}



/* ------------------------------------------------------ */
/* 10. LOAD APPENDIX CONTENT                               */
/* ------------------------------------------------------ */

function loadAppendix() {
  loadAppendixA();
  loadAppendixB();
  loadAppendixC();
  loadAppendixD();
}
