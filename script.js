const questions = [
    {
        question: "What is the capital of California?",
        answers: [
            {text: "Eureka", correct: false},
            {text: `Sacramento`, correct: true},
            {text: "Los Angeles", correct: false},
            {text: "San Francisco", correct: false},
        ]
    },
    {
        question: "What is the state bird of California?",
        answers: [
            {text: "California Quail", correct: true},
            {text: "Hummingbird", correct: false},
            {text: "Los Angeles", correct: false},
            {text: "San Francisco", correct: false},
        ]
    },
    {
        question: "What is the population of California?",
        answers: [
            {text: "38.04 million", correct: false},
            {text: "35.61 million", correct: false},
            {text: "8.77 million", correct: false},
            {text: "39.37 million", correct: true},
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
    });
}

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
        showScore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else {
        startQuiz();
    }
})

if(incorrectAnswers >= 3){
    SVGFEComponentTransferElement.innerText
}

startQuiz();
