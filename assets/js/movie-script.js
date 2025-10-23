const quizData = [
    {
        question: "What is the most streamed film on Netflix?",
        options: [
            "K-Pop Demon Hunters",
            "The Godfather",
            "Bird Box",
            "Glass Onion",
        ],
        correct: 1,
    },
    {
        question: "Which is the highest grossing film of all time?",
        options: [
            "Avengers Infinity War",
            "Avatar",
            "Barbie",
            "Star Wars: Episode I – The Phantom Menace",
        ],
        correct: 2,
    },
    {
        question: "When did David Attenborough start presenting?",
        options: ["1946", "1954", "1967", "1973"],
        correct: 2,
    },
    {
        question: "Who directed The Grand Budapest Hotel?",
        options: [
            "Wesley snipes",
            "Wes Sanderson",
            "Wendy Anderson",
            "Wes Anderson",
        ],
        correct: 4,
    },
    {
        question: "Where was Jaws primarily filmed?",
        options: [
            "Martha's Vineyard, Massachusetts",
            "Bondi Beach, Australia",
            "Miami Beach, Florida",
            "Myrtle beach, South Carolina",
        ],
        correct: 1,
    },
];

// troubleshoot here:

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("movie-question");
const optionsEl = document.getElementById("movie-options");
const nextBtn = document.getElementById("movie-nextBtn");
const reset = document.getElementById("movie-resetBtn");
const quizContainer = document.getElementById("movie-quiz-container");

function loadQuestion() {
    const question = quizData[currentQuestion];
    questionEl.textContent = question.question;
    optionsEl.innerHTML = "";
    question.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("option");
        button.addEventListener("click", () => selectOption(button, index));
        optionsEl.appendChild(button);
    });
    nextBtn.style.display = "none";
    updateProgress();
}
