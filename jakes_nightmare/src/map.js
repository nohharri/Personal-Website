// The Grid component allows an element to be located
//  on a grid of tiles
// An "Actor" is an entity that is drawn in 2D on canvas
//  via our logical coordinate grid
Crafty.c('StartScreen', 
{
	press: false,
	init: function() {
		Crafty.background('url(src/images/background_new.png) no-repeat center center');
		this.requires('Actor, Color, Twoway, Gravity, Collision, Player')
		.attr({x: 0, y: 0, w: 10, h: 10})
		.bind('KeyDown', function(e) 
		{
	    	if(e.key == Crafty.keys.SPACE) 
	    	{
	        	this.press = true
	   	 	}
	   	 	if (e.key == Crafty.keys.ENTER)
	   	 	{
	   	 		this.press = true
	   	 	}
    	})
		.bind('EnterFrame', function(frame) {
    		if (this.press) {
    			if (tutorial_ID == 0)
    				Crafty.trigger('GoToJakeIntro', this);
    			else if (tutorial_ID == 1)
    				Crafty.trigger('GoToStory')
    			else if (tutorial_ID == 2)
    				Crafty.trigger('GoToStory2', this);
    			else if (tutorial_ID == 3)
    				Crafty.trigger('GoToControls', this);
    			else if (tutorial_ID == 4)
    				Crafty.trigger('GoToObjective1', this);
    			else if (tutorial_ID == 5)
    				Crafty.trigger('GoToObjective2', this);
    			else if (tutorial_ID == 6)
    				Crafty.trigger('GoTo1', this);
    		}
    	})
    }
});

Crafty.c('EndScreen', 
{
	press: false,
	init: function() {
		this.requires('Actor, Color, Twoway, Gravity, Collision, Player')
		.attr({x: 0, y: 0, w: 10, h: 10})
		.bind('KeyDown', function(e) 
		{
	    	if(e.key == Crafty.keys.SPACE) 
	    	{
	        	this.press = true
	   	 	}
	   	 	if (e.key == Crafty.keys.ENTER)
	   	 	{
	   	 		this.press = true
	   	 	}
    	})
		.bind('EnterFrame', function(frame) {
    		if (this.press) {
    			Crafty.trigger('GoToStart', this);
    		}
    	})
    }
});

Crafty.c('Title', { 
	init: function() 
	{
		this.requires('Actor, title')
		.attr({x: 0, y: 0, w: 1409 * 1.3, h: 479 * 1.3})
	}
});

Crafty.c('This_Is_Jake_Text', { 
	init: function() 
	{
		this.requires('Actor, this_is_jake')
		.attr({x: 0, y: 0, w: 700 * 1.5, h: 200 * 1.5})
	}
});

Crafty.c('Jake_Static', { 
	init: function() 
	{
		this.requires('Actor, jake_static')
		.attr({x: 0, y: 0, w: 500, h: 500})
	}
});

Crafty.c('Story_1_Text', { 
	init: function() 
	{
		this.requires('Actor, jake_story')
		.attr({x: 0, y: 0, w: 2000 * 1.3, h: 700 * 1.3})
	}
});

Crafty.c('Story_2_Text', { 
	init: function() 
	{
		this.requires('Actor, jake_story_2')
		.attr({x: 0, y: 0, w: 2000 * 1.3, h: 700 * 1.3})
	}
});

Crafty.c('Controls_Text', { 
	init: function() 
	{
		this.requires('Actor, controls')
		.attr({x: 0, y: 0, w: 1000 * 1.5, h: 900 * 1.5})
	}
});

Crafty.c('Objective_1_Text', { 
	init: function() 
	{
		this.requires('Actor, objective')
		.attr({x: 0, y: 0, w: 2000 * 1.3, h: 900 * 1.3})
	}
});

Crafty.c('Objective_2_Text', { 
	init: function() 
	{
		this.requires('Actor, objective_2')
		.attr({x: 0, y: 0, w: 2000 * 1.3, h: 900 * 1.3})
	}
});

Crafty.c('Teddy_Big', { 
	init: function() 
	{
		this.requires('Actor, teddy_big')
		.attr({x: 0, y: 0, w: 500, h: 500})
	}
});

Crafty.c('Door_1_Static', { 
	init: function() 
	{
		this.requires('Actor, door_1_static')
		.attr({x: 0, y: 0, w: 1000, h: 1000})
	}
});

Crafty.c('Door_2_Static', { 
	init: function() 
	{
		this.requires('Actor, door_2_static')
		.attr({x: 0, y: 0, w: 1000, h: 1000})
	}
});

Crafty.c('Over', { 
	init: function() 
	{
		this.requires('Actor, over')
		.attr({x: 0, y: 0, w: 3000 / 2, h: 2400 / 2})
	}
});

Crafty.c('Grid', {
	init: function () {
		this.attr({
			w: Game.map_grid.tile.width,
			h: Game.map_grid.tile.height
		})
	},

	  // Locate this entity at the given position on the grid
  	at: function(x, y) {
    	if (x === undefined && y === undefined) {
      		return { x: this.x/Game.map_grid.tile.width, y: this.y/Game.map_grid.tile.height }
    	} 
    	else {
      		this.attr({ x: x * Game.map_grid.tile.width, y: y * Game.map_grid.tile.height });
      		return this;
    	}
  	}
});

Crafty.c('Actor', {
    init: function() {
        this.requires('2D, Canvas, Grid');
    },
});

Crafty.c('Ground', {
	init: function() {
		this.requires('Actor, tile, Solid, Collision')
	}
});

Crafty.c('Dirt', {
	init: function() {
		this.requires('Actor, dirt, Solid, Collision')
	}
});

Crafty.c('House', {
	init: function() {
		this.requires('Actor, house')
			.attr({x: 0, y: 0, w: 200 * 3, h: 200 * 3});
	}
});

Crafty.c('Portal', {
	init: function() {
		this.requires('Actor, Color, Portal')
			.color('blue')
			.attr({x: 100, y: 100, w: 50, h: 50});
	}
})

Crafty.c('Hazard', {
	init: function() {
		this.requires('Actor, hazards, Hazard')
	}
})

Crafty.c('Boundary', {
	init: function() {
		this.requires('Actor, Color, Boundary')
			.color('blue', 0)
	}
})

Crafty.c('Replay', {
	init:function() {
		this.requires('2D, Canvas, Text')
			.attr({x: 12*90, y: 7.5*90, w: 250, h: 250})
			.text("GAME OVER")
			.textColor ('black')
	}
})
