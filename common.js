require("estl/arr");
require("estl/obj");
require("estl/dom");

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
	if (input === undefined) {return false;}
	var success = true;
	var res = {};
	input.peelForEach(function(o) {
		if (typeof(o) !== "object") {
			success = false;
			return;
		}
		Object.getOwnPropertyNames(o).forEach(function(key) {
			if (key === "style") {
				res[key] = ";" + (res[key] || "") + styleAttr(o[key]);
			} else {
				res[key] = o[key];
			}
		});
	});
	return success && res;
}

function validate(toNode, textNode, store, input) {
	if (input === undefined) {return false;}
	if (input instanceof Node) {return input;}
	switch (input.constructor) {
		case Function: return validate(toNode, textNode, store, input());
		case Array:
			var name = (input[0] || []).peel();
			if (name.length === 1 && typeof(name[0]) === "string") {
				var attrs = nodeAttrs(input[1]);
				var res = [toNode(name[0], attrs,
					validate(toNode, textNode, store, input[2]))];
				if (attrs.name) {
					store[attrs.name] = res[0];
				}
				return res;
			}
			return input.flatMap(validate.bind(null, toNode, textNode, store));
	}
	return (input === undefined ? [] : [textNode(input.toString())]);
}

function root(toNode, textNode, input, store) {
	var els = validate(toNode, textNode, (store || {}), input);
	if (els.length > 1) {
		err("Cannot have more than one root element!");
	}
	return els[0];
}

module.exports = {
	root: root
};
