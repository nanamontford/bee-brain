// this is the quiz data

// array
const quizData = [
    {
        question: "1. What is the capital city of Australia?",
        // nested array
        options: ["Sydney", "Canberra", "Melbourne", "Auckland"],
        // correct answers - remember goes 0,1,2,3
        correct: 1,
        explanation: "The capital city of Australia is Canberra."
    },
    {
        question: "2. Which capital city is located the furthest north?",
        options: ["Ottawa", "Stockholm", "Reykjavik", "Berlin"],
        correct: 2,
        explanation: "The worlds most northernly capital city is Reykjavik."
    },
    {
        question: "3. Which country is the smallest in the world?",
        options: ["Spain", "San Marino", "Tuvalu", "Vatican City"],
        correct: 3,
        explanation: "The worlds smallest city is in fact the Vatican City."
    },
    {
        question: "4. How many capital cities does South Africa have?",
        options: ["Three", "None", "One", "Two"],
        correct: 0,
        explanation: "South Africa has 3 capital cities."
    },
    {
        question: "5. In which country would you find Mount Kilimanjaro?",
        options: ["Madagascar", "Italy", "Tanzania", "Egypt"],
        correct: 2,
        explanation: "Mount Kilimanjaro is found in Tanzania."
    }
];


// declare variables here
let currentQuestion = 0;
let totalScore = 0;

// these are where the dom elements are stored 
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const scoreBtn = document.getElementById("scoreBtn");
const nextBtn = document.getElementById("nextBtn");
const resetBtn = document.getElementById("resetBtn");
const scoreOutput = document.getElementById("scoreOutput");
const explanationEl = document.getElementById("explanation");
const congratsMsg = document.getElementById("congratsMsg");
const gkcontainer = document.getElementById("gk");

// functionality 

// here it loads the current question
function loadQuestion() {
    const q = quizData[currentQuestion];
    questionEl.textContent = q.question;
    optionsEl.innerHTML = "";

    q.options.forEach((opt, idx) => {
        const label = document.createElement("label");
        label.className = "option";
        label.innerHTML = `<input type="radio" name="quiz" value="${idx}"> ${opt}`;
        optionsEl.appendChild(label);
    });

    // Reset explanation and buttons
    explanationEl.style.display = "none";
    congratsMsg.style.display = "none";
    scoreBtn.disabled = false;
    scoreBtn.style.display = "inline-block";
    nextBtn.style.display = "none";
}
loadQuestion();


// user's selected answer/ updates score
function checkAnswer() {
    const selected = document.querySelector('input[name="quiz"]:checked');
    if (!selected) return alert("Please select an answer!");

    const selectedIndex = parseInt(selected.value);
    const q = quizData[currentQuestion];
    const options = document.querySelectorAll(".option");

    // Highlight correct and incorrect answers
    options.forEach((opt, idx) => {
        opt.classList.remove("correct", "incorrect");
        if (idx === q.correct) opt.classList.add("correct");
        else if (idx === selectedIndex) opt.classList.add("incorrect");
    });

    // Update score
    const isCorrect = selectedIndex === q.correct;
    if (isCorrect) totalScore++;

    //score and explanation
    scoreOutput.textContent = `Score: ${totalScore}/${quizData.length}`;
    explanationEl.innerHTML = `<strong>Information:</strong> ${q.explanation}`;
    explanationEl.style.display = "block";

    // Disable the scoring again
    scoreBtn.disabled = true;

    // Show "Next" 
    nextBtn.style.display =
        currentQuestion < quizData.length - 1 ? "inline-block" : "none";

    // Show congratulations if all correct
    if (
        currentQuestion === quizData.length - 1 &&
        totalScore === quizData.length
    ) {
        congratsMsg.style.display = "block";
    }
    if (currentQuestion === quizData.length - 1) {
        showFinalResult();
    }
}

// Loads the next question or shows final result
function goToNextQuestion() {
    ++currentQuestion;
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showFinalResult();
    }
}

// Displays final message after completing quiz
function showFinalResult() {
    questionEl.textContent = "You completed the quiz!";
    if (totalScore < quizData.length) {
        optionsEl.innerHTML = ` <p>Try again?</p> `;
    } else {
        optionsEl.innerHTML = ` <p>Well done!</p> `;
    }

    nextBtn.style.display = "none";
    explanationEl.style.display = "none";
    scoreBtn.style.display = "none";

    if (totalScore === quizData.length) {
        congratsMsg.style.display = "block";
    }
}

// Resets the quiz to start over
function resetQuiz() {
    currentQuestion = 0;
    totalScore = 0;
    scoreOutput.textContent = "";
    congratsMsg.style.display = "none";
    loadQuestion();
}

// here are the event listeners
scoreBtn.addEventListener("click", checkAnswer);
nextBtn.addEventListener("click", goToNextQuestion);
resetBtn.addEventListener("click", resetQuiz);