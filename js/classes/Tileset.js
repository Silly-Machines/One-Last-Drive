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
		
		return super.load().then(function () {
			if (!tileset.tileW) {
				tileset.tileW = tileset.image.naturalWidth;
			}
			
			if (!tileset.tileH) {
				tileset.tileH = tileset.image.naturalHeight;
			}
			
			tileset.tilesPerRow = tileset.image.naturalWidth / tileset.tileW;
		});
	}
	
	drawTile (nb, ctx) {
		if (!this.loaded) {
			throw new Error('Tileset not loaded');
		}
		
		var tileSrcX = nb % this.tilesPerRow;
		
		if(tileSrcX === 0) {
			tileSrcX = this.tilesPerRow;
		}
		
		var tileSrcY = Math.ceil(nb / this.tileH);
		
		var xSource = (tileSrcX - 1) * this.tileW;
		var ySource = (tileSrcY - 1) * this.tileH;
		
		super.draw(ctx, { x: xSource, y: ySource, w: this.tileW, h: this.tileH });
	}
}
