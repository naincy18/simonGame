
var buttonColours = ["red", "blue", "green", "yellow"];

// Computer's sequence
var gamePattern = [];

// User's sequence
var userClickedPattern = [];

var level = 0;
var started = false;

// Start the game when any key is pressed
document.addEventListener("keydown", function() {

    if (!started) {
        userClickedPattern = [];
        nextSequence();
        started = true;
    }

});

// Generate the next sequence
function nextSequence() {

    level++;

    document.querySelector("h1").textContent = "Level " + level;

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    playSound(randomChosenColour);
    animatePress(randomChosenColour);
}

// Play sound
function playSound(name) {

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// Animate button press
function animatePress(currentColour) {

    var button = document.getElementById(currentColour);

    button.classList.add("pressed");

    setTimeout(function() {
        button.classList.remove("pressed");
    }, 100);
}

// Check the user's answer
function checkAnswer(currentLevel) {

    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

        console.log("success");

        // User completed the entire sequence
        if (userClickedPattern.length === gamePattern.length) {

            setTimeout(function() {
                nextSequence();
                userClickedPattern = [];
            }, 1000);

        }

    } else {

        console.log("wrong");

        // Play wrong sound
        playSound("wrong");

        // Flash the background
        document.body.classList.add("game-over");

        setTimeout(function() {
            document.body.classList.remove("game-over");
        }, 200);

        // Display game-over message
        document.querySelector("h1").textContent =
            "Game Over, Press Any Key to Restart";

        // Reset the game
        startOver();
    }
}

// Reset game variables
function startOver() {

    level = 0;
    gamePattern = [];
    started = false;
}

// Handle button clicks
var buttons = document.querySelectorAll(".btn");

buttons.forEach(function(button) {

    button.addEventListener("click", function() {

        // Ignore clicks before starting the game
        if (!started) {
            return;
        }

        var userChosenColour = this.id;

        userClickedPattern.push(userChosenColour);

        console.log(userClickedPattern);

        playSound(userChosenColour);
        animatePress(userChosenColour);

        checkAnswer(userClickedPattern.length - 1);

    });

});

