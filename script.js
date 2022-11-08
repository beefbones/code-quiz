// create an array for questions to be used
const questionsArr = [
    {
        question: "Commonly used data types DO NOT include:",
        options: {
            a: "A. strings", 
            b: "B. booleans", 
            c: "C. numbers", 
            d: "D. alerts",
        },
        answer: "d"
    },
    {
        question: "The condition in an if/else statement is enclosed with _____.",
        options: {
            a: "A. quotes", 
            b: "B. curly brackets", 
            c: "C. parenthesis", 
            d: "D. square brackets",
        },
        answer: "c"
    },
    {
        question: "Arrays in JavaScript can be used to store _____.",
        options: {
            a: "A. numbers and strings", 
            b: "B. other arrays", 
            c: "C. booleans", 
            d: "D. all of the above",
        },
        answer: "d"
    },
    {
        question: "String values must be enclosed within _____ when being assigned to variables.",
        options: {
            a: "A. quotes", 
            b: "B. curly brackets", 
            c: "C. parenthesis", 
            d: "D. commas",
        },
        answer: "a"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        options: {
            a: "A. JavaScript", 
            b: "B. terminal/bash", 
            c: "C. for loops", 
            d: "D. console.log",            
        },
        answer: "d"
    }
];

var header = document.querySelector(".header");
var opening = document.querySelector(".opening");
var container = document.querySelector(".container");
var divider = document.querySelector(".divider");
var result = document.querySelector(".result");
var scores = [];
var mark = 0;
var index = 0;
var record = [];
// create a function for the title of the page
function init() {
    // restart
    var removeAll = container;
    while(removeAll.hasChildNodes()) {
        removeAll.removeChild(removeAll.firstChild);
    };

    // create view high scores
    var viewScore = document.createElement("p");
    viewScore.classList.add("banner", "view-score");
    viewScore.textContent = "View High Scores";
    // create time
    var time = document.createElement("p");
    time.classList.add("banner", "time");
    time.textContent = "Time: ";
    var second = document.createElement("span");
    second.setAttribute('id', "second");
    time.appendChild(second);
    // create container title
    var opTitle = document.createElement("h1");
    opTitle.classList.add("title");
    opTitle.textContent = "Coding Quiz Challenge";
    // create container text
    var opText = document.createElement("p");
    opText.classList.add("text");
    opText.textContent = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your time/score by 10!";
    // create container start btn
    var startBtn = document.createElement("button");
    startBtn.classList.add("btn", "btn-start");
    startBtn.textContent = "Start Quiz";

    header.appendChild(viewScore);
    header.appendChild(time);
    container.appendChild(opTitle);
    container.appendChild(opText);
    container.appendChild(startBtn);

    // click to start the timer countdown
    document.querySelector(".btn-start").addEventListener("click", timer);
    // click to view high scores
    document.querySelector(".view-score").addEventListener("click", viewHighScore);
}
// create a function that will add content for the quiz
function createQuiz() {
    
    var removeAll = container;
    while(removeAll.hasChildNodes()) {
        removeAll.removeChild(removeAll.firstChild);
    };
    
    if (index < questionsArr.length) {
        // create quiz container
        var quizHere = document.createElement("div");
        quizHere.classList.add("quiz");
        container.appendChild(quizHere);
        // create question
        var quizTitle = document.createElement("h1");
        quizTitle.classList.add("title");
        quizTitle.textContent = questionsArr[index].question;
        quizHere.appendChild(quizTitle);
        // create options
        var optionsObj = questionsArr[index].options;
        for (var x in optionsObj) {
            var quizOption = document.createElement("button");
            quizOption.classList.add("btn", "btn-answer");
            if (x === questionsArr[index].answer) {
                quizOption.setAttribute("check", "correct");
            }
            quizOption.textContent = optionsObj[x];
            quizHere.appendChild(quizOption);
        }

        index++;

        divider.style.visibility = "visible";

        // click option
        document.querySelector(".quiz").addEventListener("click", checkResult);

    } else {

        // create all down
        var done = document.createElement("h2");
        done.classList.add("title");
        done.textContent = "All done!";
        container.appendChild(done);

        var sum = document.createElement("p");
        sum.classList.add("text");
        sum.textContent = "Your final score is " + mark + " !";
        container.appendChild(sum);

        // form
        var formEl = document.createElement("form");
        formEl.classList.add = ("form");
        container.appendChild(formEl);

        var label = document.createElement("label");
        label.classList.add("text");
        label.setAttribute("for", "name");
        label.textContent = "Enter initials:";
        formEl.appendChild(label);

        var input = document.createElement("input");
        input.classList.add("text");
        input.setAttribute("type", "text");
        input.setAttribute("name", "name");
        input.setAttribute("id", "name");
        input.setAttribute("placeholder", "name");
        formEl.appendChild(input); 

        var submit = document.createElement("button");
        submit.classList.add("btn", "btn-submit");
        submit.textContent = "Submit";
        formEl.appendChild(submit);

        // click submit button
        document.querySelector(".btn-submit").addEventListener("click", recordHighScore);
    }
}
// create a function for the timer
function timer() {

    var timeLeft = 70;

    var timeInterval = setInterval(function() {

        var timeEl = document.querySelector("#second");
        timeEl.textContent = timeLeft + "s";
        timeLeft--;

        if (result.textContent.match(/wrong/gi)) {
            timeLeft -= 10; 
        }

        if (timeLeft < 0 || scores.length === questionsArr.length) {

            clearInterval(timeInterval);

            alert("Quiz is over");
            timeEl.textContent = 0 + "s";

            index += questionsArr.length;

            createQuiz();
        }
    }, 1000);

    createQuiz();
}
// create function to check if users selected answer is correct or not
function checkResult(event) {

    var targetEl = event.target;

    var check = document.createElement("p");
    check.classList.add("check-result");
    if (targetEl.hasAttribute("check")) {
        check.textContent = "Correct!";
        mark += 10;
    } else {
        check.textContent = "Wrong!";
        mark -= 10;
    }
    result.appendChild(check);
    scores.push(mark);

    setTimeout(() => {
        check.remove();
        createQuiz();
    }, 1000);   
}
// create a function to prompt user for highscore data
function recordHighScore(event) {

    event.preventDefault();

    // clear scores array & index
    scores.length = 0;
    index = 0;

    var playerName = document.querySelector("#name").value;

    if (!playerName) {
        alert("please enter a name.");
    } else {
        var recordObj = {
            name: playerName,
            highScore: mark,
        }
    }

    record.push(recordObj);
    saveData();
    // reset mark
    mark = 0;
    viewHighScore();
}
// create a function to clear the page of content and load highscores
function viewHighScore() {
    // clear page content
    header.style.border = "none";
    var removeHeader = header;
    while (removeHeader.hasChildNodes()) {
        removeHeader.removeChild(removeHeader.firstChild);
    }
    var removeContainer = container;
    while (removeContainer.hasChildNodes()) {
        removeContainer.removeChild(removeContainer.firstChild);
    }

    // create high scores board
    var highScoresTitle = document.createElement("h1");
    highScoresTitle.classList.add("title");
    highScoresTitle.textContent = "High Scores";
    container.appendChild(highScoresTitle);

    loadData();

    // create two buttons
    var goBack = document.createElement("button");
    goBack.classList.add("btn", "btn-goBack");
    goBack.textContent = "Go Back";
    container.appendChild(goBack);

    var clear = document.createElement("button");
    clear.classList.add("btn", "btn-clear");
    clear.textContent = "Clear High Scores";
    container.appendChild(clear);

    document.querySelector(".btn-goBack").addEventListener("click", init);
    document.querySelector(".btn-clear").addEventListener("click", clearHistory);
}
// create a function to save highscore data
function saveData() {
    localStorage.setItem("high scores", JSON.stringify(record));
}
// create a function to load the highscores from local storage
function loadData() {

    var load = localStorage.getItem("high scores");

    if (!load) {
        return false;
    }

    load = JSON.parse(load);

    for (var i = 0; i < load.length; i++) {
        var highScorestext = document.createElement("li");
        highScorestext.classList.add("list", "text");
        highScorestext.setAttribute("id", "quiz-mark");
        highScorestext.textContent = load[i].name + " : " + load[i].highScore;
        container.appendChild(highScorestext);
    }
}

function clearHistory() {
    // clear localstorage
    window.localStorage.clear();
    // clear history list under container
    document.querySelectorAll("#quiz-mark").forEach(removeHistory => removeHistory.remove());
}

init();