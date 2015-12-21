"use strict";

class Drawable {
	constructor() {
		this.loaded = false;
	}
	
	loadAsset (url) {
		var drawable = this;
		
		this.image = new Image();
		this.image.drawableRef = this;
		
		return new Promise(function (resolve, reject) {
			if (drawable.loaded) {
				resolve(drawable);
				return;
			}
			
			tileset.image.onload = function() {
				if (!this.complete) {
					throw new Error("Error loading drawable `" + url + "`.");
				}
				
				drawable.loaded = true;
				
				resolve(drawable);
			}
		});
	}
	
	draw () {
		if (!this.loaded) {
			throw new Error('Drawable not loaded');
		}
	}
}
