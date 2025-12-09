/* ------------------------------------------------------ */
/* Tianji 2.0 — 简化版评估引擎                            */
/* ------------------------------------------------------ */

const ELEMENTS = ["wood", "fire", "earth", "metal", "water"];

const QUESTIONS = [
  // 木
  {
    id: "q1",
    text: "最近是否容易烦躁、情绪上升快、肩颈容易紧？",
    element: "wood",
    weight: 1,
    options: [
      { label: "没有", value: 0 },
      { label: "偶尔", value: 1 },
      { label: "经常", value: 2 },
      { label: "非常明显", value: 3 }
    ]
  },
  {
    id: "q2",
    text: "是否出现“想太多、停不下来、压不住情绪”的情况？",
    element: "wood",
    weight: 1,
    options: [
      { label: "没有", value: 0 },
      { label: "偶尔", value: 1 },
      { label: "频繁", value: 2 },
      { label: "严重", value: 3 }
    ]
  },

  // 火
  {
    id: "q3",
    text: "是否出现半夜醒来、睡不深、容易受惊或紧绷？",
    element: "fire",
    weight: 1,
    options: [
      { label: "没有", value: 0 },
      { label: "偶尔", value: 1 },
      { label: "经常", value: 2 },
      { label: "非常明显", value: 3 }
    ]
  },
  {
    id: "q4",
    text: "是否感到头部容易发热、睡前容易过亮、很难关机？",
    element: "fire",
    weight: 1,
    options: [
      { label: "无", value: 0 },
      { label: "轻微", value: 1 },
      { label: "明显", value: 2 },
      { label: "严重", value: 3 }
    ]
  },

  // 土
  {
    id: "q5",
    text: "吃完饭后是否容易累、提不起劲、头脑模糊？",
    element: "earth",
    weight: 1,
    options: [
      { label: "没有", value: 0 },
      { label: "偶尔", value: 1 },
      { label: "经常", value: 2 },
      { label: "非常明显", value: 3 }
    ]
  },
  {
    id: "q6",
    text: "是否觉得身体沉重、容易累、早上难启动？",
    element: "earth",
    weight: 1,
    options: [
      { label: "无", value: 0 },
      { label: "轻微", value: 1 },
      { label: "频繁", value: 2 },
      { label: "严重", value: 3 }
    ]
  },

  // 金
  {
    id: "q7",
    text: "是否有皮肤干燥、鼻敏感、呼吸不顺、易叹气？",
    element: "metal",
    weight: 1,
    options: [
      { label: "没有", value: 0 },
      { label: "偶有", value: 1 },
      { label: "常常", value: 2 },
      { label: "严重", value: 3 }
    ]
  },
  {
    id: "q8",
    text: "是否容易委屈、容易受伤、界限感下降？",
    element: "metal",
    weight: 1,
    options: [
      { label: "无", value: 0 },
      { label: "轻微", value: 1 },
      { label: "明显", value: 2 },
      { label: "严重", value: 3 }
    ]
  },

  // 水
  {
    id: "q9",
    text: "是否觉得底气不足、容易虚、精神耐力下降？",
    element: "water",
    weight: 1,
    options: [
      { label: "无", value: 0 },
      { label: "轻微", value: 1 },
      { label: "明显", value: 2 },
      { label: "严重", value: 3 }
    ]
  },
  {
    id: "q10",
    text: "是否容易怕冷、腰酸、注意力不稳？",
    element: "water",
    weight: 1,
    options: [
      { label: "没有", value: 0 },
      { label: "偶尔", value: 1 },
      { label: "经常", value: 2 },
      { label: "明显", value: 3 }
    ]
  }
];

let answers = {}; // { q1: number, ... }

/* ---------- 渲染问卷 ---------- */
function renderQuestions() {
  const container = document.getElementById("question-container");
  container.innerHTML = "";

  QUESTIONS.forEach((q, index) => {
    const card = document.createElement("div");
    card.className = "card";

    let html = `
      <div class="question">
        <div class="question-text">
          ${index + 1}. ${q.text}
        </div>
        <div class="options">
    `;

    q.options.forEach((opt, optIndex) => {
      const inputId = `${q.id}_opt${optIndex}`;
      const checked = answers[q.id] === opt.value ? "checked" : "";

      html += `
        <label class="option-label" for="${inputId}">
          <input 
            type="radio" 
            id="${inputId}"
            name="${q.id}"
            value="${opt.value}"
            ${checked}
          />
          ${opt.label}
        </label>
      `;
    });

    html += `</div></div>`;
    card.innerHTML = html;
    container.appendChild(card);
  });

  // 绑定 change 事件
  document.querySelectorAll("#question-container input[type=radio]").forEach(input => {
    input.addEventListener("change", (e) => {
      const qid = e.target.name;
      const val = parseInt(e.target.value, 10) || 0;
      answers[qid] = val;
    });
  });
}

/* ---------- 生成报告 ---------- */
function generateReport() {
  if (Object.keys(answers).length === 0) {
    alert("请先完成问卷再生成报告。");
    return;
  }

  const score = { wood: 0, fire: 0, earth: 0, metal: 0, water: 0 };

  QUESTIONS.forEach(q => {
    const val = answers[q.id] ?? 0;
    score[q.element] += val * q.weight;
  });

  // 归一化到 0–100
  ELEMENTS.forEach(el => {
    const related = QUESTIONS.filter(q => q.element === el);
    const maxPerQuestion = 3;
    const maxScore = related.length * maxPerQuestion;
    const pct = maxScore ? Math.round((score[el] / maxScore) * 100) : 0;
    score[el] = pct;
  });

  renderScoreBars(score);
  renderSummary(score);
  renderRecommendations(score);

  document.getElementById("result").classList.remove("hidden");
  scrollToSection("result");
}

/* ---------- 渲染得分条 ---------- */
function renderScoreBars(score) {
  const container = document.getElementById("score-bars");
  container.innerHTML = "";

  const labels = {
    wood: "木",
    fire: "火",
    earth: "土",
    metal: "金",
    water: "水"
  };

  ELEMENTS.forEach(el => {
    const pct = score[el];

    const row = `
      <div class="score-row">
        <div class="score-label">${labels[el]}</div>
        <div class="score-bar-wrapper">
          <div class="score-bar ${el}" style="width:${pct}%"></div>
        </div>
        <div class="score-value">${pct}%</div>
      </div>
    `;
    container.insertAdjacentHTML("beforeend", row);
  });
}

/* ---------- 摘要 ---------- */
function renderSummary(score) {
  const blk = document.getElementById("summary-block");
  let dominant = "wood";
  let max = -1;

  ELEMENTS.forEach(el => {
    if (score[el] > max) {
      max = score[el];
      dominant = el;
    }
  });

  const textMap = {
    wood: "木象偏旺：压力外散、情绪张力较高，容易烦躁、肩颈紧。",
    fire: "火象偏旺：神明太亮，睡得浅、半夜醒、头部发热感明显。",
    earth: "土象偏旺：消化承载吃力，易饭后疲倦、身体沉重。",
    metal: "金象偏旺：皮肤鼻腔偏燥，呼吸浅、易叹气、界限感下降。",
    water: "水象偏弱：底气与耐力不足，易怕冷、腰酸、精神储备感下降。"
  };

  blk.innerHTML = `
    <div class="insight-bubble">
      <strong>当前主导节律：</strong>${textMap[dominant]}
    </div>
  `;
}

/* ---------- 建议（简单版） ---------- */
function renderRecommendations(score) {
  const blk = document.getElementById("recommendations-block");

  const recs = [];

  if (score.wood >= 60) {
    recs.push("木偏旺：建议安排温和运动（散步、拉伸），避免长期憋着情绪或高强度熬夜工作。");
  }
  if (score.fire >= 60) {
    recs.push("火偏旺：睡前减少蓝光、刺激内容，尝试 5–10 分钟的安静呼吸或身体扫描，帮助神经系统降温。");
  }
  if (score.earth >= 60) {
    recs.push("土偏重：饮食七分饱，减少油腻与过甜食物，饭后可轻微走动，避免立刻久坐或躺平。");
  }
  if (score.metal >= 60) {
    recs.push("金偏燥：适量补水，保持室内空气流动，可做舒缓拉伸与深呼吸练习。");
  }
  if (score.water >= 60) {
    recs.push("水偏虚：注意保暖与睡眠品质，不要长期硬撑过劳，适量补充静态休息。");
  }

  if (recs.length === 0) {
    recs.push("整体五行分布较为平均，目前以维持稳定作息、规律饮食与温和运动为主即可。");
  }

  blk.innerHTML = recs.map(r => `<p>• ${r}</p>`).join("");
}

/* ---------- 重置 ---------- */
function resetAssessment() {
  answers = {};
  document.querySelectorAll("#question-container input[type=radio]").forEach(i => {
    i.checked = false;
  });
  document.getElementById("result").classList.add("hidden");
  scrollToSection("assessment");
}

/* ---------- 附录渲染 ---------- */
function renderAppendix() {
  const el = document.getElementById("appendix-container");
  el.innerHTML = `
    <div class="glossary-list">
      <div class="glossary-header">天纪用词</div>
      <div class="glossary-header">五行 / 身体意象</div>
      <div class="glossary-header">日常说明</div>

      <div>肝木上浮</div>
      <div>木 · 疏泄</div>
      <div>容易烦躁、想太多、身体绷紧、肩颈僵硬。</div>

      <div>心火偏旺</div>
      <div>火 · 神明</div>
      <div>睡不深、半夜惊醒、头面发热、精神过亮。</div>

      <div>脾土困重</div>
      <div>土 · 承载</div>
      <div>吃完就累、想睡、觉得身体沉、脑袋钝钝的。</div>

      <div>肺金不润</div>
      <div>金 · 边界</div>
      <div>皮肤干燥、鼻敏、呼吸浅、易叹气、界限感弱。</div>

      <div>肾水偏虚</div>
      <div>水 · 底气</div>
      <div>容易怕冷、腰酸、耐力下降、精神储备感不足。</div>
    </div>
  `;
}

/* ---------- 滚动辅助 ---------- */
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ---------- 初始化 ---------- */
document.addEventListener("DOMContentLoaded", () => {
  renderQuestions();
  renderAppendix();
});
