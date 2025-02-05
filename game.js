var firstKeypress = false;
var level = 0;
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

$(document).keypress(function() {
    if(!firstKeypress) {
        $("h1").text("Level "+ level);
        nextSequence();
        firstKeypress = true;
    }
});

function nextSequence() {
    userClickedPattern= [];
    level ++;
    $("h1").text("Level "+level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(150).fadeIn(150);
    playSound(randomChosenColour);
    
}

$(".btn").click(function() {
    var userColourChosen = $(this).attr("id");
    userClickedPattern.push(userColourChosen);
    playSound(userColourChosen);
    animatePress(userColourChosen);
    playSound(userColourChosen);
    checkAnswer(userClickedPattern.length - 1);
});

function playSound(name) {
    var audio = new Audio("./sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColor) {
        $("#"+currentColor).addClass("pressed");
        setTimeout(function() {
            $("#"+currentColor).removeClass("pressed");
        }, 150);
}

function checkAnswer(currentLevel) {
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");
    if(userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence();
            },1000);
        }  
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, Press Any Key to Restart");
        userClickedPattern = [];
        firstKeypress = false;
        level = 0;
        gamePattern = [];
    } 
}

