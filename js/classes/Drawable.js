"use strict";

class Drawable {
	constructor (url) {
		if (url) {
			this.assetSrc = url;
		}
		
		this.loaded = false;
		
		this.scale = 1;
		
		this.coords = { x: 0, y: 0, z: 0 };
	}
	
	move (x, y, z) {
		if (typeof this.coords.x !== "undefined") {
			this.coords.x += x;
		}
		else {
			this.coords.cx += x;
		}
		
		if (typeof this.coords.y !== "undefined") {
			this.coords.y += y;
		}
		else {
			this.coords.cy += y;
		}
		
		if (typeof z !== "undefined") {
			if (typeof this.coords.z !== "undefined") {
				this.coords.z += z;
			}
		}
	}
	
	moveTo (coords) {
		if (typeof coords.x === "undefined" && typeof coords.cx === "undefined") {
			throw new TypeError("Coordinates need a `x` or `cx` attribute");
		}
		
		if (typeof coords.y === "undefined" && typeof coords.cy === "undefined") {
			throw new TypeError("Coordinates need a `y` or `cy` attribute");
		}
		
		if (typeof coords.z === "undefined") {
			coords.z = 0;
		}
		
		this.coords = coords;
	}
	
	setScale (scale) {
		this.scale = parseFloat(scale);
	}
	
	load () {
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
				
				drawable.w = this.naturalWidth;
				drawable.h = this.naturalHeight;
				
				resolve(drawable);
			}
		});
	}
	
	draw (ctx, boundingRect) {
		if (!this.loaded) {
			throw new Error('Drawable not loaded');
		}
		
		if (typeof this.coords.x !== "undefined") {
			var destX = this.coords.x;
		}
		else {
			var destX = Math.round(this.coords.cx - ((this.image.naturalWidth / 2) * this.scale));
		}
		
		if (typeof this.coords.y !== "undefined") {
			var destY = this.coords.y;
		}
		else {
			var destY = Math.round(this.coords.cy - ((this.image.naturalHeight / 2) * this.scale));
		}
		
		var srcX = 0;
		var srcY = 0;
		var srcW = this.image.naturalWidth;
		var srcH = this.image.naturalHeight;
		
		if (boundingRect) {
			if (typeof boundingRect.x !== "undefined") {
				srcX = parseInt(boundingRect.x);
			}
			if (typeof boundingRect.y !== "undefined") {
				srcY = parseInt(boundingRect.y);
			}
			if (typeof boundingRect.w !== "undefined") {
				srcW = parseInt(boundingRect.w);
			}
			if (typeof boundingRect.h !== "undefined") {
				srcH = parseInt(boundingRect.h);
			}
		}
		
		ctx.drawImage(this.image, srcX, srcY, srcW, srcH, destX, destY, srcW * this.scale, srcH * this.scale);
	}
}
