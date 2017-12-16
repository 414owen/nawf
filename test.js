var nawf = require("./index");

var firstTime = false;
var text;
var store = {};
var doc = [
	"div",
	[
		{
			className: "yes",
			style: {backgroundColor: "red"}
		}
	],
	[
		[
			"div",
			{name: "text"},
			0
		],
		[
			"button",
			{
				onclick: function() {
					store.text.innerText = parseInt(store.text.innerText) + 2;
				}
			},
			"Increment"
		]
	]
];

document.body.appendChild(nawf.dom(doc, store));
console.log(nawf.text(doc));
