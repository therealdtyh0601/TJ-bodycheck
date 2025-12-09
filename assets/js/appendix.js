/* ------------------------------------------------------ */
/* appendix.js — Appendices A–D Loader for Tianji App     */
/* ------------------------------------------------------ */
/* This script injects the appendix content into the page */
/* and supports future multi-language expansion.          */
/* ------------------------------------------------------ */


/* ------------------------------------------------------ */
/* 1. APPENDIX CONTENT (SIMPLIFIED LANGUAGE VERSION)       */
/* ------------------------------------------------------ */

const appendixA = `
<p><strong>使用说明与免责声明</strong></p>
<p>本工具依据「天纪」结构，将身心反应区分为五个功能系统：木、火、土、金、水。</p>
<p>本评估仅适用于：</p>
<ul>
  <li>观察自身节律与能量变化</li>
  <li>理解长期疲劳、过度紧绷的来源</li>
  <li>辅助生活方式调整</li>
</ul>
<p><strong>本工具不构成医疗诊断，也不能替代临床评估。</strong></p>
<p>若出现持续、加重或急性不适，请立即寻求医疗协助。</p>
`;


const appendixB = `
<p><strong>天纪关键术语定义</strong></p>
<ul>
  <li><strong>气机（Qi Dynamics）</strong>：指身心能量的流动方式、压力表达方式与节律协调度，不等同中医病理或宗教能量概念。</li>
  <li><strong>太过（Excess）</strong>：系统运行偏上扬、急、躁、紧的状态。</li>
  <li><strong>不及（Deficiency）</strong>：系统能量不足、承载力下降、恢复速度慢。</li>
  <li><strong>顺纪（Aligned Pattern）</strong>：生活、情绪与身体节律协调一致。</li>
  <li><strong>逆纪（Misaligned Pattern）</strong>：节律错配导致的不顺、卡顿、消耗与不适。</li>
</ul>
`;


const appendixC = `
<p><strong>天纪术语 × 民间信仰词对照（避免误解）</strong></p>

<div class="glossary-list">
  <div class="glossary-header">天纪术语</div>
  <div class="glossary-header">民间词汇</div>
  <div class="glossary-header">说明</div>

  <div>肝木</div>
  <div>肝火、脾气大</div>
  <div>天纪所指为疏泄功能，不指器官疾病或情绪暴躁。</div>

  <div>心火</div>
  <div>心虚、火旺</div>
  <div>关注神经亮度与睡眠深度，不涉及病理火热。</div>

  <div>脾土</div>
  <div>胃虚、体弱</div>
  <div>描述能量稳定度与恢复力，不作为消化道诊断。</div>

  <div>肺金</div>
  <div>敏感、鼻不好</div>
  <div>指界限力与外散能力，不等同免疫或呼吸系统疾病。</div>

  <div>肾水</div>
  <div>肾虚</div>
  <div>象征底气与耐力，与器官病变无直接关系。</div>

  <div>顺纪</div>
  <div>好运</div>
  <div>天纪不讲吉凶，只讲节律是否协调。</div>

  <div>逆纪</div>
  <div>犯太岁、运不好</div>
  <div>与占卜无关，表示节律错配。</div>

  <div>气机</div>
  <div>气场、灵气</div>
  <div>天纪为功能动态，与宗教能量不同。</div>
</div>
`;


const appendixD = `
<p><strong>天纪模型与传统五行的差异</strong></p>

<ul>
  <li><strong>非宗教体系</strong>：天纪不依附任何宗教，不涉及修行概念。</li>
  <li><strong>非算命术数</strong>：不预测命运、不看吉凶。</li>
  <li><strong>非器官病理对应</strong>：五行象征功能模式，不对应中医脏腑病变。</li>
  <li><strong>心理 × 生理的节律模型</strong>：更接近身心节律科学（psychophysiology）。</li>
  <li><strong>用途明确且现代</strong>：用于观察压力表达、情绪习性、身体恢复速度与能量消耗。</li>
</ul>
`;


/* ------------------------------------------------------ */
/* 2. LOAD APPENDIX CONTENT INTO DOM                      */
/* ------------------------------------------------------ */

function loadAppendixA() {
  document.getElementById("appendix-a").innerHTML = appendixA;
}

function loadAppendixB() {
  document.getElementById("appendix-b").innerHTML = appendixB;
}

function loadAppendixC() {
  document.getElementById("appendix-c").innerHTML = appendixC;
}

function loadAppendixD() {
  document.getElementById("appendix-d").innerHTML = appendixD;
}
