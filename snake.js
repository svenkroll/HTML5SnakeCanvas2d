function checkSupported() {
    canvas = document.getElementById('canvas');
    canvas_menue = document.getElementById('canvas_menue');
    
    if (canvas.getContext){
      	ctx = canvas.getContext('2d');
        ctx_m = canvas_menue.getContext('2d');
      	// Canvas is supported
       	// This sets the fill color to red
        ctx.fillStyle = "rgb(200,0,0)";  
        ctx_m.fillStyle = "rgb(200,0,0)";  
        this.gridSize = 10;
        start();
    } else {
      // Canvas is not supported
      alert("We're sorry, but your browser does not support the canvas tag. Please use any web browser other than Internet Explorer.");
    }
 }

function makeFoodItem()
{
   suggestedPoint = [Math.floor(Math.random()*(canvas.width/gridSize))*gridSize, Math.floor(Math.random()*(canvas.height/gridSize))*gridSize];
   if (snakeBody.some(hasPoint)) {
     makeFoodItem();
   } else {
     ctx.fillStyle = "rgb(10,100,0)";
     ctx.fillRect(suggestedPoint[0], suggestedPoint[1], gridSize, gridSize);
     foodItems = 1;
   }
}

function hasPoint(element, index, array) 
{
   return (element[0] == suggestedPoint[0] && element[1] == suggestedPoint[1]);
}


function moveUp(){
    if ((currentPosition['y'] - gridSize) >= 0) {
     executeMove('up', 'y', (currentPosition['y'] - gridSize));
   } else {
     whichWayToGo('x');
   }
 }
 
function moveDown(){
   if ((currentPosition['y'] + gridSize) < canvas.height) {
     executeMove('down', 'y', (currentPosition['y'] + gridSize));    
   } else {
     whichWayToGo('x');
   }
 }
 
function moveLeft(){
   if ((currentPosition['x'] - gridSize) >= 0) {
     executeMove('left', 'x', (currentPosition['x'] - gridSize));
   } else {
     whichWayToGo('y');
   }
 }
 
function moveRight(){
   if ((currentPosition['x'] + gridSize) < canvas.width) {
     executeMove('right', 'x', (currentPosition['x'] + gridSize));
   } else {
     whichWayToGo('y');
   }
}

function executeMove(dirValue, axisType, axisValue) {
   direction = dirValue;
   currentPosition[axisType] = axisValue;
   drawSnake();
}

function snakeLoop(){
   updateScore();
   if (foodItems < maxFoodItems)
   {
       makeFoodItem();
   }
   
   switch(direction){
     case 'up':
       	moveUp();
       	break;
 
     case 'down':
       	moveDown();
       	break;
 
     case 'left':
       	moveLeft();
       	break;
 
     case 'right':
       moveRight();
       break;
   }
   drawMenue();
}// End snakeLoop

function drawMenue()
{
    ctx_m.font = "18pt Arial"; 
    ctx_m.clearRect(0,0, canvas_menue.width, canvas_menue.height);
    ctx_m.fillText("Score: " + score, 10, 20); 
}

function whichWayToGo(axisType){  
  if (axisType=='x') {
    a = (currentPosition['x'] > canvas.width / 2) ? moveLeft() : moveRight();
  } else {
    a = (currentPosition['y'] > canvas.height / 2) ? moveUp() : moveDown();
  }
}

function drawSnake() 
{
        if (snakeBody.some(hasEatenItself)) 
        {
            gameOver();
            return;
        }
	snakeBody.push([currentPosition['x'], currentPosition['y']]);
   	ctx.fillRect(currentPosition['x'], currentPosition['y'], gridSize, gridSize);
   	if (snakeBody.length > snakeLength) {
		var itemToRemove = snakeBody.shift();
		ctx.clearRect(itemToRemove[0], itemToRemove[1], gridSize, gridSize);
	}
        if (currentPosition['x'] == suggestedPoint[0] && currentPosition['y'] == suggestedPoint[1]) {
            makeFoodItem();
            snakeLength += 1;
        }       
}

function hasEatenItself(element, index, array) 
{
    return (element[0] == currentPosition['x'] && element[1] == currentPosition['y']);  
}

function updateScore(){
   score = (snakeLength - 3)*10
   //document.getElementById('score').innerText = score;
}

function gameOver()
{
    updateScore();
    pause();
    foodItems = 0;
    snakeBody = [];
    snakeLength = 3;
    alert("Game Over. Your score was "+ score);
    ctx.clearRect(0,0, canvas.width, canvas.height);
    document.getElementById('play_menu').style.display='none';
    document.getElementById('restart_menu').style.display='block';
}

function pause(){
    clearInterval(interval);
    allowPressKeys = false;
}

function play(){
    updateScore();
    interval = setInterval(snakeLoop,100);
    allowPressKeys = true;
}

function start(){
    document.onkeydown = keyPressed;
    ctx.clearRect(0,0, canvas.width, canvas.height);
    snakeBody = [];
    snakeLength = 3;
    foodItems = 0;
    maxFoodItems = 1;
    // The current position of the Snake's head, as xy coordinates
    this.currentPosition = {'x':50, 'y':50}; 
    direction = 'right';
    play();  
}

function restart(){
    pause();
    start();
}

function keyPressed(event)
{
    if (!allowPressKeys){
        return;
    }
    var keyCode; 
    if(!event)
    {
            keyCode = window.event.keyCode; 
    }
    else 
    {
        keyCode = event.keyCode; 
    }
 
    switch(keyCode)
    {
         // left 
         case 37:
            // action when pressing left key.
            if ( direction != 'right')
                {
                    direction = 'left';
                }
            break; 

         // up 
         case 38:
            // action when pressing up key
            if ( direction != 'down')
                {
                    direction = 'up';	       	
                }
            break; 
         // right 
         case 39:	
            // action when pressing right key
            if ( direction != 'left')
                {
                    direction = 'right';
                }
            break;		 
         // down
         case 40:
            // action when pressing down key
            if ( direction != 'up')
                {
                    direction = 'down';
                }
            break; 		 
         default:
           break; 
      } //End switch
}//End onkeydown