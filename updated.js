const questions = [
    {
        question: "What is the capital of California?",
        type: 'multiple choice',
        answers: [
            {text: "Eureka", correct: false},
            {text: `Sacramento`, correct: true},
            {text: "Los Angeles", correct: false},
            {text: "San Francisco", correct: false},
        ]
    },
    {
        question: "What is the state bird of California?",
        type: 'multiple choice',
        answers: [
            {text: "California Quail", correct: true},
            {text: "Hummingbird", correct: false},
            {text: "Lark", correct: false},
            {text: "Cardinal", correct: false},
        ]
    },
    {
        question: "What is the population of California?",
        type: 'multiple choice',
        answers: [
            {text: "38.04 million", correct: false},
            {text: "35.61 million", correct: false},
            {text: "8.77 million", correct: false},
            {text: "39.37 million", correct: true},
        ]
    },
    {
        question: "Who played the Joker in 'The Dark Knight'?",
        type: 'multiple choice',
        answers: [
            {text: "Joaquin Phoenix", correct: false},
            {text: "Jack Nicholson", correct: false},
            {text: "Heath Ledger", correct: true},
            {text: "Barry Keoghan", correct: false},
        ]
    },
    {
        question: "What year did Spider-Man make his comic debut?",
        type: 'multiple choice',
        answers: [
            {text: "1962", correct: true},
            {text: "1973", correct: false},
            {text: "1966", correct: false},
            {text: "1970", correct: false},
        ]
    },
    {
        question: "Who was the first pilot to fly across the Atlantic non-stop?",
        type: 'multiple choice',
        answers: [
            {text: "Amelia Earhart", correct: false},
            {text: "The Wright Brothers", correct: false},
            {text: "Charles Lindburgh", correct: true},
            {text: "Maverick", correct: false},
        ]
    },
    {
        question: "Which NFL Quarterback has the most Super Bowl Victories?",
        type: 'multiple choice',
        answers: [
            {text: "Tom Brady", correct: true},
            {text: "Joe Montana", correct: false},
            {text: "Terry Bradshaw", correct: false},
            {text: "Patrick Mahomes", correct: false},
        ]
    },
    {
        question: "Which MLB team has won the most World Series Championships?",
        type: 'multiple choice',
        answers: [
            {text: "The Dodgers", correct: false},
            {text: "The Cardinals", correct: false},
            {text: "The Yankees", correct: true},
            {text: "The Giants", correct: false},
        ]
    },
    {
        question: "How many points are scored for a perfect game in bowling?",
        type: 'multiple choice',
        answers: [
            {text: "500", correct: false},
            {text: "350", correct: false},
            {text: "270", correct: false},
            {text: "300", correct: true},
        ]
    },
    {
        question: "What does ES6 stand for?",
        type: 'multiple choice',
        answers: [
            {text: "Enlightenment Script 6", correct: false},
            {text: "ECMAScript6", correct: true},
            {text: "It has no meaning", correct: false},
            {text: "Encryption Script 6", correct: false},
        ]
    },

];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;
let incorrectAnswers = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

 function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === `true`;
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
        incorrectAnswers++;
    }
    Array.from(answerButtons.children).forEach(button=>{
        if(button.dataset.correct ===  `true`){
            button.classList.add("correct");
        }
        button.disabled = true;
    })
    nextButton.style.display = "block";
} 

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
} 


function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else{
        if(incorrectAnswers >= 3) {
            showGameOver();  // Function to show game over message
        } else {
            showScore();
        }
    }
}

function showGameOver(){
    resetState();
    questionElement.innerHTML = 'Game Over! You scored too many questions incorrectly.'
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
    incorrectAnswers = 0;
}
   
nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else {
        startQuiz();
    }
})

startQuiz();
