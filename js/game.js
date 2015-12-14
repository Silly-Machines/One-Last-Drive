(function () {
	"use strict";
	
	var G = {
		canvas: document.getElementById("game-canvas")
	};
	G.canvas.width = document.body.clientWidth;
	G.canvas.height = document.body.clientHeight;
	G.ctx = G.canvas.getContext("2d");
	
	setCanvasDimensions();
	window.addEventListener("resize", setCanvasDimensions, false);
	console.dir(G);
	
	var voiture = new Tileset("assets/images/tesla-model-x-rear.png");
	
	voiture.loadImage();
	
	function setCanvasDimensions () {
		G.w = G.canvas.width;
		G.w_p = G.w / 100;
		G.h = G.canvas.height;
		G.h_p = G.h / 100;
	}
	
	function redraw () {
		G.ctx.fillStyle = "red";
		G.ctx.fillRect(0, 0, G.w, G.h);
		
		voiture.drawTile(1, G.ctx);
		
		requestAnimationFrame(redraw);
	}
	
	requestAnimationFrame(redraw);
})();
