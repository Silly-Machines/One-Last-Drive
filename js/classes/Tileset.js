"use strict";

class Tileset extends Drawable {
	constructor (url, tileW, tileH) {
		super(url);
		
		this.loaded = false;
		
		this.tileW = tileW;
		this.tileH = tileH || tileW;
	}
	
	load () {
		var tileset = this;
		
		return this.loadImage().then(function () {
			if (!tileset.tileW) {
				tileset.tileW = tileset.image.naturalWidth;
			}
			
			if (!tileset.tileH) {
				tileset.tileH = tileset.image.naturalHeight;
			}
			
			tileset.tilesPerRow = tileset.image.naturalWidth / tileset.tileW;
		});
	}
	
	drawTile (nb, ctx, destX, destY) {
		if (!this.loaded) {
			throw new Error('Tileset not loaded');
		}
		
		if (destX === undefined) {
			destX = 0;
		}
		if (destY === undefined) {
			destY = 0;
		}
		
		var tileSrcX = nb % this.tilesPerRow;
		
		if(tileSrcX === 0) {
			tileSrcX = this.tilesPerRow;
		}
		
		var tileSrcY = Math.ceil(nb / this.tileH);
		
		var xSource = (tileSrcX - 1) * this.tileW;
		var ySource = (tileSrcY - 1) * this.tileH;
		
		ctx.drawImage(this.image, xSource, ySource, this.tileW, this.tileH, destX, destY, this.tileW, this.tileH);
	}
}
