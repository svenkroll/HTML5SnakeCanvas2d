function checkSupported() {
    canvas = document.getElementById('canvas');
    if (canvas.getContext){
      	ctx = canvas.getContext('2d');  
      	// Canvas is supported
       	// This sets the fill color to red
 		ctx.fillStyle = "rgb(200,0,0)"; 
 		// This sets some variables for demonstration purposes
 		var x = 50;
 		var y = 50;
 		var width = 10;
 		var height = 10;
 		snakeBody = [];
 		snakeLength = 3;
 		foodItems = 0;
                maxFoodItems = 1;
		// The current position of the Snake's head, as xy coordinates
		this.currentPosition = {'x':50, 'y':50}; 
		direction = 'right';
                
		setInterval(snakeLoop,100);

		// Sets the grid dimensions as one value
		this.gridSize = 10;
		
		document.onkeydown = keyPressed;

    } else {
      // Canvas is not supported
      alert("We're sorry, but your browser does not support the canvas tag. Please use any web browser other than Internet Explorer.");
    }
 }

function makeFoodItem(){
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
}// End snakeLoop

function whichWayToGo(axisType){  
  if (axisType=='x') {
    a = (currentPosition['x'] > canvas.width / 2) ? moveLeft() : moveRight();
  } else {
    a = (currentPosition['y'] > canvas.height / 2) ? moveUp() : moveDown();
  }
}

function drawSnake() {
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
 
function keyPressed(event)
{
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
			     	direction = 'left';
					break; 
			 
			     // up 
			     case 38:
			     	// action when pressing up key
			     	direction = 'up';	       	
					break; 
			     // right 
			     case 39:	
			     	// action when pressing right key
			       	direction = 'right';	       
					break;		 
			     // down
			     case 40:
			     	// action when pressing down key
			     	direction = 'down';
			       	break; 		 
			     default:
			       break; 
			  } //End switch
}//End onkeydown