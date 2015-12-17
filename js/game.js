(function () {
	"use strict";

	var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '', {
		preload: preload,
		create: create,
		update: update
	});

	function preload () {
		game.load.image('voiture', 'assets/images/tesla-model-x-rear.png');
	}

	function create () {
		game.physics.startSystem(Phaser.Physics.ARCADE);
		
	    var player = game.add.sprite(game.world.width / 2 - 450, game.world.height - 820, 'voiture');

	    game.physics.arcade.enable(player);

	    // player.animations.add('left', [0, 1, 2, 3], 10, true);
	    // player.animations.add('right', [5, 6, 7, 8], 10, true);
	}

	function update () {
		
	}
})();
