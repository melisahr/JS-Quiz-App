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

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
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
    const progressBar = document.getElementById("progress-bar");
    progressBar.style.width = progressPercentage + "%";
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
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === 'true';
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    //Disable to select only one answer & enable the nextBtn
    Array.from(answerBtns.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextBtn.style.display ="block";
}
function showScore(){
    resetState();
    questionElement.innerHTML =`You scored ${score} out of ${questions.length}!`;
    nextBtn.innerHTML = "Play Again";
    nextBtn.style.display = "block";
}
function handleNextBtn(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
//bar is updated after moving to the next question
    const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;
    const progressBar = document.getElementById("progress-bar");
    progressBar.style.width = progressPercentage + "%";
}

nextBtn.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextBtn();
    }else{
        startQuiz();
    }
})
startQuiz();