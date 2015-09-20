Game = {
	numPlayers: 0,
     // This defines our grid's size and the size of each of its tiles

    map_grid: {
        width:  27,
        height: 15,
        tile: {
          width:  90,
          height: 90
        }
    },
	// The total width of the game screen. Since our grid takes up the entire screen
	//  this is just the width of a tile times the width of the grid
	width: function() {
		return this.map_grid.width * this.map_grid.tile.width;
	},

	// The total height of the game screen. Since our grid takes up the entire screen
	//  this is just the height of a tile times the height of the grid
	height: function() {
		return this.map_grid.height * this.map_grid.tile.height;
	},

	start: function() {
		Crafty.init(Game.map_grid.width * 
			Game.map_grid.tile.width,
			Game.map_grid.height * 
			Game.map_grid.tile.height);
		//Crafty.background('url(ibackground_1.png)');  
		//Crafty.background('lightgray');
		//Crafty.background("url('path/to/image.png')");

		Crafty.sprite(100, "src/images/boy_sprite_walking.png",
		{
			boy: [0, 0]
		});
		Crafty.sprite(500, "src/images/jake_static.png",
		{
			jake_static: [0, 0]
		});
		Crafty.sprite(100, "src/images/enemy_sprite.png",
		{
			enemy: [0, 0]
		});

		Crafty.sprite(100, "src/images/teddy.png",
		{
			teddy: [0, 0]
		})

		Crafty.sprite(500, "src/images/teddy_big.png",
		{
			teddy_big: [0, 0]
		})

		Crafty.sprite(100, 200, "src/images/door_1_sprite.png",
		{
			door1: [0, 0]
		})

		Crafty.sprite(100, 200, "src/images/door_2_sprite.png",
		{
			door2: [0, 0]
		})

		Crafty.sprite(1000, "src/images/door_1_static.png",
		{
			door_1_static: [0, 0]
		})

		Crafty.sprite(1000, "src/images/door_2_static.png",
		{
			door_2_static: [0, 0]
		})

		Crafty.sprite(100, "src/images/tile_regular.png",
		{
			tile: [0,0]
		})

		Crafty.sprite(100, "src/images/dirt.png",
		{
			dirt: [0,0]
		})

		Crafty.sprite(100,"src/images/hazards.png",
		{
			hazards: [0,0]
		})
		Crafty.sprite(1409, 479, "src/images/title_logo.png",
		{
			title: [0,0]
		})
		Crafty.sprite(700, 200, "src/images/this_is_jake.png",
		{
			this_is_jake: [0,0]
		})
		Crafty.sprite(2000, 700, "src/images/jake_story.png",{
			jake_story: [0,0]
		})
		Crafty.sprite(2000, 700, "src/images/jake_story_2.png",{
			jake_story_2: [0,0]
		})
		Crafty.sprite(1000, 900, "src/images/controls.png",{
			controls: [0,0]
		})
		Crafty.sprite(2000, 900, "src/images/objective.png",{
			objective: [0,0]
		})
		Crafty.sprite(2000, 900, "src/images/objective_2.png",{
			objective_2: [0,0]
		})
		Crafty.sprite(3000, 2400, "src/images/jakesnightmareover.png",
		{
			over: [0,0]
		})
		Crafty.sprite(200, 200, "src/images/blouse.png",
		{
			house: [0,0]
		})
		Crafty.scene('Start');
	}
 }

var open1_count = 0;
var open2_count = 0;
var isOpen = false;
var isOpen2 = false;
        
  
