portalCount = 0;
var keys1 = [];

//Holds the address of the door for 
//teleportations to occur
door1AddressX = 0;
door1AddressY = 0;

Crafty.c('Player1' , {
	//**Variables specific to this instance must be here**
	open : false,
	jumpKeyDown : false,
	keyDown : false,
	direction :  1,
	moving : false,
	right_pressed : false,
	left_pressed : false,
	isOpen : false,
	init: function() {
		this.requires('Actor, door1, Twoway, Gravity, Collision, Player, SpriteAnimation')
		.attr({x: 0, y: 0, w: Game.map_grid.tile.width, h: Game.map_grid.tile.height * 1.8})
		.twoway(10)
		.reel('door1_open',500,0,4,1)
		.reel('door1_standing_left',500,0,0,4)
		.reel('door1_standing_right',500,0,1,4)
		.reel('door1_walking_left',500,0,2,4)
		.reel('door1_walking_right',500,0,3,4)
		.animate('door1_standing_left', -1)
		.gravity('Solid')
		.gravityConst(.7)
		.stopOnSolids()
		.stopOnBox()
	    .bind('KeyDown', function(e)
	    {
	    	if(e.key == Crafty.keys.RIGHT_ARROW)
	    	{
	    		this.right_pressed = true;
	    		if (this.isOpen == false) {
		    		// If the player is already moving to the left
		    		if (this.moving === true) {
		    			//Make the player animation stationary
		    			this.animate('door1_standing_left', -1);
		    			grass_sound.stop();
		    			this.moving = false;
		    		}
		    		// If only the right key is pressed
		    		else {
			    		this.direction = 1;
		    			console.log("Right");
		    			this.animate('door1_walking_right', -1);
		    			grass_sound.play();
		    			this.moving = true;
			    	}
		    	}
	    	}
	    	else if(e.key == Crafty.keys.LEFT_ARROW)
	    	{
	    		this.left_pressed = true;
	    		if (this.isOpen == false) {
		    		// If the player is already moving to the right
		    		if (this.moving === true) {
		    			console.log("Here");
		    			//Make the player animation stationary
		    			this.animate('door1_standing_right', -1);
		    			grass_sound.stop();
		    			this.moving = false;
		    		}
		    		else {
			    		this.direction = -1;
		    			this.animate('door1_walking_left', -1);
		    			grass_sound.play();
		    			this.moving = true;
			    	}
			    }
	    	}
	    	if(e.key == Crafty.keys.DOWN_ARROW) 
	    	{
		    	this.keyDown = true;
		        ++open1_count;
		        if((open1_count % 2 == 1) && this.isOpen == false)
		        {
		        	door_open.play();
		        	door_closed.stop();
		        	this.isOpen = true;
		        	this.animate('door1_open', -1);
		        }
		        else
		        {
		        	door_closed.play();
		        	door_open.stop();
		        	this.isOpen = false;
		        	if (this.direction === -1) {
		        		this.animate('door1_standing_left', -1);
		        	}
		        	else if (this.direction === 1) {
		        		this.animate('door1_standing_right', -1);
		        	}
		        }
		    }
		   	if(e.key == Crafty.keys.UP_ARROW) {
	    		grass_sound.stop();
	    	}
	    	if (e.key == Crafty.keys.R) 
		    {
				console.log("R")
		    	boy.boyDie()
		    }
	    })
	    .bind('KeyUp', function(e) {
		    if(e.key == Crafty.keys.DOWN_ARROW) {
		        this.keyDown = false
				// If the user is pressing the left key
    			if (this.left_pressed == true && this.isOpen == false) {
    				this.animate('door1_walking_left', -1);
	    			grass_sound.play();
	    			this.moving = true;
    			}
    			else if (this.right_pressed == true && this.isOpen == false) {
    				this.animate('door1_walking_right', -1);
	    			grass_sound.play();
	    			this.moving = true;
    			}
		    }
		    if (e.key == Crafty.keys.UP_ARROW) {
		    	this.jumpKeyDown = false
		    }
		   	if(e.key == Crafty.keys.RIGHT_ARROW)
	    	{
	    		this.right_pressed = false;
	    		if(this.isOpen == false)
	    		{
	    			// If the user is pressing the left key
	    			if (this.left_pressed === true) {
	    				this.animate('door1_walking_left', -1);
		    			grass_sound.play();
		    			this.moving = true;
	    			}
	    			else {
		    			this.animate('door1_standing_right', -1);
		    			grass_sound.stop();
		    			this.moving = false;
		    		}
	    		}
	    	}
	    	if(e.key == Crafty.keys.LEFT_ARROW)
	    	{
	    		this.left_pressed = false;
	    		if(this.isOpen == false)
	    		{
	    			if (this.right_pressed === true) {
	    				this.animate('door1_walking_right', -1);
		    			grass_sound.play();
		    			this.moving = true;
	    			}
	    			else {
		    			this.animate('door1_standing_left', -1);
		    			grass_sound.stop();
		    			this.moving = false;
		    		}
	    		}
	    	}
	    })
	    .bind('EnterFrame', function(frame) {
	    	//console.log("jumpspeed = " + this._jumpSpeed);
	    	//console.log("gravity = " + this._gy);
	    	//console.log("falling = " + this._falling);
			//Won't go offscreen
			//console.log("Moving = ");
			//console.log(moving);
			if (this.x > Crafty.viewport.width - this.w ||
				this.x < 0){
				this.x -= this._movement.x;
			}
			if (this.y > Crafty.viewport.height - this.h || this.y < 0) {
				this.y -= this._movement.y;
			}
	    	if (this.keyDown && this.open == false) {
	    		this.portalize();
	    	}
	    	else if (this.keyDown && this.open == true) {
	    		this.unportalize();
	    	}
	    	//If the door is open, stop it from moving
	    	if (this.open) {
		    	this.stopMovement();
			}

	    })
		.bind('Death1', function(e) {
			this.destroy()
		})
	},

	portalize: function() {
		this.antigravity()
		this.keyDown = false
		//FUTURE REFERENCE GET RID OF OPEN, USE ISOPEN
		this.open = true;
		portalCount += 1;
		door1AddressX = this.x;
		door1AddressY = this.y;
	},

	unportalize: function() {
		this.gravity('Solid')
		this.keyDown = false
		this.open = false;
		portalCount -= 1;
	},
	// Registers a stop-movement function to be called when
	// this entity hits an entity with the "Solid" component
	stopOnSolids: function() {
		this.onHit('Solid', this.stopMovement);
		return this;
	},
	stopOnBox: function() {
		this.onHit('Ground', this.stopJumpMovement);
		return this;
	},
	player1Dies: function() {
		this.trigger("PlayerDeath");
		this.destroy();
	},
	// Stops the movement when player hits general solid stuff
	stopMovement: function() {
		this._speed = 0;
		if (this._movement) {
			this.x -= this._movement.x;
		}
	},
	// Stops the movement when the player hits the ground (so only when he jumps up into the ground)
	stopJumpMovement: function() {
		this._speed = 0;
		if (this._movement) {
			this.x += this._movement.x;
			// If the player is falling, make sure they're falling according to gravity
			if (this._falling)
				this.y += (this._gy);
		}
	}
});
