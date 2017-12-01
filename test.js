var nawf = require("./index");

var firstTime = false;
var doc = [
	"div",
	[
		{
			style: {backgroundColor: "red"}
		}
	],
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

document.body.appendChild(nawf.dom(doc));
console.log(nawf.text(doc));
