// --- QUIZ DATA ---
const quizData = [
    {
        question: "1. What is the color of the sky on a clear day?",
        options: ["Blue", "Green", "Red", "Yellow"],
        correct: 0,
        explanation:
            "The sky appears blue during the day due to the scattering of sunlight by the atmosphere.",
    },
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        correct: 2,
        explanation: "Paris is the capital city of France.",
    },
    {
        question: "Which gas do plants absorb from the atmosphere?",
        options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
        correct: 2,
        explanation:
            "Plants absorb carbon dioxide during photosynthesis to make food.",
    },

    {
        question: "Which is the largest ocean on Earth?",
        options: [
            "Atlantic Ocean",
            "Indian Ocean",
            "Arctic Ocean",
            "Pacific Ocean",
        ],
        correct: 3,
        explanation:
            "The Pacific Ocean is the largest and deepest ocean on Earth.",
    },
    {
        question: "Who wrote the play “Romeo and Juliet”?",
        options: [
            "Charles Dickens",
            "William Shakespeare",
            "Leo Tolstoy",
            "Jane Austen",
        ],
        correct: 1,
        explanation:
            "William Shakespeare wrote the tragic play “Romeo and Juliet”.",
    },
];

// --- VARIABLES ---
let currentQuestion = 0;
let totalScore = 0;

// --- DOM ELEMENTS ---
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const scoreBtn = document.getElementById("scoreBtn");
const nextBtn = document.getElementById("nextBtn");
const resetBtn = document.getElementById("resetBtn");
const scoreOutput = document.getElementById("scoreOutput");
const explanationEl = document.getElementById("explanation");
const congratsMsg = document.getElementById("congratsMsg");
const gkcontainer = document.getElementById("gk");

// --- FUNCTIONS ---

// Loads the current question and options
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

// Checks the user's selected answer and updates score
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

    // Update score if correct
    const isCorrect = selectedIndex === q.correct;
    if (isCorrect) totalScore++;

    // Show score and explanation
    scoreOutput.textContent = `Score: ${totalScore}/${quizData.length}`;
    explanationEl.innerHTML = `<strong>Explanation:</strong> ${q.explanation}`;
    explanationEl.style.display = "block";

    // Disable scoring again
    scoreBtn.disabled = true;

    // Show "Next" if not last question
    nextBtn.style.display =
        currentQuestion < quizData.length - 1 ? "inline-block" : "none";

    // Show congrats if all correct
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
    questionEl.textContent = "Quiz Completed!";
    if (totalScore < quizData.length) {
        optionsEl.innerHTML = ` <p>Better luck next time!</p> `;
    } else {
        optionsEl.innerHTML = ` <p>Great job!</p> `;
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

// --- EVENT LISTENERS ---
scoreBtn.addEventListener("click", checkAnswer);
nextBtn.addEventListener("click", goToNextQuestion);
resetBtn.addEventListener("click", resetQuiz);

// --- INITIAL CALL ---
loadQuestion();
