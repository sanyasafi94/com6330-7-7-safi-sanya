var quizContain = document.getElementById("quiz");

var questionArr = [
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
    options: ["Black", "Orange", "Veggies", "Fruit"],
  },
  {
    question: "What is one defining feature of a cat?",
    answer: "Whiskers",
    options: ["Ears", "Tail", "Paws", "Whiskers"],
  },
];

let currentQuestionI = 0;
let points = 0;
let timerInterval;
let timeLeft = 30;

function displayQuiz() {
  quizContain.innerHTML = " ";

  var previousScore = localStorage.getItem("previous-score");

  if (currentQuestionI === 0 && timeLeft === 30) {
    var scoreP = document.createElement("p");
    scoreP.className = "previous-score";

    if (previousScore !== null) {
      scoreP.textContent = "Previous Score: ${previousScore}%";
      quizContain.appendChild(scoreP);
    }

    var startButton = document.createElement("button");
    startButton.id = "start-quiz";
    startButton.textContent = "Start Quiz!";
    startButton.addEventListener("click", startQuiz);

    quizContain.appendChild(startButton);
  } else {
    displayQuestion();
  }
}
