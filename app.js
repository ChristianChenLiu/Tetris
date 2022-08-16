/** @format */

document.addEventListener("DOMContentLoad", () => {
	const grid = document.querySelector(".tetris-grid-board");
	let squares = Array.from(
		document.querySelectorAll(".tetris-grid-board div")
	);
	const scoreDisplay = document.querySelector("#score");
	const startButton = document.querySelector("#start-button");
	const width = 10;
});
