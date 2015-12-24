"use strict";

class Tile extends Drawable {
	constructor (tileset, x, y, w, h) {
		this.tileset = tileset;
		
		this.x = x || 0;
		this.y = y || 0;
		this.w = w || 0;
		this.h = h || 0;
		
		this.loaded = tileset.loaded;
	}
	
	draw (ctx) {
		super.draw(ctx, { x: this.x, y: this.y, w: this.w, h: this.h });
	}
}
