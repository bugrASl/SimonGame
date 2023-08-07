var buttonColors = ["red", "blue" , "green" , "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var stat = false;
var mobileStat = false;

$("#restart").click(function(){
    if(!mobileStat){
        $("#level-title").text("level "+level);
        nextSequence();
        mobileStat= true;
    }
})

$(document).keypress(function() {
    if (!stat){
        $("#level-title").text("level "+level);
        nextSequence();
        stat = true;
    }
});

$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);

});

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("level "+level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    var id = "#" + randomChosenColor;
    $(id).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    function removeEffect(){
        $("#" + currentColor).removeClass("pressed");
    }
    setTimeout(removeEffect , 100);
}

function checkAnswer(currentLevel){
    console.log(userClickedPattern);
    console.log(gamePattern);
    if(userClickedPattern[currentLevel]==gamePattern[currentLevel]){
        if(userClickedPattern.length == gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }       
    }else{
        console.log("Wrong");
        $("body").addClass("game-over");
        playSound("wrong");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over , Press Any Key to Restart")
        gamePattern = [];
        userClickedPattern = [];
        level = 0;
        stat = false;
        mobileStat = false;
    }
}