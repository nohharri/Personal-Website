portalCount = 0;
var keys2 = [];

//Holds the address of the door for 
//teleportations to occur
door2AddressX = 0;
door2AddressY = 0;

Crafty.c('Player2' , {
	open : false,
	jumpKeyDown : false,
	keyDown : false,
	init: function() {
		direction = 2;
		// Whether or not the player is moving
		moving = false;
		right_pressed = false;
		left_pressed = false;
		this.requires('Actor, door2, Twoway2, Gravity, Collision, Player, SpriteAnimation')
		.attr({x: 0, y: 0, w: Game.map_grid.tile.width, h: Game.map_grid.tile.height * 1.8})
		.twoway2(10)
		.reel('door2_open',500,0,4,1)
		.reel('door2_standing_left',500,0,0,4)
		.reel('door2_standing_right',500,0,1,4)
		.reel('door2_walking_left',500,0,2,4)
		.reel('door2_walking_right',500,0,3,4)
		.animate('door2_standing_left', -1)
		.gravity('Solid')
		.gravityConst(.7)
		.stopOnSolids()
		.stopOnBox()
	    .bind('KeyDown', function(e)
	    {
	    	if(e.key == Crafty.keys.D)
	    	{
	    		right_pressed = true;
	    		if (isOpen == false) {
		    		// If the player is already moving to the left
		    		if (moving === true) {
		    			//Make the player animation stationary
		    			this.animate('door2_standing_left', -1);
		    			grass_sound.stop();
		    			moving = false;
		    		}
		    		// If only the right key is pressed
		    		else {
			    		direction = 1;
		    			this.animate('door2_walking_right', -1);
		    			grass_sound.play();
		    			moving = true;
			    	}
		    	}
	    	}
	    	else if(e.key == Crafty.keys.A)
	    	{
	    		left_pressed = true;
	    		if (isOpen == false) {
		    		// If the player is already moving to the right
		    		if (moving === true) {
		    			//Make the player animation stationary
		    			this.animate('door2_standing_right', -1);
		    			grass_sound.stop();
		    			moving = false;
		    		}
		    		else {
			    		direction = -1;
		    			this.animate('door2_walking_left', -1);
		    			grass_sound.play();
		    			moving = true;
			    	}
			    }
	    	}
	    	if(e.key == Crafty.keys.S) 
	    	{
		    	this.keyDown = true;
		        ++open2_count;
		        if((open2_count % 2 == 1) && isOpen == false)
		        {
		        	door_open.play();
		        	door_closed.stop();
		        	isOpen = true;
		        	this.animate('door2_open', -1);
		        }
		        else
		        {
		        	door_closed.play();
		        	door_open.stop();
		        	isOpen = false;
		        	if (direction === -1) {
		        		this.animate('door2_standing_left', -1);
		        	}
		        	else if (direction === 1) {
		        		this.animate('door2_standing_right', -1);
		        	}
		        }
		    }
		   	if(e.key == Crafty.keys.W) {
	    		grass_sound.stop();
	    	}
	    	if (e.key == Crafty.keys.R) 
		    {
				console.log("R")
		    	boy.boyDie()
		    }
	    })
	    .bind('KeyUp', function(e) {
		    if(e.key == Crafty.keys.S) {
		        this.keyDown = false
				// If the user is pressing the left key
    			if (left_pressed == true && isOpen == false) {
    				this.animate('door2_walking_left', -1);
	    			grass_sound.play();
	    			moving = true;
    			}
    			else if (right_pressed == true && isOpen == false) {
    				this.animate('door2_walking_right', -1);
	    			grass_sound.play();
	    			moving = true;
    			}
		    }
		    if (e.key == Crafty.keys.W) {
		    	this.jumpKeyDown = false
		    }
		   	if(e.key == Crafty.keys.D)
	    	{
	    		right_pressed = false;
	    		if(isOpen == false)
	    		{
	    			// If the user is pressing the left key
	    			if (left_pressed === true) {
	    				this.animate('door2_walking_left', -1);
		    			grass_sound.play();
		    			moving = true;
	    			}
	    			else {
		    			this.animate('door2_standing_right', -1);
		    			grass_sound.stop();
		    			moving = false;
		    		}
	    		}
	    	}
	    	if(e.key == Crafty.keys.A)
	    	{
	    		left_pressed = false;
	    		if(isOpen == false)
	    		{
	    			if (right_pressed === true) {
	    				this.animate('door2_walking_right', -1);
		    			grass_sound.play();
		    			moving = true;
	    			}
	    			else {
		    			this.animate('door2_standing_left', -1);
		    			grass_sound.stop();
		    			moving = false;
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
		.bind('Death2', function(e) {
			this.destroy()
		})
	},

	portalize: function() {
		this.antigravity()
		this.keyDown = false
		//FUTURE REFERENCE GET RID OF OPEN, USE ISOPEN
		this.open = true;
		portalCount += 1;
		door2AddressX = this.x;
		door2AddressY = this.y;
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
	player2Dies: function() {
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
