let allQuestions = [];
let quiz = [];
let index = 0;
let score = 0;

let stats = JSON.parse(localStorage.getItem("stats")) || {
  tests: 0,
  total: 0,
  best: 0
};

fetch("questions.json")
  .then(res => res.json())
  .then(data => {
    allQuestions = data;
    loadFilters();
    updateDashboard();
  });

function loadFilters() {
  fill("classSelect", [...new Set(allQuestions.map(q => q.class))]);
  fill("subjectSelect", [...new Set(allQuestions.map(q => q.subject))]);
  fill("chapterSelect", [...new Set(allQuestions.map(q => q.chapter))]);
}

function fill(id, arr) {
  let s = document.getElementById(id);
  s.innerHTML = arr.map(v => `<option>${v}</option>`).join("");
}

function startQuiz() {
  let c = classSelect.value;
  let s = subjectSelect.value;
  let ch = chapterSelect.value;

  quiz = allQuestions.filter(q =>
    q.class === c && q.subject === s && q.chapter === ch
  );

  index = 0;
  score = 0;
  showQ();
}

function showQ() {
  if (index >= quiz.length) return finish();

  let q = quiz[index];
  quizDiv.innerHTML = `
    <h3>${q.question}</h3>
    ${q.options.map((o,i)=>`
      <label class="option">
        <input type="radio" name="opt" onclick="check(${i})"> ${o}
      </label>`).join("")}
  `;
}

function check(i) {
  if (i === quiz[index].answer) score++;
  index++;
  showQ();
}

function finish() {
  let percent = Math.round((score / quiz.length) * 100);

  stats.tests++;
  stats.total += percent;
  if (percent > stats.best) stats.best = percent;

  localStorage.setItem("stats", JSON.stringify(stats));
  updateDashboard();

  quizDiv.innerHTML = "";
  result.innerHTML = `<h3>Score: ${percent}%</h3>`;
}

function updateDashboard() {
  tests.innerText = stats.tests;
  avg.innerText = stats.tests ? Math.round(stats.total / stats.tests) : 0;
  best.innerText = stats.best;
}
