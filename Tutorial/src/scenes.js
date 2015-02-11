// Game scene
// -------------
// Runs the core gameplay loop
Crafty.scene('Game', function() {
  // A 2D array to keep track of all occupied tiles
  this.occupied = new Array(Game.map_grid.width);
  for (var i = 0; i < Game.map_grid.width; i++) {
    this.occupied[i] = new Array(Game.map_grid.height);
    for (var y = 0; y < Game.map_grid.height; y++) {
      this.occupied[i][y] = false;
    }
  }

  // Player character, placed at 5, 5 on our grid
  this.player = Crafty.e('PlayerCharacter').at(5, 5);
  this.occupied[this.player.at().x][this.player.at().y] = true;

  // Place a tree at every edge square on our grid of 16x16 tiles
  for (var x = 0; x < Game.map_grid.width; x++) {
    for (var y = 0; y < Game.map_grid.height; y++) {
      var at_edge = x == 0 || x == Game.map_grid.width - 1 || y == 0 || y == Game.map_grid.height - 1;

      if (at_edge) {
        // Place a tree entity at the current tile
        Crafty.e('Tree').at(x, y)
        this.occupied[x][y] = true;
      } else if (Math.random() < 0.06 && !this.occupied[x][y]) {
        // Place a bush entity at the current tile
        var bush_or_rock = (Math.random() > 0.3) ? 'Bush' : 'Rock'
        Crafty.e(bush_or_rock).at(x, y)
        this.occupied[x][y] = true;
      }
    }
  }

  // Generate five villages on the map in random locations
  var max_villages = 5;
  for (var x = 0; x < Game.map_grid.width; x++) {
    for (var y = 0; y < Game.map_grid.height; y++) {
      if (Math.random() < 0.03) {
        if (Crafty('Village').length < max_villages && !this.occupied[x][y]) {
          Crafty.e('Village').at(x, y);
        }
      }
    }
  }

  // Play a ringing sound to indicate the start of the journey
  Crafty.audio.play('ring');

  // Show the victory screen once all villages are visisted
  this.show_victory = this.bind('VillageVisited', function() {
    if (!Crafty('Village').length) {
      Crafty.scene('Victory');
    }
  });
}, function() {
  // Remove our event binding from above so that we don't
  //  end up having multiple redundant event watchers after
  //  multiple restarts of the game
  this.unbind('VillageVisited', this.show_victory);
});


// Victory scene
// -------------
// Tells the player when they've won and lets them start a new game
Crafty.scene('Victory', function() {
  // Display some text in celebration of the victory
  Crafty.e('2D, DOM, Text')
    .text('All villages visited!')
    .attr({ x: 0, y: Game.height()/2 - 24, w: Game.width() })
    .textFont($text_css);

  // Give'em a round of applause!
  Crafty.audio.play('applause');

  // After a short delay, watch for the player to press a key, then restart
  // the game when a key is pressed
  var delay = true;
  setTimeout(function() { delay = false; }, 5000);
  this.restart_game = function() {
    if (!delay) {
      Crafty.scene('Game');
    }
  };
  Crafty.bind('KeyDown', this.restart_game);
}, function() {
  // Remove our event binding from above so that we don't
  //  end up having multiple redundant event watchers after
  //  multiple restarts of the game
  this.unbind('KeyDown', this.restart_game);
});

// Loading scene
// -------------
// Handles the loading of binary assets such as images and audio files
Crafty.scene('Loading', function(){
  // Draw some text for the player to see in case the file
  //  takes a noticeable amount of time to load
  console.log('Hey1');
  Crafty.e('2D, DOM, Text')
    .text('Loading; please wait...')
    .attr({ x: 0, y: Game.height()/2 - 24, w: Game.width() })
    .textFont($text_css);

    console.log('Hey0');
      // toLoad.push("C:/Users/James/Documents/GitHub/Turkey Game Jam/assets/16x16_forest_2.gif");
      // toLoad.push("C:/Users/James/Documents/GitHub/Turkey Game Jam/assets/hunter.png");
      // toLoad.push("C:/Users/James/Documents/GitHub/Turkey Game Jam/assets/door_knock_3x.mp3");
      // toLoad.push("C:/Users/James/Documents/GitHub/Turkey Game Jam/assets/door_knock_3x.ogg");
      // toLoad.push("C:/Users/James/Documents/GitHub/Turkey Game Jam/assets/door_knock_3x.aac");
      // toLoad.push("C:/Users/James/Documents/GitHub/Turkey Game Jam/assets/board_room_applause.mp3");
      // toLoad.push("C:/Users/James/Documents/GitHub/Turkey Game Jam/assets/board_room_applause.ogg");
      // toLoad.push("C:/Users/James/Documents/GitHub/Turkey Game Jam/assets/board_room_applause.aac");
      // toLoad.push("C:/Users/James/Documents/GitHub/Turkey Game Jam/assets/candy_dish_lid.mp3");
      // toLoad.push("C:/Users/James/Documents/GitHub/Turkey Game Jam/assets/candy_dish_lid.ogg");
      // toLoad.push("C:/Users/James/Documents/GitHub/Turkey Game Jam/assets/candy_dish_lid.aac");
      // Define our sounds for later use
var assetsObj = {
    "audio": {
        "beep": ["beep.wav", "beep.mp3", "beep.ogg"],
        "boop": "boop.wav",
        "slash": "slash.wav"
    },
    "images": ["badguy.bmp", "goodguy.png"],
    "sprites": {
        "animals.png": {
            "tile": 50,
            "tileh": 40,
            "paddingX": 5,
            "paddingY": 5,
            "paddingAroundBorder": 10,
            "map": { "ladybug": [0,0], "lazycat": [0,1], "ferociousdog": [0,2] }
        },
        "vehicles.png": {
            "tile": 150,
            "tileh": 75,
            "map": { "car": [0,0], "truck": [0,1] }
        }
    },
};

  // Load our sprite map image
  Crafty.load(toLoad, 
    function()
    {
    // Once the images are loaded...
    console.log('Hey');
    // Define the individual sprites in the image
    // Each one (spr_tree, etc.) becomes a component
    // These components' names are prefixed with "spr_"
    //  to remind us that they simply cause the entity
    //  to be drawn with a certain sprite
    // Now that our sprites are ready to draw, start the game
    Crafty.scene('Game');
  });
});