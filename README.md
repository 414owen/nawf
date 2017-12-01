# nawf

Not A Web Framework: the minimalist's DOM abstraction.

## Install

```bash
npm install nawf
```

## Usage

```javascript
var nawf = require("nawf");

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

// convert to text
nawf.text(doc);

// convert to DOM node
nawf.dom(doc);
```


