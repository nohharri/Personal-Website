numTeddy = 0;
tile = 90;
levelID = 1;
var player1;
var player2;
var boy;
var teddy1;
var teddy2;
var teddy3;
var enemy1;
var tutorial_ID = 0
var scary_music;
var lullaby_music;

scary_music = new Audio ("src/audio/scary.mp3") //document.getElementById("src/audio/scary.mp3");
scary_music.addEventListener('ended', function() {
	    this.currentTime = 0;
	    this.play();
}, false);

Crafty.scene('Start', function() 
{
	tutorial_ID = 0;
	Crafty.e('StartScreen').at(1,2)
	Crafty.e('Title').at(4, 4)
	if (lullaby_music)
		lullaby_music.pause();
	scary_music.play();
	this.bind('GoToJakeIntro', function() {
        Crafty.scene('Jake_Intro');
    });
});

Crafty.scene('Jake_Intro', function() 
{
	tutorial_ID = 1;
	Crafty.e('StartScreen').at(1,2)
	Crafty.e('This_Is_Jake_Text').at(8, 4)
	Crafty.e('Jake_Static').at(10, 7.5)
	this.bind('GoToStory', function() {
        Crafty.scene('Story_1');
    });
});

Crafty.scene('Story_1', function() 
{
	tutorial_ID = 2;
	Crafty.e('StartScreen').at(1,2)
	Crafty.e('Story_1_Text').at(0, 5)
	this.bind('GoToStory2', function() {
        Crafty.scene('Story_2');
    });
});

Crafty.scene('Story_2', function() 
{
	tutorial_ID = 3;
	Crafty.e('StartScreen').at(1,2)
	Crafty.e('Story_2_Text').at(0, 5)
	this.bind('GoToControls', function() {
        Crafty.scene('Controls');
    });
});

Crafty.scene('Controls', function() 
{
	tutorial_ID = 4;
	Crafty.e('StartScreen').at(1,2)
	Crafty.e('Controls_Text').at(5, 0)
	Crafty.e('Door_1_Static').at(-2, 0);
	Crafty.e('Door_2_Static').at(-2, 6);
	this.bind('GoToObjective1', function() {
        Crafty.scene('Objective_1');
    });
});

Crafty.scene('Objective_1', function() 
{
	tutorial_ID = 5;
	Crafty.e('StartScreen').at(1,2)
	Crafty.e('Objective_1_Text').at(0, 3)
	Crafty.e('Teddy_Big').at(11, 9)
	this.bind('GoToObjective2', function() {
        Crafty.scene('Objective_2');
    });
});

Crafty.scene('Objective_2', function() 
{
	tutorial_ID = 6;
	Crafty.e('StartScreen').at(1,2)
	Crafty.e('Objective_2_Text').at(0,2)
	this.bind('GoTo1', function() {
        Crafty.scene('Level_1');
    });
});

Crafty.scene('Level_1', function() {
	open1_count = 0;
	open2_count = 0;
	isOpen = false;
	isOpen2 = false;
	numTeddy = 1;
	levelID = 1;
	 // A 2D array to keep track of all occupied tiles
    var w = Game.map_grid.width;
    var h = Game.map_grid.height;
    //Place some ground on the map
    for (var x = 0; x < w; x++) {
        for (var y = 0; y < h; y++) {
            if (y == h - 1) {
            	Crafty.e('Dirt').at(x,y);
            }
            if (y == h - 2 && x <= 10) {
                Crafty.e('Ground').at(x,y);
            }
            if (y == h - 2 && x > 10) {
            	Crafty.e('Dirt').at(x,y);
            }
            if (y == h - 3 && (x > 10)) {
                Crafty.e('Dirt').at(x,y);
            }
            if (y == h - 4 && (x > 10)) {
                Crafty.e('Ground').at(x,y);
            }
        }
    }
	
    player1 = Crafty.e('Player1')
		.attr({x: 300, y: 1000})
	//Insures Climbing platforms do not cause clipping
	player1.antigravity();
	player1.gravity();
		
	player2 = Crafty.e('Player2')
		.attr({x: 160,  y:1000})
	//Insures Climbing platforms do not cause clipping
	player2.antigravity();
	player2.gravity();

	boy = Crafty.e('Boy')
		.attr({x: 50, y:1000})

	Crafty.e('teddyBears')
		.attr({x: 2000, y: 900})

	this.bind('GoTo2', function() {
		portalCount = 0;
		door1AddressX = 0;
		door1AddressY = 0;
		door2AddressX = 0;
		door2AddressY = 0;
		player1.open = false;
		player2.open = false;
		player1.destroy();
		player2.destroy();
        Crafty.scene('Level_2');
    });
});

Crafty.scene('Level_2', function() {
	open1_count = 0;
	open2_count = 0;
	isOpen = false;
	isOpen2 = false;
	numTeddy = 3;
	levelID = 2;
	player1 = Crafty.e('Player1')
		.attr({x: 300, y: 1000})
	//Insures Climbing platforms do not cause clipping
	player1.antigravity();
	player1.gravity();
		
	player2 = Crafty.e('Player2')
		.attr({x: 160,  y:1000})
	//Insures Climbing platforms do not cause clipping
	player2.antigravity();
	player2.gravity();

	boy = Crafty.e('Boy')
		.attr({x: 0, y: 1000})

	var w = Game.map_grid.width;
    var h = Game.map_grid.height;
	//Place some ground on the map
	for (var x = 0; x < w; x++) {
		for (var y = 0; y < h; y++) {
			//First layer of ground
			if (y == h - 1) {
				Crafty.e('Dirt').at(x, y);
			}
			//Second layer of ground
			if (y == h - 2) {
				Crafty.e('Ground').at(x, y);
			}
			//Third layer of ground
			if (y == h - 3 && x > w - 14) {
				Crafty.e('Dirt').at(x, y);
			}
			if (y == h - 2 && x > w - 14) {
				Crafty.e('Dirt').at(x, y);
			}
			if (y == h - 4 && x > w - 14) {
				Crafty.e('Ground').at(x, y);
			}
			if (y == h - 7 && x < w - 15) {
				Crafty.e('Ground').at(x, y);
			}
			if (y == 6 && x > 14) {
				Crafty.e('Ground').at(x, y);
			}
			//Teddy 1
			if (y == h - 5 && x == w - 2) {
				Crafty.e('teddyBears').at(x,y);
			}
			//Teddy 2
			if (y == h - 8 && x == 2) {
				Crafty.e('teddyBears').at(x,y);
			}
			//Teddy 3
			if (y == 5 && x == w - 2) {
				Crafty.e('teddyBears').at(x,y);
			}
		}
	}
	this.bind('GoTo3', function() {
		portalCount = 0;
		door1AddressX = 0;
		door1AddressY = 0;
		door2AddressX = 0;
		door2AddressY = 0;
		player1.open = false;
		player2.open = false;
		player1.destroy();
		player2.destroy();
        Crafty.scene('Level_3');
    });
});

Crafty.scene('Level_3', function() {
	open1_count = 0;
	open2_count = 0;
	isOpen = false;
	isOpen2 = false;
	numTeddy = 2;
	levelID = 3;
	player1 = Crafty.e('Player1')
		.attr({x: 300, y: 1000})
	//Insures Climbing platforms do not cause clipping
	player1.antigravity();
	player1.gravity();
		
	player2 = Crafty.e('Player2')
		.attr({x: 160,  y:1000})
	//Insures Climbing platforms do not cause clipping
	player2.antigravity();
	player2.gravity();

	boy = Crafty.e('Boy')
		.attr({x: 100, y: 1000})

	var w = Game.map_grid.width;
    var h = Game.map_grid.height;
	//Place some ground on the map
	for (var x = 0; x < w; x++) {
		for (var y = 0; y < h; y++) {
			//First layer of ground
			if (y == h - 1) {
				Crafty.e('Dirt').at(x, y);
			}
			//Second layer of ground
			if (y == h - 2 && (x < 12 || x > 17)) {
				Crafty.e('Ground').at(x, y);
			}
			// Ground underneath the blocker
			if (y == h - 2 && (x == 16 || x == 17)) {
				Crafty.e('Dirt').at(x, y);
			}
			if (y == h - 3 && (x > 6 && x < 12)) {
				Crafty.e('Dirt').at(x, y);
			}
			if (y == h - 2 && (x > 6 && x < 12)) {
				Crafty.e('Dirt').at(x, y);
			}
			if (y == h - 4 && (x > 6 && x < 12)) {
				Crafty.e('Ground').at(x, y);
			}
			//Ground cliff at end
			if (y == 7 && (x > w - 4)) {
				Crafty.e('Ground').at(x, y);
			}
			if (y > 7 && (x > (w - 4))) {
				Crafty.e('Dirt').at(x, y);
			}
			if (y == h - 5 && (x > w - 10 && x < w - 6)) {
				Crafty.e('Ground').at(x, y);
			}
			// Blocker ground for the hazzard
			if (y == h - 3 && x == 16) {
				Crafty.e('Ground').at(x, y);
			}
			if ((y == h - 3 || y == h - 4) && x == 17) {
				Crafty.e('Dirt').at(x, y);
			}
			if (y == h - 5 && x == 17) {
				Crafty.e('Ground').at(x, y);
			}
			//Hazard
			if (y == h - 2 && (x > 11 && x < 16)) {
				Crafty.e('Hazard').at(x, y);
			}
			// Ground below hazzard
			if (y == h - 1 && (x > 11 && x < 16)) {
				Crafty.e('Ground').at(x, y);
			}
			//Teddy
			if (y == h - 5 && x == 9) {
				teddy1 = Crafty.e('teddyBears').at(x,y);
			}
			//Teddy
			if (y == h - 3 && x == w - 8) {
				teddy2 = Crafty.e('teddyBears').at(x,y);
			}
		}
	}
	this.bind('GoTo4', function() {
		portalCount = 0;
		door1AddressX = 0;
		door1AddressY = 0;
		door2AddressX = 0;
		door2AddressY = 0;
		player1.open = false;
		player2.open = false;
		player1.destroy()
		player2.destroy()
        Crafty.scene('Level_4');
    });
});

Crafty.scene('Level_4', function() {
	open1_count = 0;
	open2_count = 0;
	isOpen = false;
	isOpen2 = false;
	numTeddy = 3;
	levelID = 4;
    var w = Game.map_grid.width;
    var h = Game.map_grid.height;
    //Place some ground on the map
    for (var x = 0; x < w; x++) {
        for (var y = 0; y < h; y++) {
        	// First and second and third levels of floor
			if (x < 6 || x > 22) {
				if (y == h - 2 || y == h - 1)
           			Crafty.e('Dirt').at(x,y);
           		else if (y == h - 3)
           			Crafty.e('Ground').at(x,y);
			}
			// Barrier
			if (x == 5 && y == h - 3) 
				Crafty.e('Dirt').at(x,y);
			if (x == 5 && y == h - 4)
				Crafty.e('Ground').at(x,y);
			if (y == h - 2 &&  (x > 5 && x <= 22))
           		Crafty.e('Hazard').at(x,y);
			// Ground below hazards
			if (y == h - 1 && (x > 5 && x <= 22)) 
				Crafty.e('Ground').at(x,y);
			// Platform 1
			if (x > 5 && x < 19 && y == h - 6)
				Crafty.e('Ground').at(x,y);
			// Platform 2
			if (x > 21 && x <= 26 && y == h - 9)
				Crafty.e('Ground').at(x,y);
			// Platform 3
			if (x > 14 && x < 18 && y == h - 11)
				Crafty.e('Ground').at(x,y);
        }
    }
	
    player1 = Crafty.e('Player1')
		.attr({x: 300, y: 650})
	//Insures Climbing platforms do not cause clipping
	player1.antigravity();
	player1.gravity();
		
	player2 = Crafty.e('Player2')
		.attr({x: 160,  y:650})
	//Insures Climbing platforms do not cause clipping
	player2.antigravity();
	player2.gravity();

	boy = Crafty.e('Boy')
	.attr({x: 0, y:650})

	teddy1 = Crafty.e('teddyBears').at(17, h - 7);
	teddy2 = Crafty.e('teddyBears').at(16, h - 12);
	teddy3 = Crafty.e('teddyBears').at(25, h - 10);

	this.bind('GoTo5', function() {
		portalCount = 0;
		door1AddressX = 0;
		door1AddressY = 0;
		door2AddressX = 0;
		door2AddressY = 0;
		player1.open = false;
		player2.open = false;
		player1.destroy()
		player2.destroy()
        Crafty.scene('Level_5');
    });
});

Crafty.scene('Level_5', function() {
	open1_count = 0;
	open2_count = 0;
	isOpen = false;
	isOpen2 = false;
	numTeddy = 3;
	levelID = 5;
    var w = Game.map_grid.width;
    var h = Game.map_grid.height;
    //Place some ground on the map
    for (var x = 0; x < w; x++) {
        for (var y = 0; y < h; y++) {
        	// First and second and thirdlevels of floor
			if (x < 10 || (22 > x && x > 12) || x > 23) {
				if (y == h - 2 || y == h - 1)
           			Crafty.e('Dirt').at(x,y);
           		else if (y == h - 3)
           			Crafty.e('Ground').at(x,y);
			}
			else if (y == h - 2 &&  ((x > 7 && x < 13) || (x > 21 && x < 24))) {
           		Crafty.e('Hazard').at(x,y);					
			}
			// Ground below hazards
			if (y == h - 1 && ((x > 9 && x < 13) || (x > 21 && x < 24))) {
				Crafty.e('Ground').at(x,y);
			}
			//Beginning platform
            if (x == 0 && y > h - 7) {
                ground = Crafty.e('Dirt').at(x,y);
            }
			if (y == h - 7 && x > -1 && x < 4) {
                Crafty.e('Ground').at(x,y);
			}
			if (x == 13 && y == h - 4) {
				Crafty.e('Dirt').at(x,y);
			}
			if (x == 13 && y == h - 5) {
				Crafty.e('Ground').at(x,y);
			}
			if (x == 13 && y == h - 3) {
				Crafty.e('Dirt').at(x,y);
			}
			if (x == 16 && y == h - 7	) {
				Crafty.e('Ground').at(x,y);
			}
            if ((x == 18 || x == 17) && y > h-9) {
                ground = Crafty.e('Dirt').at(x,y);
            }
			if (y == h - 9 && x > 16 && x < 23) {
                Crafty.e('Ground').at(x,y);
			}
			if (y == h - 6 && x > 20)
				Crafty.e('Ground').at(x,y);
			if (y == h - 8 && x == w - 1)
				Crafty.e('Ground').at(x,y);
			if ((y == h - 7 || y == h - 6) && x == w - 1)
				Crafty.e('Dirt').at(x,y);
        }
    }
	
    player1 = Crafty.e('Player1')
		.attr({x: 300, y: 650})
	//Insures Climbing platforms do not cause clipping
	player1.antigravity();
	player1.gravity();
		
	player2 = Crafty.e('Player2')
		.attr({x: 160,  y:650})
	//Insures Climbing platforms do not cause clipping
	player2.antigravity();
	player2.gravity();

	boy = Crafty.e('Boy')
	.attr({x: 0, y:650})

	teddy1 = Crafty.e('teddyBears').at(3, h - 4);
	teddy2 = Crafty.e('teddyBears').at(15, h - 4);
	teddy3 = Crafty.e('teddyBears').at(20, h - 4);

	this.bind('GoTo6', function() {
		portalCount = 0;
		door1AddressX = 0;
		door1AddressY = 0;
		door2AddressX = 0;
		door2AddressY = 0;
		player1.open = false;
		player2.open = false;
		player1.destroy()
		player2.destroy()
        Crafty.scene('Level_6');
    });
});

Crafty.scene('Level_6', function() {
	open1_count = 0;
	open2_count = 0;
	isOpen = false;
	isOpen2 = false;
	numTeddy = 2;
	levelID = 6;
    var w = Game.map_grid.width;
    var h = Game.map_grid.height;
    //Place some ground on the map
    for (var x = 0; x < w; x++) {
        for (var y = 0; y < h; y++) {
            if (y == h - 1)
            	Crafty.e('Dirt').at(x,y);
            if (y == h - 2)
            	Crafty.e('Ground').at(x,y);
         	if ((x == 7 || x == 8) && y == h - 5)
         		Crafty.e('Ground').at(x,y);
         	if ((x == 7 || x == 8) && y < h - 1 && y > h - 5)
         		Crafty.e('Dirt').at(x,y);
         	if ((x == 18 || x == 19) && y == h - 5)
         		Crafty.e('Ground').at(x,y);
         	if ((x == 18 || x == 19) && y < h - 1 && y > h - 5)
         		Crafty.e('Dirt').at(x,y);
         	//Top platform
         	if ((x > 9 && x < 17) && y == h - 8)
         		Crafty.e('Ground').at(x,y);
         	if (x == 13 && y == h - 3)
            	teddy1 = Crafty.e('teddyBears').at(x,y);
            if (x == 13 && y == h - 9)
            	teddy2 = Crafty.e('teddyBears').at(x,y);
            if (x == 12 && y == h - 3) {
            	enemy = Crafty.e('Enemy').at(x,y);
            	enemy.setDirection(1);
            }
            if (x == 12 && y == h - 9) {
            	enemy1 = Crafty.e('Enemy').at(x,y);
            	enemy1.setDirection(1);
            }
            if (x == 9 && y == h - 9) {
            	Crafty.e('Boundary').at(x, y);
            }
            if (x == 17 && y == h - 9) {
            	Crafty.e('Boundary').at(x, y);
            }
        }
    }

    player1 = Crafty.e('Player1')
		.attr({x: 300, y: 650})
	//Insures Climbing platforms do not cause clipping
	player1.antigravity();
	player1.gravity();
		
	player2 = Crafty.e('Player2')
		.attr({x: 160,  y:650})
	//Insures Climbing platforms do not cause clipping
	player2.antigravity();
	player2.gravity();

	boy = Crafty.e('Boy')
	.attr({x: 0, y:1100})

	this.bind('GoTo7', function() {
	portalCount = 0;
	door1AddressX = 0;
	door1AddressY = 0;
	door2AddressX = 0;
	door2AddressY = 0;
	player1.open = false;
	player2.open = false;
	player1.destroy()
	player2.destroy()
    Crafty.scene('Level_7');
    });
});

Crafty.scene('Level_6', function() {
	open1_count = 0;
	open2_count = 0;
	isOpen = false;
	isOpen2 = false;
	numTeddy = 2;
	levelID = 6;
    var w = Game.map_grid.width;
    var h = Game.map_grid.height;
    //Place some ground on the map
    for (var x = 0; x < w; x++) {
        for (var y = 0; y < h; y++) {
            if (y == h - 1)
            	Crafty.e('Dirt').at(x,y);
            if (y == h - 2)
            	Crafty.e('Ground').at(x,y);
         	if ((x > 3 && x < 9) && y == h - 5)
         		Crafty.e('Ground').at(x,y);
         	if ((x > 3 && x < 9) && y < h - 1 && y > h - 5)
         		Crafty.e('Dirt').at(x,y);
         	if ((x == 18 || x == 19) && y == h - 5)
         		Crafty.e('Ground').at(x,y);
         	if ((x == 18 || x == 19) && y < h - 1 && y > h - 5)
         		Crafty.e('Dirt').at(x,y);
         	//Top platform
         	if ((x > 9 && x < 17) && y == h - 8)
         		Crafty.e('Ground').at(x,y);
         	if (x == 13 && y == h - 3)
            	teddy1 = Crafty.e('teddyBears').at(x,y);
            if (x == 13 && y == h - 9)
            	teddy2 = Crafty.e('teddyBears').at(x,y);
            if (x == 12 && y == h - 3) {
            	enemy = Crafty.e('Enemy').at(x,y);
            	enemy.setDirection(1);
            }
            if (x == 12 && y == h - 9) {
            	enemy1 = Crafty.e('Enemy').at(x,y);
            	enemy1.setDirection(1);
            }
            if (x == 9 && y == h - 9) {
            	Crafty.e('Boundary').at(x, y);
            }
            if (x == 17 && y == h - 9) {
            	Crafty.e('Boundary').at(x, y);
            }
        }
    }

    player1 = Crafty.e('Player1')
		.attr({x: 200, y: 950})
	//Insures Climbing platforms do not cause clipping
	player1.antigravity();
	player1.gravity();
		
	player2 = Crafty.e('Player2')
		.attr({x: 100,  y: 950})
	//Insures Climbing platforms do not cause clipping
	player2.antigravity();
	player2.gravity();

	boy = Crafty.e('Boy')
	.attr({x: 0, y:1100})

	this.bind('GoTo7', function() {
		portalCount = 0;
		door1AddressX = 0;
		door1AddressY = 0;
		door2AddressX = 0;
		door2AddressY = 0;
		player1.open = false;
		player2.open = false;
		player1.destroy()
		player2.destroy()
	    Crafty.scene('Level_7');
    });
});

Crafty.scene('Level_7', function() {
	open1_count = 0;
	open2_count = 0;
	isOpen = false;
	isOpen2 = false;
	numTeddy = 3;
	levelID = 7;
    var w = Game.map_grid.width;
    var h = Game.map_grid.height;
    //Place some ground on the map
    for (var x = 0; x < w; x++) {
        for (var y = 0; y < h; y++) {
            if (y == h - 1)
            	Crafty.e('Dirt').at(x,y);
            if (y == h - 2)
            	Crafty.e('Ground').at(x,y);
            // Beginning ledge
            if (x < 7 && y > 11) {
            	Crafty.e('Dirt').at(x,y);
            }
            if (x < 5 && y == 11) {
            	Crafty.e('Ground').at(x,y);
            }
            if (x > 3 && x < 7 && y == 10)
            	Crafty.e('Ground').at(x,y);
            if (x == 4 && y == 11)
            	Crafty.e('Dirt').at(x,y);
            if (x < 7 && x > 4 && y > 10 && y < 12)
            	Crafty.e('Dirt').at(x,y);
         	// Top platform
         	if (x > 17 && x < 25 && y == h - 11)
         		Crafty.e('Ground').at(x,y);
         	// Middle platform
         	if ((x > 13 && x < 21) && y == h - 8)
         		Crafty.e('Ground').at(x,y);
            // Lower platform
            if ((x > 9 && x < 16) && y == h - 5)
         		Crafty.e('Ground').at(x,y);
         	if ((x == 9) && y == h - 6)
         		Crafty.e('Ground').at(x,y);
         	if ((x == 9) && y == h - 5)
         		Crafty.e('Dirt').at(x,y);
            // Teddies
            if (x == 17 && y == h - 12)
            	teddy1 = Crafty.e('teddyBears').at(x,y);
            if (x == 13 && y == h - 9)
            	teddy2 = Crafty.e('teddyBears').at(x,y);
            if (x == 16 && y == h - 6)
            	teddy3 = Crafty.e('teddyBears').at(x,y);
            // Enemies
            if (x == 14 && y == h - 3) {
            	enemy = Crafty.e('Enemy').at(x,y);
            	enemy.setDirection(1);
            }
            if (x == 14 && y == h - 9) {
            	enemy1 = Crafty.e('Enemy').at(x,y);
            	enemy1.setDirection(1);
            }
            if (x == 18 && y == h - 12) {
            	enemy1 = Crafty.e('Enemy').at(x,y);
            	enemy1.setDirection(1);
            }
            if (x == 15 && y == h - 4) {
            	enemy1 = Crafty.e('Enemy').at(x,y);
            	enemy1.setDirection(1);
            }
            // Boundaries
            // Top platform
            if (x == 17 && y == h - 12) {
            	Crafty.e('Boundary').at(x, y);
            }
            if (x == 25 && y == h - 12) {
            	Crafty.e('Boundary').at(x, y);
            }
            // Middle platform
            if (x == 13 && y == h - 9) {
            	Crafty.e('Boundary').at(x, y);
            }
            if (x == 21 && y == h - 9) {
            	Crafty.e('Boundary').at(x, y);
            }
            // Lower platform
            if (x == 16 && y == h - 6) {
            	Crafty.e('Boundary').at(x, y);
            }
        }
    }

    player1 = Crafty.e('Player1')
		.attr({x: 200, y: 700})
	//Insures Climbing platforms do not cause clipping
	player1.antigravity();
	player1.gravity();
		
	player2 = Crafty.e('Player2')
		.attr({x: 50,  y: 700})
	//Insures Climbing platforms do not cause clipping
	player2.antigravity();
	player2.gravity();

	boy = Crafty.e('Boy')
	.attr({x: 120, y: 700})

	this.bind('GoTo8', function() {
		portalCount = 0;
		door1AddressX = 0;
		door1AddressY = 0;
		door2AddressX = 0;
		door2AddressY = 0;
		player1.open = false;
		player2.open = false;
		player1.destroy()
		player2.destroy()
	    Crafty.scene('Level_8');
    });
});

Crafty.scene('Level_8', function() {
	open1_count = 0;
	open2_count = 0;
	isOpen = false;
	isOpen2 = false;
	numTeddy = 3;
	levelID = 8;
    var w = Game.map_grid.width;
    var h = Game.map_grid.height;
    //Place some ground on the map
    for (var x = 0; x < w; x++) {
        for (var y = 0; y < h; y++) {
        	// Base ground
            if (y == h - 1)
            	Crafty.e('Dirt').at(x,y);
            if (x == 14 && y == h - 2)
            	Crafty.e('Dirt').at(x,y);
            if ((x < 12 || x > 14) && y == h - 2)
            	Crafty.e('Ground').at(x,y);

            // Hazard
            if ((x == 13 || x == 12) && y == h - 2)
				Crafty.e('Hazard').at(x,y);

            // Safety pit
            if (x > -1 && x < 5 && y == 8)
            	Crafty.e('Ground').at(x,y);
            if ((x == 6 || x == 5) && y == 7)
            	Crafty.e('Ground').at(x,y);

            // Middle Collumns
            if ((x == 11 || x == 15) && (y > 3 && y < (h - 4)))
            	Crafty.e('Dirt').at(x,y);
            // Longer right side
            if (x == 15 && y > h - 5)
            	Crafty.e('Dirt').at(x,y); 
            // Lower side thing
            if ((x > 7 && x < 11) && y == h - 5)
            	Crafty.e('Ground').at(x,y);
            // Upper side thing
            if ((x > 8 && x < 11) && y == h - 10)
            	Crafty.e('Ground').at(x,y);
            if ((x == 11 || x == 15) && y == 3)
            	Crafty.e('Ground').at(x,y);
            if (x == 12 && y == 3)
            	Crafty.e('Ground').at(x,y);
            // Bump inside right
            if (x == 14 && y == 6)
            	Crafty.e('Ground').at(x,y);
            if (x == 12 && y == 9)
            	Crafty.e('Ground').at(x,y);
           	// Upper right side thing
           	if (x > 15 && x < 19 && y == 3)
           		Crafty.e('Ground').at(x,y);
           	// Bottom bump inside 
           	if (x == 14 && y == h - 3)
           		Crafty.e('Ground').at(x,y);

           	// Teddies
           	if (x == 3 && y == 7)
           		teddy1 = Crafty.e('teddyBears').at(x,y);
           	if (x == 12 && y == 8)
           		teddy2 = Crafty.e('teddyBears').at(x,y);
           	if (x == 20 && y == 7)
           		teddy3 = Crafty.e('teddyBears').at(x,y);

           	// Enemy
           	if (x == 17 && y == h - 3) {
           		enemy = Crafty.e('Enemy').at(x,y);
           		enemy.setDirection(1);
           	}

           	if (x == 25 && y == h - 3)
           		Crafty.e('Boundary').at(x,y);
        }
    }

    player1 = Crafty.e('Player1')
		.attr({x: 200, y: 1000})
	//Insures Climbing platforms do not cause clipping
	player1.antigravity();
	player1.gravity();
		
	player2 = Crafty.e('Player2')
		.attr({x: 50,  y: 1000})
	//Insures Climbing platforms do not cause clipping
	player2.antigravity();
	player2.gravity();

	boy = Crafty.e('Boy')
	.attr({x: 20, y: 1000})

	Crafty.e('House').attr({x: 2150, y: 660})

	this.bind('GoToEnd', function() {
		portalCount = 0;
		door1AddressX = 0;
		door1AddressY = 0;
		door2AddressX = 0;
		door2AddressY = 0;
		player1.open = false;
		player2.open = false;
		player1.destroy()
		player2.destroy()
	    Crafty.scene('End');
    });
});

Crafty.scene('End', function() {
	Crafty.e('Over').at(5, 1);
	Crafty.e('EndScreen').at(1,2);
	Crafty.background('#000000 url() no-repeat center center');
	if (scary_music)
		scary_music.pause();
	lullaby_music = document.getElementById("lullaby_id");
	lullaby_music.play();
	this.bind('GoToStart', function() {
        Crafty.scene('Start');
    });
});
