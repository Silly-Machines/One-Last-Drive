"use strict";

class Drawable {
	constructor (url) {
		if (url) {
			this.assetSrc = url;
		}
		
		this.loaded = false;
	}
	
	loadImage () {
		var drawable = this;
		
		this.image = new Image();
		this.image.drawableRef = this;
		this.image.src = this.assetSrc;
		
		return new Promise(function (resolve, reject) {
			if (drawable.loaded) {
				resolve(drawable);
				return;
			}
			
			drawable.image.onload = function() {
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
