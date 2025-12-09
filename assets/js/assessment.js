/* ------------------------------------------------------ */
/* assessment.js — Tianji Question Bank (JSON-safe)       */
/* ------------------------------------------------------ */

const assessmentQuestions = [

  /* ------------------ 木 Wood ------------------ */
  {
    i18nKey: "q1_text",
    text: "最近是否容易烦躁、情绪上升快、肩颈容易紧？",
    element: "wood",
    weight: 1,
    options: [
      { value: JSON.stringify({score:0}), text: "没有", i18nKey: "opt_no" },
      { value: JSON.stringify({score:1}), text: "偶尔", i18nKey: "opt_slight" },
      { value: JSON.stringify({score:2}), text: "经常", i18nKey: "opt_often" },
      { value: JSON.stringify({score:3}), text: "非常明显", i18nKey: "opt_strong" }
    ]
  },
  {
    i18nKey: "q2_text",
    text: "是否出现“想太多、停不下来、压不住情绪”的情况？",
    element: "wood",
    weight: 1,
    options: [
      { value: JSON.stringify({score:0}), text: "没有", i18nKey: "opt_no" },
      { value: JSON.stringify({score:1}), text: "偶尔", i18nKey: "opt_slight" },
      { value: JSON.stringify({score:2}), text: "频繁", i18nKey: "opt_often" },
      { value: JSON.stringify({score:3}), text: "严重", i18nKey: "opt_strong" }
    ]
  },

  /* ------------------ 火 Fire ------------------ */
  {
    i18nKey: "q3_text",
    text: "是否出现半夜醒来、睡不深、容易受惊或紧绷？",
    element: "fire",
    weight: 1,
    options: [
      { value: JSON.stringify({score:0}), text: "没有", i18nKey: "opt_no" },
      { value: JSON.stringify({score:1}), text: "偶尔", i18nKey: "opt_slight" },
      { value: JSON.stringify({score:2}), text: "经常", i18nKey: "opt_often" },
      { value: JSON.stringify({score:3}), text: "非常明显", i18nKey: "opt_strong" }
    ]
  },
  {
    i18nKey: "q4_text",
    text: "是否感到头部容易发热、睡前容易过亮、很难关机？",
    element: "fire",
    weight: 1,
    options: [
      { value: JSON.stringify({score:0}), text: "无", i18nKey: "opt_no" },
      { value: JSON.stringify({score:1}), text: "轻微", i18nKey: "opt_slight" },
      { value: JSON.stringify({score:2}), text: "明显", i18nKey: "opt_often" },
      { value: JSON.stringify({score:3}), text: "严重", i18nKey: "opt_strong" }
    ]
  },

  /* ------------------ 土 Earth ------------------ */
  {
    i18nKey: "q5_text",
    text: "吃完饭后是否容易累、提不起劲、头脑模糊？",
    element: "earth",
    weight: 1,
    options: [
      { value: JSON.stringify({score:0}), text: "没有", i18nKey: "opt_no" },
      { value: JSON.stringify({score:1}), text: "偶尔", i18nKey: "opt_slight" },
      { value: JSON.stringify({score:2}), text: "经常", i18nKey: "opt_often" },
      { value: JSON.stringify({score:3}), text: "非常明显", i18nKey: "opt_strong" }
    ]
  },
  {
    i18nKey: "q6_text",
    text: "是否觉得身体沉重、容易累、早上难启动？",
    element: "earth",
    weight: 1,
    options: [
      { value: JSON.stringify({score:0}), text: "无", i18nKey: "opt_no" },
      { value: JSON.stringify({score:1}), text: "轻微", i18nKey: "opt_slight" },
      { value: JSON.stringify({score:2}), text: "频繁", i18nKey: "opt_often" },
      { value: JSON.stringify({score:3}), text: "严重", i18nKey: "opt_strong" }
    ]
  },

  /* ------------------ 金 Metal ------------------ */
  {
    i18nKey: "q7_text",
    text: "是否有皮肤干燥、鼻敏感、呼吸不顺、易叹气？",
    element: "metal",
    weight: 1,
    options: [
      { value: JSON.stringify({score:0}), text: "没有", i18nKey: "opt_no" },
      { value: JSON.stringify({score:1}), text: "偶有", i18nKey: "opt_slight" },
      { value: JSON.stringify({score:2}), text: "常常", i18nKey: "opt_often" },
      { value: JSON.stringify({score:3}), text: "严重", i18nKey: "opt_strong" }
    ]
  },
  {
    i18nKey: "q8_text",
    text: "是否容易委屈、容易受伤、界限感下降？",
    element: "metal",
    weight: 1,
    options: [
      { value: JSON.stringify({score:0}), text: "无", i18nKey: "opt_no" },
      { value: JSON.stringify({score:1}), text: "轻微", i18nKey: "opt_slight" },
      { value: JSON.stringify({score:2}), text: "明显", i18nKey: "opt_often" },
      { value: JSON.stringify({score:3}), text: "严重", i18nKey: "opt_strong" }
    ]
  },

  /* ------------------ 水 Water ------------------ */
  {
    i18nKey: "q9_text",
    text: "是否觉得底气不足、容易虚、精神耐力下降？",
    element: "water",
    weight: 1,
    options: [
      { value: JSON.stringify({score:0}), text: "无", i18nKey: "opt_no" },
      { value: JSON.stringify({score:1}), text: "轻微", i18nKey: "opt_slight" },
      { value: JSON.stringify({score:2}), text: "明显", i18nKey: "opt_often" },
      { value: JSON.stringify({score:3}), text: "严重", i18nKey: "opt_strong" }
    ]
  },
  {
    i18nKey: "q10_text",
    text: "是否容易怕冷、腰酸、注意力不稳？",
    element: "water",
    weight: 1,
    options: [
      { value: JSON.stringify({score:0}), text: "没有", i18nKey: "opt_no" },
      { value: JSON.stringify({score:1}), text: "偶尔", i18nKey: "opt_slight" },
      { value: JSON.stringify({score:2}), text: "经常", i18nKey: "opt_often" },
      { value: JSON.stringify({score:3}), text: "明显", i18nKey: "opt_strong" }
    ]
  }
];

/* ------------------------------------------------------ */
/* Five-Element Score Engine                              */
/* ------------------------------------------------------ */

function calculateFiveElementScores(answerObj) {
  let score = { wood: 0, fire: 0, earth: 0, metal: 0, water: 0 };

  assessmentQuestions.forEach((q, i) => {
    const qId = `q${i+1}`;
    const ans = answerObj[qId]?.score ?? 0;
    score[q.element] += ans * q.weight;
  });

  // Normalize each element
  ["wood","fire","earth","metal","water"].forEach(el => {
    const max = assessmentQuestions.filter(q => q.element === el).length * 3;
    score[el] = Math.round((score[el] / max) * 100);
  });

  return score;
}
