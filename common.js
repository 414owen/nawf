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
	if (input === undefined) {return false;}
	switch (input.constructor) {
		case Function: return nodeAttrs(input());
		case Array:
			var subs = input.map(nodeAttrs);
			if (subs.indexOf(false) !== -1) {return subs;}
			return mergeObjs(subs);
		case Object:
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

function validate(toNode, textNode, store, input) {
	if (input === undefined) {return false;}
	if (input instanceof Node) {return input;}
	switch (input.constructor) {
		case Function: return validate(toNode, textNode, store, input());
		case Array: 
			// var name = nodeName(input[0]);
			var attrs = nodeAttrs(input[1]);
			if (attrs.constructor === Object) {
				var res = [toNode(nodeName(input[0]), attrs,
					validate(toNode, textNode, store, input[2]))];
				if (attrs.name) {store[attrs.name] = res[0];}
				return res;
			} else {
				return [].concat.apply([], input.map(validate.bind(null, toNode, textNode, store)));
			}
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
