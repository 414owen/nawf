var common = require("./common");


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

module.exports = common.root.bind(null, node, textNode);
