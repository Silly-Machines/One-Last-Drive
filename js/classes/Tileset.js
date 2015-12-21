"use strict";

class Tileset extends Drawable {
	constructor(url, tileW, tileH) {
		super();
		
		this.image = new Image();
		this.image.tilesetRef = this;
		
		this.loaded = false;
		
		this.tileW = tileW;
		this.tileH = tileH || tileW;
		
		this.image.src = url;
	}
	
	load () {
		var tileset = this;
		return new Promise(function (resolve, reject) {
			if (tileset.loaded) {
				resolve(tileset);
				return;
			}
			
			tileset.image.onload = function() {
				if (!this.complete) {
					throw new Error("Error loading tileset `" + url + "`.");
				}
				
				if (!this.tilesetRef.tileW) {
					this.tilesetRef.tileW = this.naturalWidth;
				}
				
				if (!this.tilesetRef.tileH) {
					this.tilesetRef.tileH = this.naturalHeight;
				}
				
				this.tilesetRef.tilesPerRow = this.width / this.tilesetRef.tileW;
				
				tileset.loaded = true;
				
				resolve(tileset);
			}
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
