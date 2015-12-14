(function () {
	"use strict";
	
	var G = {
		canvas: document.getElementById("game-canvas")
	};
	G.canvas.width = document.body.clientWidth;
	G.canvas.height = document.body.clientHeight;
	G.ctx = G.canvas.getContext("2d");
	
	G.setCanvasDimensions = function () {
		G.w = G.canvas.width;
		G.w_p = G.w / 100;
		G.h = G.canvas.height;
		G.h_p = G.h / 100;
	}
	
	G.setCanvasDimensions();
	window.addEventListener("resize", G.setCanvasDimensions, false);
	
	G.redraw = function () {
		G.ctx.clearRect(0, 0, G.w, G.h);
		
		G.ctx.fillStyle = "red";
		G.ctx.fillRect(0, 0, G.w, G.h);
		
		for (var id in G.tilesets) {
			G.tilesets[id].drawTile(1, G.ctx);
		}
		
		requestAnimationFrame(G.redraw);
	}
	
	G.tilesets = {};
	
	G.registerTileset = function (id, src, tileW, tileH) {
		G.tilesets[id] = new Tileset(src, tileW, tileH);
		return G.tilesets[id];
	}
	G.getTileset = function (id) {
		return G.tilesets[id];
	}
	
	G.loadAssets = function (assets) {
		var loaders = [];
		
		assets.forEach(function (asset) {
			loaders.push(asset.load());
		})
		
		return Promise.all(loaders);
	}
	
	G.loadAssets([
		G.registerTileset("voiture", "assets/images/tesla-model-x-rear.png")
	]).then(function () {
		requestAnimationFrame(G.redraw);
	});
	
	console.dir(G);
})();
