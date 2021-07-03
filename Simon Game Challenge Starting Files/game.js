var level=0;
var started = false;

var gamePattern=[];

var userClickedPattern=[];

var buttonColours=["red", "blue", "green", "yellow"];

$(document).keypress(function() {
  if (!started) {

    //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    var a=userClickedPattern.length;

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(a-1);
  }
);

function nextSequence()
{userClickedPattern = [];
level++;
$("#level-title").text("Level " + level);

var randomNumber= Math.floor( Math.random()*4 );
var randomChosenColour=buttonColours[randomNumber];
gamePattern.push(randomChosenColour);

$("#"+randomChosenColour).fadeOut(100).fadeIn(100);

playSound(randomChosenColour);
}

function playSound(name)
{
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor)
{
  $("." + currentColor).addClass("pressed");
  setTimeout(function() {$("." + currentColor).removeClass("pressed");}, 100);
}

function checkAnswer(currentLevel)
{
  if(userClickedPattern[currentLevel]===gamePattern[currentLevel])
  {
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  }
  else
  {
    playSound("wrong");
    $("#level-title").text("Game Over!Press any key to try again.");
    level=0;
    gamePattern=[];
    userClickedPattern=[];
    started=false;
  }
}
