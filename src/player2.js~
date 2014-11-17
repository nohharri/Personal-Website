portalCount = 0;

//Holds the address of the door for 
//teleportations to occur
door2AddressX = 0;
door2AddressY = 0;

Crafty.c('Player2' , {
	keyDown: false,
	jumpKeyDown: false,
	open: false,
	colHit: false,
	init: function() {
		this.numPlayers += 1;
		this.requires('Actor, Color, Twoway2, Gravity, Collision, Player')
		.attr({x: 0, y: 0, w: Game.map_grid.tile.width, h: Game.map_grid.tile.height})
		.color('red')
		.twoway2(10)
		.gravity('Solid')
		.gravityConst(.60)
		.stopOnSolids()
		.stopOnBox()
		.bind('KeyDown', function(e) {
		    if(e.key == Crafty.keys.S) {
		        this.keyDown = true
		    }
		    if (e.key == Crafty.keys.W) {
		    	this.jumpKeyDown = true
		    }
	    })
	    .bind('KeyUp', function(e) {
		    if(e.key == Crafty.keys.S) {
		        this.keyDown = false
		    }
		    if (e.key == Crafty.keys.W) {
		    	this.jumpKeyDown = false
		    }
	    })
	    .bind('EnterFrame', function(frame) {
			//Won't go offscreen
			if (this.x > Crafty.viewport.width - this.w ||
				this.x < 0){
				this.x -= this._movement.x;
			}
			if (this.y > Crafty.viewport.height - this.h ) {
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
		this.color('yellow')
		this.antigravity()
		this.keyDown = false
		this.open = true;
		portalCount += 1;
		door2AddressX = this.x;
		door2AddressY = this.y;
	},

	unportalize: function() {
		this.color('red')
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
		this.onHit('Ground', this.stopDamnMovement);
		return this;
	},
	player1Dies: function() {
		this.trigger("PlayerDeath");
		this.destroy();
	},
	// Stops the movement
	stopMovement: function() {
		//console.log(this._speed);
		this._speed = 0;
		if (this._movement) {
			//console.log(this._movement.y);
			this.x -= this._movement.x;
			//if (this.jumpKeyDown)
			this.y -= this._movement.y;
		}
		//this.y += 10;
	},
	stopDamnMovement: function() {
		console.log("FUCK YEA");
		this._speed = 0;
		if (this._movement) {
			//console.log(this._movement.y);
			//this.x -= this._movement.x;
			//if (this.jumpKeyDown)
			this.y += this._jumpSpeed;
		}
	}
});
