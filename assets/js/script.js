const questions = [
  {
    title: "Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts",
  },
  {
    title:
      "The condition in an if / else statement is enclosed within ____.",
    choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
    answer: "parentheses",
  },
  {
    title: "Arrays in Javascript can be used to store ____.",
    choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
    answer: "all of the above",
  },
  {
    title:
      "String values must be enclosed within ____ when being assigned to variables.",
    choices: ["commas", "curly brackets", "quotes", "parenthesis"],
    answer: "quotes",
  },
  {
    title:
      "A very useful tool for used during development and debugging for printing content to the debugger is:",
    choices: ["Javascript", "terminal / bash", "for loops", "console log"],
    answer: "console log",
  },
];

// Selecting DOM elements
const startButton = document.querySelector("#startTime");
const questionsDiv = document.querySelector("#questionsDiv");
const currentTime = document.querySelector("#time");
const wrapper = document.querySelector("#wrap");

// Global variables
let secondsLeft = 75;
let currentQuestionIndex = 0;
let score = 0;
let interval;

// Timer function
function startQuiz() {
  interval = setInterval(function () {
    currentTime.textContent = `Time: ${secondsLeft}`;
    secondsLeft--;

    if (secondsLeft === 0) {
      clearInterval(interval);
      allDone();
    }
  }, 1000);

  renderQuestion();
}

// Render question function
function renderQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionsDiv.innerHTML = `
    <h2>${currentQuestion.title}</h2>
    <ul>
      ${currentQuestion.choices
        .map(
          (choice) =>
            `<li class="choice" onclick="checkAnswer(event)">${choice}</li>`
        )
        .join("")}
    </ul>
  `;
}

// Check answer function
function checkAnswer(event) {
  const clickedChoice = event.target.textContent;
  const currentQuestion = questions[currentQuestionIndex];

  if (clickedChoice === currentQuestion.answer) {
    score += 15;
  } else {
    secondsLeft -= 15;
  }

  currentQuestionIndex++;

  if (currentQuestionIndex === questions.length) {
    clearInterval(interval);
    allDone();
  } else {
    renderQuestion();
  }
}

// All done function
function allDone() {
  questionsDiv.innerHTML = `
    <h2>All Done!</h2>
    <p>Your final score is ${score}</p>
    <form>
      <label for="initials">Enter your initials:</label>
      <input type="text" id="initials">
      <button type="submit" id="submit" onclick="saveScore()">Submit</button>
    </form>
  `;
}

// Save score function
function saveScore() {
  const initialsInput = document.querySelector("#initials");
  const initials = initialsInput.value;

  // Saving initials and score to local storage
  const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  highScores.push({ initials, score });
  localStorage.setItem("highScores", JSON.stringify(highScores));

  window.location.href = "highscores.html";
}

startButton.addEventListener("click", startQuiz);