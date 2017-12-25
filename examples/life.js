var nawf = require("../index");
var func = require("estl/func");

var store = {hello: "World"};
var grid = Array.create([20, 20], func.cnst(false));
var paused = true;

var doc = [
	"div",
	{
		style: {
			backgroundColor: "black",
			color: "white"
		}
	},
	[
		[
			"h1",
			{},
			"Conway's Game of Life"
		],
		[
			"div",
			{
				style: {
					backgroundColor: "#333",
					display: "inline-block",
					padding: "1rem"
				}
			},
			[
				[
					"div",
					{name: "container"}
				],
				["br"],
				[
					"button",
					{
						name: "pause",
						onclick: function() {
							paused = !paused;
							// store.pause.replace(paused ? "Play" : "Pause");
							if (paused) {
								draw();
							} else {
								tick();
							}
						}
					},
					"Play/Pause"
				],
				[
					"input",
					{type: "range"}
				]
			]
		]
	]
];

function draw() {
	store.container.replace(
		nawf.dom([
			"table",
			{style: {cursor: paused ? "cursor" : ""}},
			grid.map(function(row, y) {
				return [
					"tr",
					{},
					row.map(function(cell, x) {
						return [
							"td",
							{
								style: {
									backgroundColor: cell ? "white" : "black",
									width: "20px",
									height: "20px"
								},
								onclick: function() {
									grid[y][x] = !grid[y][x];
									if (paused) {draw();}
								}
							}
						];
					})
				];
			})
		])
	);
}

function neighbours(y, x, grid) {
	var res = -grid[y][x];
	for (var yy = y - 1; yy <= y + 1; yy++) {
		yyy = (yy + grid.length) % grid.length;
		for (var xx = x - 1; xx <= x + 1; xx++) {
			xxx = (xx + grid[0].length) % grid[0].length;
			res += grid[yyy][xxx];
		}
	}
	return res;
}

function tick() {
	if (paused) {return;}
	grid = grid.map(function(r, y) {
		return r.map(function(c, x) {
			var c = grid[y][x];
			var n = neighbours(y, x, grid);
			if (n === 3) {
				return true;
			} else if (n === 2 && c) {
				return true;
			}
			return false;
		});
	});
	draw();
	window.setTimeout(tick, 200);
}

console.log(nawf.text(doc));
document.body.appendChild(nawf.dom(doc, store));
draw();
