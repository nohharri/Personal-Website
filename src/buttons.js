Crafty.c('replayButton', {
	init: function() {
		this.requires('2D, Canvas, Color, Mouse') 
			.attr({x:20,y:500,w:50,h:40})
			.color('red')
			.bind('Click', function(MouseEvent) {			
				player1.open = false;
				player2.open = false;
				player1.destroy()
				player2.destroy()
				//Crafty.trigger('GoTo3', this);
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
					Crafty.e('Boy')
					.attr({x: 100, y: 1000})
				this.destroy();
			})
			.bind('MouseOut', function(e) {
				this.color('red');
			})
			.bind('MouseOver', function(e) {
				this.color('blue');
			})
			.bind('MouseUp', function(e) {
				this.color('red');
			})
			.bind('MouseDown', function(e) {
				this.color('green');
			})
	}
});

Crafty.c('endButton', {
	init: function() {
		this.requires('2D, Canvas, Color, Mouse')
			.attr({x:2300,y:500,w:50,h:40})
			.color('blue')
			.bind('Click', function(MouseEvent) {	
				levelID = 0;
				this.destroy();
				Crafty.scene('Start')
			})
	}
});