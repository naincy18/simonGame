// We have multiple related values, and we want to treat them as one collection."
var buttonColours=["red","blue","green","yellow"];


// gamePattern gradually stores the Simon sequence.
var gamePattern = [];

function nextSequence(){
     var randomNumber=Math.floor(Math.random()*4);
     var randomChosenColour=buttonColours[randomNumber];
     gamePattern.push(randomChosenColour);

}