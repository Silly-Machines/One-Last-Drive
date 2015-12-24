"use strict";

class Tileset extends Drawable {
	constructor (url, tileW, tileH) {
		super(url);
		
		this.loaded = false;
		
		this.tileW = tileW;
		this.tileH = tileH || tileW;
		
		this.tiles = [];
	}
	
	load () {
		var tileset = this;
		
		return super.load().then(function () {
			if (!tileset.tileW) {
				tileset.tileW = tileset.image.naturalWidth;
			}
			
			if (!tileset.tileH) {
				tileset.tileH = tileset.image.naturalHeight;
			}
			
			tileset.tilesPerRow = tileset.image.naturalWidth / tileset.tileW;
			tileset.tilesRows = tileset.image.naturalHeight / tileset.tileH;
			
			var nb = 0;
			
			for (var y = 0; y < tileset.image.naturalHeight; y += tileset.tileH) {
				for (var x = 0; x < tileset.image.naturalWidth; x += tileset.tileW) {
					tileset.tiles[nb] = new Tile(tileset, x, y, tileset.tileW, tileset.tileH);
					nb++;
				}
			}
		});
	}
	
	getTile (nb) {
		if (!nb instanceof Number) {
			throw new TypeError("Invalide tile number");
		}
		if (!this.tiles[nb]) {
			throw new RangeError("Tile number `" + nb + "` doesn't exist");
		}
	}
	
	drawTile (nb, ctx) {
		if (!this.loaded) {
			throw new Error("Tileset not loaded");
		}
		
		var tile = this.getTile(nb);
		
		tile.draw(ctx);
	}
}
