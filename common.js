function nodeName(input) {
	var type = typeof(input);
	switch (type) {
		case "function": return nodeName(input());
		case "string": return input;
	}
	// typeErr("element name", type);
	return false;
}

function mergeTwo(a, b) {
	return Object.assign(a, b);
}

var err = console.error;

function mergeObjs(objs) {
	return objs.reduce(mergeTwo, {});
}

function typeErr(thing, type) {
	err(type, "is not a valid input for:", thing);
}

function toCSSName(str) {
	return (/[A-Z]/.exec(str) || []).reduce(function(acc, curr) {
		return acc.replace(curr, "-" + curr.toLowerCase());
	}, str);
}

function styleAttr(obj) {
	var res = "";
	for (var key in obj) {
		var val = obj[key];
		res += toCSSName(key) + ":" + val + ";"
	}
	return res.slice(0, res.length - 1);
}

function nodeAttrs(input) {
	var type = typeof(input);
	switch (type) {
		case "function": return nodeAttrs(input());
		case "object":
			if (Array.isArray(input)) {
				var subs = input.map(nodeAttrs);
				if (subs.indexOf(false) !== -1) {return false;}
				return mergeObjs(subs);
			}
			var res = {};
			for (var key in input) {
				var attr = input[key];
				if (key === "style") {
					res[key] = styleAttr(attr);
				} else {
					res[key] = attr;
				}
			}
			return res;
	}
	// typeErr("attribute", type);
	return false;
}

function validate(toNode, textNode, input) {
	var type = typeof(input);
	if (type === "function") {return validate(toNode, textNode, input());}
	if (Array.isArray(input)) {
		// var name = nodeName(input[0]);
		var attrs = nodeAttrs(input[1]);
		if (typeof(attrs) === "object") {
			return [toNode(nodeName(input[0]), attrs,
				validate(toNode, textNode, input[2]))];
		} else {
			return [].concat.apply([], input.map(validate.bind(null, toNode, textNode)));
		}
	}
	return (input === undefined ? [] : [textNode(input.toString())]);
}

function root(toNode, textNode, input) {
	var els = validate(toNode, textNode, input);
	if (els.length > 1) {
		err("Cannot have more than one root element!");
	}
	return els[0];
}

module.exports = {
	nodeName: nodeName,
	mergeTwo: mergeTwo,
	mergeObjs: mergeObjs,
	typeErr: typeErr,
	nodeAttrs: nodeAttrs,
	root: root
};
