$(document).ready(function()
{
		var myCanvas = document.getElementById("myCanvas");
		var squares = new Array();
		var timer = setTimeout(update, 17);
		var modeTimer = setTimeout(switchMode, 20000);
		var sinCounter = 0;
		var mode = 0; //0: normal sideways // 1:bounce
		var mouseX = 0;
		var mouseY = 0;
		
		myCanvas.addEventListener('mousemove', function (evt) {
            	mouseX = getMousePos(myCanvas, evt).x;
            	mouseY = getMousePos(myCanvas, evt).y;
        	}, false);
		
			init();
			function draw()
			{
				var ctx=myCanvas.getContext("2d");
				ctx.clearRect (0, 0, myCanvas.width, myCanvas.height);
				ctx.fillStyle="#000000";
				
				for(var i = 0; i < squares.length; i++)
				{
					if(mode == 0)
						updateMode0(squares[i]);
					if(mode == 1)
						updateMode1(squares[i]);
					if(mode == 2)
						updateMode2(squares[i]);
					ctx.fillRect(squares[i].x, squares[i].y, squares[i].width, squares[i].height);
				}
				
				if(mode == 3)
					updatePong(ctx);
			}
			
		//To RIGHT, no GRAVITY
		function updateMode0(s)
		{
			s.xVel = 0;
			s.xVel += s.width * 0.1;
			s.yVel = 0;
			doMouseInteraction(s);
			s.x += s.xVel;
			s.y += s.yVel;
			if(s.y + s.height > myCanvas.height - 100)
			{
				s.y = myCanvas.height - 100 - s.height;
				s.yVel = -(s.yVel * 0.8);
			}
			if(s.x > myCanvas.width + 50)
				resetSquare0(s);
		}
		//To RIGHT, GRAVITY
		function updateMode1(s)
		{
			doMouseInteraction(s);
			s.yVel += 0.1;
			s.xVel += s.width * 0.1;
			s.x += s.xVel;
			s.y += s.yVel * s.width * 0.1;
			
			
			if(s.y + s.height > myCanvas.height - 100)
			{
				s.y = myCanvas.height - 100 - s.height;
				s.yVel = -(s.yVel * 0.8);
			}
			if(s.x > myCanvas.width + 50)
				resetSquare0(s);
		}
		//SWIRL
		function updateMode2(s)
		{
			sinCounter += 0.0001;
			var desX =  myCanvas.width * 0.5 + -Math.sin(sinCounter + s.randT) * s.width * 80;
			var desY = myCanvas.height * 0.5 + Math.cos(sinCounter + s.randT) * s.width * 80;
			
			s.x += (desX - s.x) * 0.01;
			s.y += (desY - s.y) * 0.01;

			s.width += 0.05;
			s.height += 0.05;
			
			if(s.x < -200 || s.y < -200 || s.x > myCanvas.width + 200 || s.y > myCanvas.height + 200)
				resetSquare1(s);
		}
		
		//PONG
		function updatePong(ctx)
		{
			ctx.fillRect(100, mouseY, 20, 40);
		}
		
		function Square(X, Y, width, height)
			{
				this.x = X;
				this.y = Y;
				this.width = width;
				this.height = height;
				this.yVel = 0;
				this.xVel = 0;
				this.randT = Math.random() * 6.28;
				return this;
			}
			
			function update()
			{
				myCanvas.width  = window.innerWidth;
  				myCanvas.height = window.innerHeight;
				draw();
				var dt = 17;
				setTimeout(update, dt);
			}
			
			function resetSquare0(s)
			{
				s.x = -100;
				var randY = Math.random() * myCanvas.width;
				s.y = randY;
				
				var randWidth = Math.floor(Math.random() * 25) + 5;
				s.height = randWidth;
				s.width = randWidth;
			}
			function resetSquare1(s)
			{
				s.x = mouseX;
				s.y = mouseY;
				s.height = 1;
				s.width = 1;
				s.randT = Math.random() * 6.28;
			}
			
			function init(mouseEvent)
			{
				var rand = Math.random();
				if(rand < 0.33)
					mode = 0;
				else if(rand < 0.66)
					mode = 1;
				else
					mode = 2;
					
				//CLEAR
				clearTimeout(timer);
				squares.length = 0;
				//INIT squares
				var numsquares = 300;
				for(var i = 0; i < numsquares; i++)
				{
					var randX = Math.floor(Math.random() * myCanvas.width);
					var randY = Math.floor(Math.random() * myCanvas.height);
					var randWidth = Math.floor(Math.random() * 25) + 5;
					
					squares.push(new Square(randX, randY, randWidth, randWidth));
				}
				
				timer = setTimeout(update, 250);
				draw();
			}
			
			function switchMode()
			{
				var rand = Math.random();
				if(mode == 0)
				{
					if(rand >= 0.5) mode = 1;
					if(rand  < 0.5) mode = 2;
				}
				else if(mode == 1)
				{
					if(rand >= 0.5)
					{
						mode = 0;
						for(var i = 0; i < squares.length; i++)
							squares[i].yVel = 0;
					}
					if(rand < 0.5) mode = 2;
				}
				else if(mode == 2)
				{
					if(rand >= 0.5)
					{
						mode = 0;
						for(var i = 0; i < squares.length; i++)
							squares[i].yVel = 0;
					} 
					if(rand < 0.5) mode = 1;
					for(var i = 0; i < squares.length; i++)
						squares[i].yVel = 0;
				}
				setTimeout(switchMode, 20000);
			}
			
			function doMouseInteraction(s)
			{
				var inner = Math.pow(mouseX - s.x, 2) + Math.pow(mouseY - s.y, 2);
				var dist = Math.abs(Math.sqrt(inner));
				var vel = (15 * s.width) / (dist + 1);
				if(mouseX < s.x)
				{
					s.xVel = vel * Math.cos(Math.atan((mouseY - s.y) / (mouseX - s.x)));
					s.yVel = vel * Math.sin(Math.atan((mouseY - s.y) / (mouseX - s.x)));
				}
				else
				{
					s.xVel = -vel * Math.cos(Math.atan((mouseY - s.y) / (mouseX - s.x)));
					s.yVel = -vel * Math.sin(Math.atan((mouseY - s.y) / (mouseX - s.x)));
				}
			}
			
			function getMousePos(canvas, evt) {
    			var rect = canvas.getBoundingClientRect();
    			return {
        			x: evt.clientX - rect.left,
        			y: evt.clientY - rect.top
    			};
			}
		});