var common = require("./common");

var el = document.createElement.bind(document);
var tn = document.createTextNode.bind(document);

function node(type, attrs, children) {
	var node = el(type);
	for (var key in attrs) {
		var val = attrs[key];
		node[key] = attrs[key];
	}
	children.forEach(function(child) {
		node.appendChild(child);
	});
	return node;
}

module.exports = common.root.bind(null, node, tn);
