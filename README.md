<div align="center">
	<p>
	   <img src="https://owen.cafe/nawf.f5051a89.svg" height="150">
	</p>
	<h1>NAWF</h1>
  Not A Web Framework - the minimalist's DOM abstraction
</div>

## What is this?

NAWF lets you generate DOM nodes or HTML text from a JSON-like structure. This
enables extremely lightweight pure-javascript abstraction of rendering code.

Obviously, generation of DOM nodes is only supported in the browser, but NAWF
can generate HTML text in a Node.js environment, too!

## Install

```bash
npm install nawf
```

## Usage

```javascript
var nawf = require("nawf");

var doc = [
	"div",
	{
		style: {backgroundColor: "red"}
	},
	[
		"Hello,", "World!", 
		[
			"button",
			{
				onclick: function() {console.log("Clicked!");}
			},
			"Testing"
		]
	]
];

// convert to text
nawf.text(doc);

// convert to DOM node
nawf.dom(doc);
```

## Abstraction

An element name is a string, or a function that produces an element name.

An attribute is a key-value pair, or a list of attributes, of a function that
returns an attribute.

A node is a string, or a list in the form
`[<element name>, <attribute>, <node>]`, or a list of nodes, or nothing.

It's very important to note that these definitions are recursive. This makes
the following equivalent:

```javascript
var simple = [
	"div",
	[],
	[
		"input",
		{type: "text", placeholder: "Type here"}
	]
];

// is the same as...

var complex = [
	function() {return "div";},
	[],
	[
		[ "input",
			[[function() {return [{type: "text"}];}],
				function() {return {placeholder: "Type here"};}
			]
		]
	]
];
```

Obviously, this is contrived, and awful. The second example is useless.  Here
are some genuine reasons you may want functions or lists in odd places...

* Changing attributes, element types, or children based on the context of a
  closure
* Mapping over data, to produce a view
