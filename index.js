const questions = [
    {
        question:"What is largest animal in the world?",
        answers:[
            {text: "Shark", correct: false},
            {text: "Blue whale", correct: true},
            {text: "Elephant", correct: false},
            {text: "Giraffe", correct: false},
        ]
    },
    {
        question:"Which is the smallest country in the world?",
        answers:[
            {text: "Vatican City", correct: true},
            {text: "Bhutan", correct: false},
            {text: "Nepal", correct: false},
            {text: "Shri Lanka", correct: false},
        ]
    },
    {
        question:"What is largest desert in the world?",
        answers:[
            {text: "Kalahari", correct: false},
            {text: "Gobi", correct: false},
            {text: "Antarctica", correct: false},
            {text: "Sahara", correct: true},
        ]
    },
    {
        question:"Which is the smallest continent in the world?",
        answers:[
            {text: "Asia", correct: false},
            {text: "Australia", correct: true},
            {text: "Arctic", correct: false},
            {text: "Africa", correct: false},
        ]
    }
];
const questionElement = document.getElementById("question");
const answerBtns = document.getElementById("answer-btns");
const nextBtn = document.getElementById("next-btn");
const timerSeconds = document.getElementById("seconds");

let currentQuestionIndex = 0;
let score = 0;
let countdownTime = 15;

let timerInterval;

//Timer
function startTimer(){
    updateTimer();
    timerInterval = setInterval(function(){
        countdownTime--;
        updateTimer();
        if(countdownTime === 0){
            clearInterval(timerInterval);
            selectAnswer();
            handleNextBtn();
        }
    },1000)
}
function resetTimer(){
    clearInterval(timerInterval);
    countdownTime = 15;
    startTimer();
    timerSeconds.style.display = "block";
}
function updateTimer(){
    timerSeconds.textContent = countdownTime +'s';
}

//Quiz Starts
function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    resetTimer();
    clearInterval(timerInterval);
    startTimer();
    showQuestion();
}
//Display question with question number
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." +
    currentQuestion.question;

//answers
    currentQuestion.answers.forEach(answer => {
        const button =  document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerBtns.appendChild(button);
        //select correct answer
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });

    //Bar fill is updated
    const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;
    const barFill = document.getElementById("bar-fill");
    barFill.style.width = progressPercentage + "%";
}
//Keep the text answers 
function resetState(){
    nextBtn.style.display = "none";
    while(answerBtns.firstChild){
        answerBtns.removeChild(answerBtns.firstChild);
    }
}
//Correct/inncorrect answers
function selectAnswer(e){
    /*const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === 'true';*/
    Array.from(answerBtns.children).forEach(button => {
        button.disabled = true;
    });
    if(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === 'true';
    //Keep record of the score
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
}else{
    Array.from(answerBtns.children).forEach(button => {
         if(button.dataset.correct === "true"){
             button.classList.add("correct");
         }
            
     });
}
button.disabled = true;
nextBtn.style.display = "block";
    // Clear the timer 
    clearInterval(timerInterval);
}

function showScore(){
    resetState();
    questionElement.innerHTML =`You scored ${score} out of ${questions.length}!`;
    nextBtn.innerHTML = "Play Again";
    nextBtn.style.display = "block";
    timerSeconds.style.display = "none";
}
function handleNextBtn(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        //timer resets on the next question
        resetTimer();
        showQuestion();
    }else{
        showScore();   
    }
}

nextBtn.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextBtn();
    }else{
        startQuiz();
    }
})
startQuiz();