
numTeddy = 0;
tile = 90;
levelID = 1;
var player1;
var player2;
var boy;

Crafty.scene('Start', function() {
	Crafty.e('StartScreen')
		.attr({x: 300, y: 300})
	this.bind('GoTo1', function() {
        Crafty.scene('Level_1');
    });
});

Crafty.scene('Level_1', function() {
	numTeddy = 1;
	 // A 2D array to keep track of all occupied tiles
    var w = Game.map_grid.width;
    var h = Game.map_grid.height;
    //Place some ground on the map
    for (var x = 0; x < w; x++) {
        for (var y = 0; y < h; y++) {
            if (y == h - 1 || y == h - 2) {
                Crafty.e('Ground').at(x,y);
            }
            if (y == h - 3 && (x > 10)) {
                Crafty.e('Ground').at(x,y);
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
				Crafty.e('Ground').at(x, y);
			}
			//Second layer of ground
			if (y == h - 2) {
				Crafty.e('Ground').at(x, y);
			}
			//Third layer of ground
			if (y == h - 3 && x > w - 14) {
				Crafty.e('Ground').at(x, y);
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
				Crafty.e('Ground').at(x, y);
			}
			//Second layer of ground
			if (y == h - 2 && (x < 12 || x > 15)) {
				Crafty.e('Ground').at(x, y);
			}
			if (y == h - 3 && (x > 6 && x < 12)) {
				Crafty.e('Ground').at(x, y);
			}
			if (y == h - 4 && (x > 6 && x < 12)) {
				Crafty.e('Ground').at(x, y);
			}
			//Ground
			if (y > 6 && (x > w - 4)) {
				Crafty.e('Ground').at(x, y);
			}

			if (y == h - 5 && (x > w - 10 && x < w - 6)) {
				Crafty.e('Ground').at(x, y);
			}
			if (y == h - 6 && (x == w - 10)) {
				Crafty.e('Ground').at(x, y);
			}
			if (y == h - 3 && (x == 16)) {
				Crafty.e('Ground').at(x, y);
			}
			//Hazard
			if (y == h - 2 && (x > 11 && x < 16)) {
				Crafty.e('Hazard').at(x, y);
			}
			//Teddy
			if (y == h - 5 && x == 9) {
				Crafty.e('teddyBears').at(x,y);
			}
			//Teddy
			if (y == h - 6 && x == w - 8) {
				Crafty.e('teddyBears').at(x,y);
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
	numTeddy = 3;
	levelID = 4;
    var w = Game.map_grid.width;
    var h = Game.map_grid.height;
    //Place some ground on the map
    for (var x = 0; x < w; x++) {
        for (var y = 0; y < h; y++) {
            if ((y == h - 1 || y == h - 2)) {
				if ( x < 10 || (22 > x && x > 12) || x > 23) {
               		Crafty.e('Ground').at(x,y);
				}
				else if (y == h -1 &&  ((x > 7 && x < 13) || (x > 21 && x < 24))){
               		Crafty.e('Hazard').at(x,y);					
				}
            }
            if (x == 0 && y > h-7) {
                ground = Crafty.e('Ground').at(x,y);
            }
			if (y < h -5 && y > h-8 && x > -1 && x < 4) {
                Crafty.e('Ground').at(x,y);
			}

			if (x > 12 && x < 15 && y == h-5) {
                Crafty.e('Ground').at(x,y);
			}

            if ((x == 18 || x == 17) && y > h-9) {
                ground = Crafty.e('Ground').at(x,y);
            }
			if (y < h - 7 && y > h-9 && x > 17 && x < 23) {
                Crafty.e('Ground').at(x,y);
			}
			if ( y == h-5 && x > 20)
			  ground = Crafty.e('Ground').at(x,y);
			if (x == 26 && y < h -4)
			  ground = Crafty.e('Ground').at(x,y);
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

	Crafty.e('teddyBears')
	.attr({x:200,y:1050})
	Crafty.e('teddyBears')
	.attr({x:1800,y:1050})
	Crafty.e('teddyBears')
	.attr({x:1200,y:850})

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
	numTeddy = 3;
	levelID = 5;
    var w = Game.map_grid.width;
    var h = Game.map_grid.height;
    //Place some ground on the map
    for (var x = 0; x < w; x++) {
        for (var y = 0; y < h; y++) {
            if ((y == h - 1 || y == h - 2)) {
				if (18 >= x || x >= 23) {
               		Crafty.e('Ground').at(x,y);
				}
				else if (y == h -1 && (x >= 19 && x <= 24)){
               		Crafty.e('Hazard').at(x,y);					
				}
            }
				if  (y == h - 5 && x >= 3 && x <= 7) {
               		Crafty.e('Ground').at(x,y);
				}
				if  (y == h - 7 && x >= 12 && x <= 17) {
               		Crafty.e('Ground').at(x,y);
				}
				if (y == h - 8 && x == 12)
               		Crafty.e('Ground').at(x,y);
				if (y == h - 6 && x == 7)
               		Crafty.e('Ground').at(x,y);
        }
    }


	Crafty.e('Boundary').attr({x:19*tile,y:12*tile,h:tile,w:tile})
	Crafty.e('Boundary').attr({x:18*tile,y:7*tile,h:tile,w:tile})
	Crafty.e('Boundary').attr({x:7*tile,y:12*tile,h:tile,w:tile})
	Crafty.e('Enemy').attr({x:12*tile,y:13*tile}).setDirection(1);
	Crafty.e('Enemy').attr({x:14*tile,y:7*tile}).setDirection(-1);
	
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

	Crafty.e('teddyBears')
	.attr({x:tile*14,y:tile*12})
	Crafty.e('teddyBears')
	.attr({x:6*tile,y:9*tile})
	Crafty.e('teddyBears')
	.attr({x:24*tile,y:8*tile})

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

// Crafty.scene('Level_6', function() {
//     numTeddy = 3;
//     levelID = 6;
//     var w = Game.map_grid.width;
//     var h = Game.map_grid.height;
//     //Place some ground on the map
//     for (var x = 0; x < w; x++) {
//         for (var y = 0; y < h; y++) {
//             if ((y == h - 1 || y == h - 2)) {
//                 if (9 >= x || x >= 23) {
//                        Crafty.e('Ground').at(x,y);
//                 }
//                 else if (y == h -1 && (x >= 9 && x <= 22)){
//                        Crafty.e('Hazard').at(x,y);                    
//                 }
//             }
//             if (y <= h - 3 && y >= h - 4 && x >= 5 && x <= 7)
//                        Crafty.e('Ground').at(x,y);
        
//             if (y == h - 6 && (x >= 10 && x <= 22)) {
//                        Crafty.e('Ground').at(x,y);
//             }

//             if (y == h - 9 && (x >= 12 && x <= 15)) {
//                        Crafty.e('Ground').at(x,y);
//             }

//             if (y == h - 8 && (x >= 15 && x <= 18)) {
//                        Crafty.e('Ground').at(x,y);
//             }

//             if (x == 15 && (y >= h - 11 && y <= h -2)) {
//                        Crafty.e('Ground').at(x,y);
//             }
//             if (x == 15 && y == h -12) {
//                        Crafty.e('Hazard').at(x,y);                    
//             }
//         }
//     }
//     this.bind('GoTo7', function() {
// 	portalCount = 0;
// 	door1AddressX = 0;
// 	door1AddressY = 0;
// 	door2AddressX = 0;
// 	door2AddressY = 0;
// 	player1.open = false;
// 	player2.open = false;
// 	player1.destroy()
// 	player2.destroy()
//     Crafty.scene('Level_7');
//     });
// })

Crafty.scene('Level_7', function() {
    levelID = 7;
    var w = Game.map_grid.width;
    var h = Game.map_grid.height;
    //Place some ground on the map
    for (var x = 0; x < w; x++) {
        for (var y = 0; y < h; y++) {
            if  (y == h - 10 && x >= 4 && x <= 7) {
                   Crafty.e('Ground').at(x,y);
            }        
            if  (y == h - 8 && x >= 4 && x <= 7) {
                   Crafty.e('Ground').at(x,y);
            }        
            if  (y == h - 6 && x >= 4 && x <= 7) {
                   Crafty.e('Ground').at(x,y);
            }
            if  (y == h - 10 && x >= 10 && x <= 14) {
                   Crafty.e('Ground').at(x,y);
            }    

            if  (y == h - 10 && x >= 17 && x <= 19) {
                   Crafty.e('Ground').at(x,y);
            }    

            if  (y == h - 6 && x >= 17 && x <= 19) {
                   Crafty.e('Ground').at(x,y);
            }    

            if (x == 4 && (y >= h - 10 && y <= h -6)) {
                       Crafty.e('Ground').at(x,y);
            }    

            if (x == 10 && (y >= h - 10 && y <= h -6)) {
                       Crafty.e('Ground').at(x,y);
            }    
                

            if (x == 14 && (y >= h - 10 && y <= h -6)) {
                       Crafty.e('Ground').at(x,y);
            }    

            if (x == 17 && (y >= h - 10 && y <= h -6)) {
                       Crafty.e('Ground').at(x,y);
            }

            if (x == 20 && (y >= h - 9 && y <= h -7)) {
                       Crafty.e('Ground').at(x,y);
            }    
        }
    }
});
