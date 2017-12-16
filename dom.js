var common = require("./common");

Element.prototype.toggle = function () {
	this.style.display = this.style.display == 'none' ? '' : 'none';
	return this;
}

Element.prototype.hide = function() {
	this.style.display = "none";
	return this;
};

Element.prototype.clear = function() {
	while (this.firstChild) {
		this.removeChild(myNode.firstChild);
	}
	return this;
};

function insertWith(w) {
	return function() {
		var t = this;
		Array.from(arguments).deepForEach(function(a) {
			t[w](a.constructor === String ? textNode(a) : a);
		});
		return t;
	}
}

Element.prototype.append = insertWith("appendChild");
Element.prototype.prepend = insertWith("insertBefore");

Element.prototype.replace = function() {
	this.clear().append.apply(this, Array.from(arguments).deepFlatten());
};
Text.prototype.replace = function(str) {
	var n = textNode(str);
	this.replaceWith(n);
	return n;
};

function node(type, attrs, children) {
	var node = document.createElement(type);
	for (var key in attrs) {
		var val = attrs[key];
		node[key] = attrs[key];
	}
	children.forEach(function(child) {
		node.appendChild(child);
	});
	return node;
}

// has to be a separate function because `document` isn't available in node.js
function textNode(text) {
	return document.createTextNode(text);
}

function doc(node) {
	var d = document.body;
	d.innerHtml = "";
}

module.exports = common.root.bind(null, node, textNode);
