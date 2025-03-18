function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

var colors = ["red","green","yellow","blue"];

function getRandomColor(){
    var randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
} 

function playSound(color){
    var audio = new Audio("sounds/"+color+".mp3");
    audio.play();
}
function playWrongAnswerSound(){
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
}

function checkAnswer(userClickedPattern, gamePattern){
    for(var i = 0; i < userClickedPattern.length; i++){
        if(userClickedPattern[i] != gamePattern[i]){
            return false;
        }
    }
    return true;
}   

function animateComputerChoice(color){2
    $("."+color).css("background-color","white");
    setTimeout(function(){
        $("."+color).css("background-color",color);
        playSound(color);
    }, 200);
}

function animateUserChoice(color){
    $("."+color).animate({opacity: 0.5}, 100);
    playSound(color);
    setTimeout(function(){
        $("."+color).animate({opacity: 1}, 200);
    }, 100);

}
function gameOverText(){
    $("h1").text("Game Over, Press Any Key to Restart");
}

function updateLevelText(level){
    $("h1").text("Level "+level);
}

var startGame = false;
var computerRandomColor = null;
var level = 1;
var userClickedPattern = [];
var gamePattern = [];


$(document).keypress(function(){
    if(!startGame){
        startGame = true;
        updateLevelText(level);
        computerRandomColor = getRandomColor();
        animateComputerChoice(computerRandomColor);
        gamePattern.push(computerRandomColor);
    }
});





$("button").click(function(){

    if (!startGame){
        return;
    }

    var userChosenColor = $(this).attr("class");
    animateUserChoice(userChosenColor);
    userClickedPattern.push(userChosenColor);

    var isCorrect = checkAnswer(userClickedPattern, gamePattern);
    if (isCorrect && userClickedPattern.length < gamePattern.length){
        return;
    }
    else if (isCorrect && userClickedPattern.length == gamePattern.length){
        level++;
        updateLevelText(level);
        userClickedPattern = [];
        computerRandomColor = getRandomColor();
        animateComputerChoice(computerRandomColor);
        gamePattern.push(computerRandomColor);
    }
    else{
        playWrongAnswerSound();
        gameOverText();
        gamePattern = [];
        userClickedPattern = [];2
        level = 1 ;
        startGame = false;
    }
        
});





