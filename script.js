//keybinds and key IDs
var keysPressed = {};
var KEY_W = 87;
var KEY_S = 83;
var KEY_UP = 38;
var KEY_DOWN = 40;
var KEY_SPACE = 32;
//starting presets
var score1 = 0;
var score2 = 0;
var countDown = 3;
var countDownValue;
var drawBall = false;
var hideCount = false;
var winner = 0;
var intervalID = 0;
var restart = false;

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var ballX = 400;
var ballY = 300;
var paddleYLeft = 250;
var paddleYRight = 250;
resetBall();
ctx.font = "40px Verdana";
ctx.fillText("Press  [SPACE]  to begin playing pong!", 2, 400);
waitToStart();
while(winner > 0){
waitToStart();
}

function displayCountDown()
{
  if(hideCount === false){
    ctx.font = "165px Verdana"
    if(countDown <= 90 && countDown >= 61)
    {
      ctx.fillStyle = "white";
      countDownValue = 3;
    }
    if(countDown <= 61 && countDown >= 31)
    {
      ctx.fillStyle = "white";
      countDownValue = 2;
    }
    if(countDown <= 31 && countDown >= 1)
    {
      ctx.fillStyle = "white";
      countDownValue = 1;
    }
    // Display if countDown is between 0-3
    if(countDown > 1 && countDown <= 90)
    {
      ctx.fillText(countDownValue, 340, 450);
    }
    else
    {
      drawBall = true;
    }
    countDown -= 1;
  }
else
{
     return 1;}
{
     return 1;}
}

//up and down functions
window.addEventListener("keyup", function(event){
  onKeyUp(event);
}, false);

window.addEventListener("keydown", function(event){ 
  onKeyDown(event);
}, false);

//starting game
function startGame()
{
  
  drawBall = false;
  hideCount = false;
  console.log("starting Game Interval");
  score1 = 0;
  score2 = 0;
  winner = 0;
  intervalID = setInterval(myGameLoop, 20); 
}

//scoring function
function score()
{
  if(ballX > canvas.width - 10)
  {
    score1++;
    resetBall();
  }
  if(ballX < 0)
  {
    score2++;
    resetBall();
  }
}

//waiting screen
function waitToStart()
{
  if(keysPressed[KEY_SPACE] !== true)
  {
    setTimeout(waitToStart, 40);
  }
  else
  {
    startGame(); 
  }
}

//onkeydown/up definitions 
function onKeyUp (event){
  keysPressed[event.keyCode] = false;
}
function onKeyDown (event){
  keysPressed[event.keyCode] = true;
}

var changeBallX = 5;
var changeBallY = 5;

//randomize ball path on RESET
function getRandomArbitrary(min, max) {
  return Math.random() * (max -min) + min;
}

//when rematch
function resetBall()
{
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    changeBallX = getRandomArbitrary(12, 12);
    changeBallY = getRandomArbitrary(12, 12);
    var directionX = getRandomArbitrary(0,1);
    var directionY = getRandomArbitrary(0,1);
    if (directionX >= .5)
    {
        changeBallX = -changeBallX;
    }
    if (directionY >= .5)
    {
        changeBallY = -changeBallY
    }
    countDown = 90;
    drawBall = false; 
}

//scoreboard
function displayScore()
{
  ctx.font = "24px Verdana";
  ctx.fillText("Player 1: "+ score1, 60, 750);
  ctx.font = "24px Verdana";
  ctx.fillText("Player 2: "+ score2, 610, 750);
}

//on collide
function collide(rect1X, rect1Y, rect1W, rect1H, rect2X, rect2Y, rect2W, rect2H, change )
{
    if (rect1X + rect1W > rect2X)
    {
        if (rect1X < rect2X + rect2W)
        {
          if (rect2Y < rect1Y + rect1H)
          {
            if (rect1Y < rect2Y + rect2H)
            {
              return -change;
            }
          }
        }
    }
    return change;
}
function victory()
{
  if(score1 >= 3)
  {
    console.log("Player One wins");
    winner = 1;
  }
  if(score2 >= 3)
  {
    winner = 2;
    console.log("Player Two wins");
  }
  if(winner > 0){
    drawBall = false;
      //background
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
    hideCount = true;
    ctx.fillStyle = "#ffffff";
    ctx.font = "40px Verdana";
    ctx.fillText("Player " + winner + " wins! Rematch? Press space!", 35, 400);
    
  }
}

//On gameloop
function myGameLoop()
{
  console.log("gameloop");
  //background
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  //ball
  if(drawBall === true)
  {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(ballX, ballY, 20, 20);
    ballX += changeBallX;
    ballY += changeBallY;
  }

  //left bar
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(5, paddleYLeft, 20, 250);

  //right bar
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(785, paddleYRight, 20, 250);


  displayScore()

  changeBallX = collide(ballX, ballY, 10, 10, 785, paddleYRight, 10, 150, changeBallX);
  changeBallX = collide(ballX, ballY, 10, 10, 10, paddleYLeft, 10, 150, changeBallX);
  changeBallY = collide(ballX, ballY, 10, 10, 0, -30, canvas.width, 30, changeBallY);
  changeBallY = collide(ballX, ballY, 10, 10, 0, canvas.height, canvas.width, 30, changeBallY);

  if(paddleYLeft > canvas.height - 150)
  {
    paddleYLeft = canvas.height - 150;
  }

  if(paddleYRight > canvas.height - 150)
  {
    paddleYRight = canvas.height - 150;
  }
  
  //score function
  score();
  //countdown function
  displayCountDown();
  //winner function
  victory();
  
  if(paddleYLeft < 0)
  {
    paddleYLeft = 0;
  }

  if(paddleYRight < 0)
  {
    paddleYRight = 0;
  }
  
  //bar controls
  if (keysPressed[KEY_W] === true)
  {
    console.log(paddleYLeft);
    paddleYLeft -= 38; 
  }
  if (keysPressed[KEY_S] === true)
  {
    console.log(paddleYLeft);
    paddleYLeft += 38; 
  }
    if (keysPressed[KEY_UP] === true)
  {
    console.log(paddleYLeft);
    paddleYRight -= 38; 
  }
  if (keysPressed[KEY_DOWN] === true)
  {
    console.log(paddleYLeft);
    paddleYRight += 38; 
  }
 
   if(winner > 0)
   {
    window.clearInterval(intervalID);
    waitToStart();
   }
}
