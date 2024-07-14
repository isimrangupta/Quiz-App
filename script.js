const questions = [
    {
        question: "Which is a larget animal in the world ?",
        answers: [
            { text: "Sark", correct: false },
            { text: "Blue Whale", correct: true },
            { text: "Elephant", correct: false },
            { text: "Giraffe", correct: false },
        ]
    },

    {
        question: "Which one is not a sense organ?",
        answers: [
            { text: "Ears", correct: false },
            { text: "Tongue", correct: false },
            { text: "Nose", correct: false },
            { text: "Hair", correct: true },
        ]
    },

    {
        question: "How many bones do we have?",
        answers: [
            { text: "206", correct: true },
            { text: "100", correct: false },
            { text: "200", correct: false },
            { text: "300", correct: false },
        ]
    },

    {
        question: "Find the odd one out.",
        answers: [
            { text: "Hair", correct: false },
            { text: "Dare", correct: true },
            { text: "Pair", correct: false },
            { text: "Chair", correct: false },
        ]
    },
];


const questionElement = document.querySelector('#question');
const answerButtons = document.querySelector('.answer_Btn')

const nextBtn = document.querySelector('#next-btn');

let currentQuestionIdx = 0;
let score = 0;


function startQuiz() {
    currentQuestionIdx = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIdx];
    let questionNumber = currentQuestionIdx + 1;
    questionElement.innerHTML = `${questionNumber}. ${currentQuestion.question}`

    currentQuestion.answers.forEach(ans => {
        const button = document.createElement("button");
        button.innerHTML = ans.text;
        button.classList.add('btn');
        answerButtons.appendChild(button);

        if(ans.correct){
            button.dataset.correct = ans.correct;
        }
        button.addEventListener("click", selectAnswer);
    })
};

function resetState(){
    nextBtn.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }
};


function selectAnswer(e){
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";

    if(isCorrect){
        selectBtn.classList.add("correct");
        score++;
    } else{
        selectBtn.classList.add('incorrect')
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = "true"
    });
    nextBtn.style.display = "block";
};


function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextBtn.innerHTML = "Play Again";
    nextBtn.style.display = "block";
}



function handleNextButton(){
    currentQuestionIdx++;
    if(currentQuestionIdx < questions.length){
        showQuestion();
    } else{
        showScore();
    }
};


nextBtn.addEventListener('click', function(){
    if(currentQuestionIdx < questions.length){
        handleNextButton();

    } else{
        startQuiz();
    }
});

            


startQuiz()


