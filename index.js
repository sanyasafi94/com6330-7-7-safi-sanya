var quizContainer = document.getElementById("quiz");

var questionsArr = [
  {
    question: "What is another name for a cat?",
    answer: "Feline",
    options: ["Monkey", "Cow", "Feline", "Fish"],
  },
  {
    question: "What is the most expressive part of a cat?",
    answer: "Tail",
    options: ["Eyes", "Feet", "Mouth", "Tail"],
  },
  {
    question: "What type food do cats eat?",
    answer: "Meat",
    options: ["Sun", "Meat", "Veggies", "Fruit"],
  },
  {
    question: "Which type of cat is more physically resiliant than others?",
    answer: "Black",
    options: ["Black", "Orange", "Tabby", "Tortise"],
  },
  {
    question: "What is one defining feature of a cat?",
    answer: "Whiskers",
    options: ["Ears", "Tail", "Paws", "Whiskers"],
  },
];

let currentQuestionIndex = 0;
let score = 0;
let timerInterval;
let timeLeft = 30;

function displayQuiz() {
  quizContainer.innerHTML = " ";

  var previousScore = localStorage.getItem("previous-score");

  if (currentQuestionIndex === 0 && timeLeft === 30) {
    var scoreP = document.createElement("p");
    scoreP.className = "previous-score";

    if (previousScore !== null) {
      scoreP.textContent = `Previous Score: ${previousScore}%`;
      quizContainer.appendChild(scoreP);
    }

    var startButton = document.createElement("button");
    startButton.id = "start-quiz";
    startButton.textContent = "Start Quiz!";
    startButton.addEventListener("click", startQuiz);

    quizContainer.appendChild(startButton);
  } else {
    displayQuestion();
  }
}

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  timeLeft = 30;
  displayQuestion();
}

function displayQuestion() {
  quizContainer.innerHTML = "";
  clearInterval(timerInterval);

  if (currentQuestionIndex < questionsArr.length) {
    var currentQuestion = questionsArr[currentQuestionIndex];

    var questionParagraph = document.createElement("p");
    questionParagraph.textContent = currentQuestion.question;
    quizContainer.appendChild(questionParagraph);

    var optionsDiv = document.createElement("div");

    currentQuestion.options.forEach((option) => {
      var optionButton = document.createElement("button");
      optionButton.textContent = option;
      optionButton.addEventListener("click", () => selectAnswer(option));
      optionsDiv.appendChild(optionButton);
    });

    quizContainer.appendChild(optionsDiv);

    var timerParagraph = document.createElement("p");
    timerParagraph.id = "timer";
    timerParagraph.textContent = timeLeft;
    quizContainer.appendChild(timerParagraph);

    startTimer();
  } else {
    endQuiz();
  }
}

function startTimer() {
  clearInterval(timerInterval);
  timeLeft = 30;

  var timerDisplay = document.getElementById("timer");
  if (timerDisplay) {
    timerDisplay.textContent = timeLeft;
  }

  timerInterval = setInterval(() => {
    timeLeft--;
    if (timerDisplay) {
      timerDisplay.textContent = timeLeft;
    }
    if (timeLeft <= 0) {
      selectAnswer(null);
    }
  }, 1000);
}

function selectAnswer(selectedAnswer) {
  clearInterval(timerInterval);

  if (
    selectedAnswer !== null &&
    selectedAnswer === questionsArr[currentQuestionIndex].answer
  ) {
    score++;
  }

  currentQuestionIndex++;

  displayQuestion();
}

function endQuiz() {
  clearInterval(timerInterval);

  var finalPercentage = Math.round((score / questionsArr.length) * 100);

  localStorage.setItem("previous-score", finalPercentage);

  currentQuestionIndex = 0;
  timeLeft = 30;

  displayQuiz();
}

document.addEventListener("DOMContentLoaded", displayQuiz);
