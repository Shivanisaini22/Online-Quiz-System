// ========================================
// ONLINE QUIZ SYSTEM
// ========================================


// ========================================
// QUESTIONS
// ========================================

let questions = [

    {
        question: "What is the full form of HTML?",

        options: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyperlink Text Markup Language",
            "Home Tool Markup Language"
        ],

        answer: "Hyper Text Markup Language"
    },


    {
        question: "Which language is used for styling web pages?",

        options: [
            "HTML",
            "CSS",
            "Java",
            "Python"
        ],

        answer: "CSS"
    },


    {
        question: "Which language is used to make a web page interactive?",

        options: [
            "HTML",
            "CSS",
            "JavaScript",
            "SQL"
        ],

        answer: "JavaScript"
    },


    {
        question: "Which tag is used to create a heading in HTML?",

        options: [
            "p tag",
            "h1 tag",
            "br tag",
            "img tag"
        ],

        answer: "h1 tag"
    },


    {
        question: "Which symbol is used for comments in JavaScript?",

        options: [
            "//",
            "#",
            "HTML comment",
            "**"
        ],

        answer: "//"
    },


    {
        question: "Which property is used to change text color in CSS?",

        options: [
            "font-color",
            "text-color",
            "color",
            "background-color"
        ],

        answer: "color"
    },


    {
        question: "Which HTML element is used to create a hyperlink?",

        options: [
            "link tag",
            "a tag",
            "href tag",
            "url tag"
        ],

        answer: "a tag"
    },


    {
        question: "Which keyword can be used to declare a variable in JavaScript?",

        options: [
            "var",
            "int",
            "string",
            "define"
        ],

        answer: "var"
    },


    {
        question: "Which CSS property changes the background color?",

        options: [
            "color",
            "background-color",
            "bg-color",
            "background-image"
        ],

        answer: "background-color"
    },


    {
        question: "Which method displays a message in JavaScript?",

        options: [
            "print()",
            "display()",
            "alert()",
            "message()"
        ],

        answer: "alert()"
    }

];


// ========================================
// VARIABLES
// ========================================

let currentQuestion = 0;

let score = 0;

let studentName = "";


// ========================================
// TOTAL QUIZ TIMER
// 120 SECONDS = 2 MINUTES
// ========================================

let timeLeft = 120;

let timer;


// ========================================
// STORE USER ANSWERS
// ========================================

let userAnswers = [];


// ========================================
// START QUIZ
// ========================================

function startQuiz() {

    studentName =
        document.getElementById("studentName")
        .value
        .trim();


    // Check name

    if (studentName === "") {

        alert("Please enter your name!");

        return;
    }


    // Reset values

    currentQuestion = 0;

    score = 0;

    timeLeft = 120;

    userAnswers = [];


    // Hide start screen

    document.getElementById("start-screen")
        .style.display = "none";


    // Show quiz screen

    document.getElementById("quiz-screen")
        .style.display = "block";


    // Welcome message

    document.getElementById("welcomeMessage")
        .innerText =
        "Welcome, " + studentName + "!";


    // Start ONE timer

    startTimer();


    // Show first question

    showQuestion();
}


// ========================================
// SHOW QUESTION
// ========================================

function showQuestion() {

    let questionData =
        questions[currentQuestion];


    // Question number

    document.getElementById("questionNumber")
        .innerText =
        "Question " +
        (currentQuestion + 1) +
        " of " +
        questions.length;


    // Question text

    document.getElementById("question")
        .innerText =
        questionData.question;


    // ====================================
    // SHOW OPTIONS
    // ====================================

    let optionsHTML = "";


    questionData.options.forEach(
        function(option) {

            let checked = "";


            // Restore previous answer

            if (
                userAnswers[currentQuestion]
                === option
            ) {

                checked = "checked";
            }


            optionsHTML += `

                <label class="option">

                    <input
                        type="radio"
                        name="quizAnswer"
                        value="${option}"
                        ${checked}
                        onchange="selectAnswer(this)"
                    >

                    ${option}

                </label>

            `;
        }
    );


    document.getElementById("options")
        .innerHTML =
        optionsHTML;


    // ====================================
    // PREVIOUS BUTTON
    // ====================================

    let prevBtn =
        document.getElementById("prevBtn");


    if (currentQuestion === 0) {

        // Question 1:
        // Hide Previous button

        prevBtn.style.display = "none";

    } else {

        // Question 2 onwards:
        // Show Previous button

        prevBtn.style.display =
            "inline-block";
    }


    // ====================================
    // NEXT BUTTON
    // ====================================

    let nextBtn =
        document.getElementById("nextBtn");


    if (
        currentQuestion ===
        questions.length - 1
    ) {

        // Question 10

        nextBtn.innerText =
            "Finish Quiz";

    } else {

        // Question 1 to 9

        nextBtn.innerText =
            "Next Question →";
    }


    // ====================================
    // RESTORE ANSWER COLOR
    // ====================================

    if (userAnswers[currentQuestion]) {

        let selectedInput =
            document.querySelector(
                'input[name="quizAnswer"]:checked'
            );


        if (selectedInput) {

            if (
                selectedInput.value ===
                questionData.answer
            ) {

                selectedInput.parentElement
                    .classList.add("correct");

            } else {

                selectedInput.parentElement
                    .classList.add("wrong");
            }
        }
    }
}


// ========================================
// SELECT ANSWER
// ========================================

function selectAnswer(selectedOption) {

    let selectedAnswer =
        selectedOption.value;


    // Save answer

    userAnswers[currentQuestion] =
        selectedAnswer;


    // Get all options

    let allOptions =
        document.querySelectorAll(".option");


    // Remove old colors

    allOptions.forEach(
        function(option) {

            option.classList.remove("correct");

            option.classList.remove("wrong");
        }
    );


    // Correct answer

    let correctAnswer =
        questions[currentQuestion].answer;


    // Check answer

    if (
        selectedAnswer === correctAnswer
    ) {

        // Correct = Green

        selectedOption.parentElement
            .classList.add("correct");

    } else {

        // Wrong = Red

        selectedOption.parentElement
            .classList.add("wrong");
    }
}


// ========================================
// NEXT QUESTION
// ========================================

function nextQuestion() {

    // Save current answer

    saveCurrentAnswer();


    // If not last question

    if (
        currentQuestion <
        questions.length - 1
    ) {

        currentQuestion++;

        showQuestion();

    } else {

        // Last question

        calculateScore();

        showResult();
    }
}


// ========================================
// PREVIOUS QUESTION
// ========================================

function previousQuestion() {

    // Save current answer

    saveCurrentAnswer();


    // Go back

    if (currentQuestion > 0) {

        currentQuestion--;

        showQuestion();
    }
}


// ========================================
// SAVE CURRENT ANSWER
// ========================================

function saveCurrentAnswer() {

    let selectedOption =
        document.querySelector(
            'input[name="quizAnswer"]:checked'
        );


    if (selectedOption) {

        userAnswers[currentQuestion] =
            selectedOption.value;
    }
}


// ========================================
// CALCULATE SCORE
// ========================================

function calculateScore() {

    score = 0;


    questions.forEach(
        function(question, index) {

            if (
                userAnswers[index] ===
                question.answer
            ) {

                score++;
            }
        }
    );
}


// ========================================
// START TIMER
// ========================================

function startTimer() {

    // Clear old timer

    clearInterval(timer);


    // Show initial time

    updateTimer();


    // Start timer

    timer = setInterval(
        function() {

            timeLeft--;


            // Update timer display

            updateTimer();


            // Time finished

            if (timeLeft <= 0) {

                clearInterval(timer);


                // Save current answer

                saveCurrentAnswer();


                // Calculate score

                calculateScore();


                alert("Time is over!");


                // Show result

                showResult();
            }

        },
        1000
    );
}


// ========================================
// UPDATE TIMER
// ========================================

function updateTimer() {

    let timerElement =
        document.getElementById("timer");


    if (timerElement) {

        // Minutes

        let minutes =
            Math.floor(timeLeft / 60);


        // Seconds

        let seconds =
            timeLeft % 60;


        // Add 0 before single digit

        seconds =
            seconds < 10
                ? "0" + seconds
                : seconds;


        // Display timer

        timerElement.innerText =
            "⏱️ Time: " +
            minutes +
            ":" +
            seconds;


        // Red when 30 seconds remain

        if (timeLeft <= 30) {

            timerElement.style.color =
                "red";

        } else {

            timerElement.style.color =
                "#856404";
        }
    }
}


// ========================================
// SHOW RESULT
// ========================================

function showResult() {

    // Stop timer

    clearInterval(timer);


    // Save current answer

    saveCurrentAnswer();


    // Calculate final score

    calculateScore();


    // Hide quiz

    document.getElementById("quiz-screen")
        .style.display = "none";


    // Show result

    document.getElementById("result-screen")
        .style.display = "block";


    // ====================================
    // PERCENTAGE
    // ====================================

    let percentage =
        (score / questions.length) * 100;


    // ====================================
    // WRONG ANSWERS
    // ====================================

    let wrongAnswers =
        questions.length - score;


    // ====================================
    // PASS / FAIL
    // ====================================

    let status;


    if (percentage >= 40) {

        status = "PASS ✅";

    } else {

        status = "FAIL ❌";
    }


    // ====================================
    // STUDENT NAME
    // ====================================

    document.getElementById(
        "resultStudentName"
    ).innerText =
        "Student: " + studentName;


    // ====================================
    // FINAL SCORE
    // ====================================

    document.getElementById(
        "finalScore"
    ).innerText =
        score +
        " / " +
        questions.length;


    // ====================================
    // PERCENTAGE
    // ====================================

    document.getElementById(
        "finalPercentage"
    ).innerText =
        "Percentage: " +
        percentage +
        "%";


    // ====================================
    // CORRECT ANSWERS
    // ====================================

    document.getElementById(
        "correctAnswers"
    ).innerText =
        "Correct Answers: " +
        score;


    // ====================================
    // WRONG ANSWERS
    // ====================================

    document.getElementById(
        "wrongAnswers"
    ).innerText =
        "Wrong Answers: " +
        wrongAnswers;


    // ====================================
    // STATUS
    // ====================================

    document.getElementById(
        "finalStatus"
    ).innerText =
        "Result: " +
        status;
}