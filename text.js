var common = require("./common");

function tn(a) {return a;}

function attrText(attrs) {
	var res = [];
	for (var key in attrs) {
		res.push(key + "=\"" + attrs[key] + "\"");
	}
	return res.join(" ");
}

function nodeInt(indent, name, attrs, children) {
	var res = [];
	children.forEach(function(c) {
		if (Array.isArray(c)) {
			res = res.concat(c);
		} else {
			res.push(c);
		}
	});
	res = res.map(function(s) {return indent + s;});
	res.unshift("<" + name + " " + attrText(attrs) + ">");
	res.push("</" + name + ">");
	return res;
}

function node(input, indent) {
	return common.root(nodeInt.bind(null, (indent || "  ")), tn, input).join("\n");
}

module.exports = node;
