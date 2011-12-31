

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
 
		// This draws a square with the parameters from the variables set above
		ctx.fillRect(x, y, width, height);
		
		// The current position of the Snake's head, as xy coordinates
		this.currentPosition = {'x':50, 'y':50}; 
		direction = 'right';
		setInterval(moveSnake,100);

		// Sets the grid dimensions as one value
		this.gridSize = 10;
		
		document.onkeydown = keyPressed;

    } else {
      // Canvas is not supported
      alert("We're sorry, but your browser does not support the canvas tag. Please use any web browser other than Internet Explorer.");
    }
 }
 
function moveSnake(){
   switch(direction){
     case 'up':
       	currentPosition['y'] = currentPosition['y'] - gridSize;
       	drawSnake();
       	break;
 
     case 'down':
     	
       	currentPosition['y'] = currentPosition['y'] + gridSize;
       	drawSnake();
       	break;
 
     case 'left':
       	currentPosition['x'] = currentPosition['x'] - gridSize;
       	drawSnake();
       	break;
 
     case 'right':
       currentPosition['x'] = currentPosition['x'] + gridSize;
       drawSnake();
       break;
   }
}// End moveSnake

function drawSnake() {
   ctx.fillRect(currentPosition['x'], currentPosition['y'], gridSize, gridSize);
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
			     	// set new position, and draw square at that position.
			     	direction = 'left';
			       	currentPosition['x'] = currentPosition['x'] - gridSize;
 	     			drawSnake();
					break; 
			 
			     // up 
			     case 38:
			     // action when pressing up key
			     	direction = 'up';
			       	currentPosition['y'] = currentPosition['y'] - gridSize;
					drawSnake();
					break; 
			 
			     // right 
			     case 39:	
			     // action when pressing right key
			       	direction = 'right';
			       	currentPosition['x'] = currentPosition['x'] + gridSize;
					drawSnake();
					break;
			 
			     // down
			     case 40:
			     // action when pressing down key
			     	direction = 'down';
			     	currentPosition['y'] = currentPosition['y'] + gridSize;
			       	drawSnake();
			       	break; 
			 
			     default: 
			       break; 
			  } //End switch
}//End onkeydown