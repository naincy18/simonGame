// We have multiple related values, and we want to treat them as one collection."
var buttonColours=["red","blue","green","yellow"];


// gamePattern gradually stores the Simon sequence.
var gamePattern = [];

// record what the user clicks.
var userClickedPattern = [];
var level = 0;

document.addEventListener("keydown", function() {

    if (level === 0) {
        nextSequence();
    }

});

function nextSequence(){
     level++;
     document.querySelector("h1").textContent = "Level " + level;

     var randomNumber=Math.floor(Math.random()*4);
     var randomChosenColour=buttonColours[randomNumber];
     gamePattern.push(randomChosenColour);
     playSound(randomChosenColour);


}

function playSound(name){
     var audio=new Audio("sounds/"+name+".mp3");
     audio.play();
}
function animatePress(currentColour) {
    var button = document.getElementById(currentColour);

    button.classList.add("pressed");

    setTimeout(function() {
        button.classList.remove("pressed");
    }, 100);
}
function checkAnswer(currentLevel) {

    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

        console.log("success");

        if (userClickedPattern.length === gamePattern.length) {

            setTimeout(function() {
                nextSequence();
                userClickedPattern = [];
            }, 1000);

        }

    } else {

        console.log("wrong");

    }

}

var buttons = document.querySelectorAll(".btn");

buttons.forEach(function(button) {
     button.addEventListener("click", function() {
          var userChosenColour = this.id;
          userClickedPattern.push(userChosenColour);
          console.log(userClickedPattern);
          playSound(userChosenColour);
          animatePress(userChosenColour);
          checkAnswer(userClickedPattern.length - 1);
          
     });

});

