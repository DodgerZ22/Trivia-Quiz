const questions = [
    {
        question: "What is the capital of California?",
        type: 'text',
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

/*function showQuestion(){
    resetState();

    const question = questions[currentQuestionIndex];
    questionElement.innerText = question.question;

    if(question.type === 'text') {
        const answerInput = document.createElement('input');
        answerInput.type = 'text';
        answerInput.classList.add('answer');
        answerContainer.appendChild(answerInput);
    } else {
        question.answers.forEach(answer => {
            const answerButton = document.createElement('button');
            answerButton.innerText = answer.text;
            answerButton.classList.add('answer');
            if(answer.correct){
                answerButton.dataset.correct = answer.correct;
            }
            answerButton.addEventListener('click', selectAnswer);
            answerContainer.appendChild(answerButton);
        });
    }

    nextButton.style.display = 'none';
} */


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

/*function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === 'true';

    if(isCorrect){
        selectedBtn.classList.add('correct');
        score++;
    } else if (questions[currentQuestionIndex].type === 'text') {
        const userAnswer = document.querySelector('.answer').value.trim();
        const correctAnswer = questions[currentQuestionIndex].answer;
        
        if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
            selectedBtn.classList.add('correct');
            score++;
        } else {
            selectedBtn.classList.add('incorrect');
            incorrectAnswers++;
        }
 
     } else {
        selectedBtn.classList.add('incorrect');
        incorrectAnswers++;
    }

    // Rest of the code...
} */


function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

/*function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else{
        showScore();
    }
}*/

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
