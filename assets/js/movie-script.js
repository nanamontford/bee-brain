const quizData = [
    {
        question: "What is the most streamed film on Netflix?",
        options: [
            "K-Pop Demon Hunters",
            "The Godfather",
            "Bird Box",
            "Glass Onion",
        ],
        correct: 0,
        explanation:
            "K-Pop Demon Hunters is the most streamed film on netflix with over 236 million streams!",
    },
    {
        question: "Which is the highest grossing film of all time?",
        options: [
            "Avengers Infinity War",
            "Avatar",
            "Barbie",
            "Star Wars: Episode I – The Phantom Menace",
        ],
        correct: 1,
        explanation:
            "Avatar is the highest grossing film of all time with a worldwide gross of $2,923,710,708",
    },
    {
        question: "When did David Attenborough start presenting?",
        options: ["1946", "1954", "1967", "1973"],
        correct: 1,
        explanation: "David Attenborough started presenting in 1954",
    },
    {
        question: "Who directed The Grand Budapest Hotel?",
        options: [
            "Wesley snipes",
            "Wes Sanderson",
            "Wendy Anderson",
            "Wes Anderson",
        ],
        correct: 3,
        explanation: "The Grand Budapest Hotel is Wes Anderson's 8th film",
    },
    {
        question: "Where was Jaws primarily filmed?",
        options: [
            "Martha's Vineyard, Massachusetts",
            "Bondi Beach, Australia",
            "Miami Beach, Florida",
            "Myrtle beach, South Carolina",
        ],
        correct: 0,
        explanation:
            "Surprisingly true! Jaws was primarily filmed at Martha's Vineyard in Massachusetts",
    },
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("movie-question");
const optionsEl = document.getElementById("movie-options");
const scoreBtn = document.getElementById("movie-submitBtn");
const nextBtn = document.getElementById("movie-nextBtn");
const reset = document.getElementById("movie-resetBtn");
const scoreOutput = document.getElementById("scoreOutput");
const explanationEl = document.getElementById("movie-explanation");
const congratsMessage = document.getElementById("movie-congratsMsg");
const quizContainer = document.getElementById("movie-quiz-container");

function loadQuestion() {
    const question = quizData[currentQuestion];
    questionEl.textContent = question.question;
    optionsEl.innerHTML = "";

    question.options.forEach((option, index) => {
        const label = document.createElement("label");
        label.className = "movie-option";
        label.innerHTML = `<input type="radio" name="quiz" value="${index}"> ${option}`;
        optionsEl.appendChild(label);
    });

    explanationEl.style.display = "none";
    congratsMessage.style.display = "none";
    scoreBtn.disabled = false;
    scoreBtn.style.display = "inline-block";
    nextBtn.style.display = "none";
    //updateProgress();
}

function checkAnswer() {
    const selected = document.querySelector('input[name="quiz"]:checked');
    if (!selected) return alert("Please select an answer!");

    const selectedIndex = parseInt(selected.value);
    const q = quizData[currentQuestion];
    const options = document.querySelectorAll(".movie-option");

    // Highlight correct and incorrect answers
    options.forEach((opt, idx) => {
        opt.classList.remove("correct", "incorrect");
        if (idx === q.correct) opt.classList.add("correct");
        else if (idx === selectedIndex) opt.classList.add("incorrect");
    });

    // Update score if correct
    const isCorrect = selectedIndex === q.correct;
    if (isCorrect) score++;

    // Show score and explanation
    scoreOutput.textContent = `Score: ${score}/${quizData.length}`;
    explanationEl.innerHTML = `<strong>Explanation:</strong> ${q.explanation}`;
    explanationEl.style.display = "block";

    // Disable scoring again
    scoreBtn.disabled = true;

    console.log(nextBtn);
    // Show "Next" if not last question
    nextBtn.style.display =
        currentQuestion < quizData.length - 1 ? "inline-block" : "none";

    // Show congrats if all correct
    if (currentQuestion === quizData.length - 1 && score === quizData.length) {
        congratsMessage.style.display = "block";
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
    if (score < quizData.length) {
        optionsEl.innerHTML = ` <p>Better luck next time!</p> `;
    } else {
        optionsEl.innerHTML = ` <p>Great job!</p> `;
    }

    nextBtn.style.display = "none";
    explanationEl.style.display = "none";
    scoreBtn.style.display = "none";

    if (score === quizData.length) {
        congratsMessage.style.display = "block";
    }
}

// Resets the quiz to start over
function resetQuiz() {
    currentQuestion = 0;
    score = 0;
    scoreOutput.textContent = "";
    congratsMessage.style.display = "none";
    loadQuestion();
}

// --- EVENT LISTENERS ---
scoreBtn.addEventListener("click", checkAnswer);
nextBtn.addEventListener("click", goToNextQuestion);
reset.addEventListener("click", resetQuiz);

loadQuestion();
