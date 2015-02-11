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
		Crafty.background('url(src/images/background_new.png) no-repeat center center');
		//Crafty.background("url('path/to/image.png')");

		Crafty.sprite(100, "src/images/boy_sprite_walking.png",
		{
			boy: [0, 0]
		});

		Crafty.sprite(100, "src/images/enemy_sprite.png",
		{
			enemy: [0, 0]
		});

		Crafty.sprite(100, "src/images/teddy.png",
		{
			teddy: [0, 0]
		})

		Crafty.sprite(100, 200, "src/images/door_1_sprite.png",
		{
			door1: [0, 0]
		})

		Crafty.sprite(100, 200, "src/images/door_2_sprite.png",
		{
			door2: [0, 0]
		})

		Crafty.sprite(100, "src/images/tile_regular.png",
		{
			tile: [0,0]
		})

		Crafty.sprite(100,"src/images/hazards.png",
		{
			hazards: [0,0]
		})
		Crafty.sprite(1409,"src/images/title_logo.png",
		{
			title: [0,0]
		})
		Crafty.scene('Start');
	}
 }

var open1_count = 0;
var open2_count = 0;
var isOpen = false;
var isOpen2 = false;
        
  
