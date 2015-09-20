numTeddy = 0;

Crafty.c("teddyBears", {
	init: function() {
		this.numBears += 1;
		numTeddy += 0;
		this.requires('Actor, teddy, Collision')
			.attr({w:100,h:100})
			.getTeddy();
	},

	getTeddy: function() {
		this.onHit('Boy', this.destroyTeddy);
		return this;
	},

	destroyTeddy: function() {
		this.numBears -= 1;
		numTeddy -= 1;
		tick.play();
		this.destroy();
	}
});
