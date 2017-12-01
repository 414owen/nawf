var T = require("./index");

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

document.body.appendChild(T.dom(doc));
console.log(T.text(doc));
