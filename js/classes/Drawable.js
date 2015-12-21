"use strict";

class Drawable {
	constructor() {
		this.loaded = true;
	}
	
	loadAsset () {
		var drawable = this;
		return new Promise(function (resolve, reject) {
			if (drawable.loaded) {
				resolve(drawable);
				return;
			}
			
			tileset.image.onload = function() {
				if (!this.complete) {
					throw new Error("Error loading drawable `" + url + "`.");
				}
				
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
