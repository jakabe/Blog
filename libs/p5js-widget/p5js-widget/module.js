module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		module.children = [];
		module.webpackPolyfill = 1;
	}
	return module;
}



/*****************
 ** WEBPACK FOOTER
 ** (webpack)/buildin/module.js
 ** module id = 161
 ** module chunks = 0
 **/