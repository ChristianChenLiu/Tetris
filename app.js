/** @format */

document.addEventListener("DOMContentLoaded", () => {
	const grid = document.querySelector(".tetris-grid-board");
	let squares = Array.from(
		document.querySelectorAll(".tetris-grid-board div")
	);
	const scoreDisplay = document.querySelector("#score");
	const startButton = document.querySelector("#start-button");
	const width = 10;

	//Tetris pieces (formally: tetrominoes)
	//I shaped tetromino
	const iTetromino = [
		[width, 1 + width, 2 + width, 3 + width],
		[2, 2 + width, 2 + width * 2, 2 + width * 3],
		[width * 2, 1 + width * 2, 2 + width * 2, 3 + width * 2],
		[1, 1 + width, 1 + width * 2, 1 + width * 3]
	];

	//square shaped tetromino
	const oTetromino = [
		//for ease, just putting the same rotation 4 times
		[0, 1, width, 1 + width],
		[0, 1, width, 1 + width],
		[0, 1, width, 1 + width],
		[0, 1, width, 1 + width]
	];

	//short t shaped tetromino
	const tTetromino = [
		[1, width, 1 + width, 2 + width],
		[1, 1 + width, 2 + width, 1 + width * 2],
		[width, 1 + width, 2 + width, 1 + width * 2],
		[1, width, 1 + width, 1 + width * 2]
	];

	//j shaped tetromino (similar to L)
	const jTetromino = [
		[0, width, 1 + width, 2 + width],
		[1, 2, 1 + width, 1 + width * 2],
		[width, 1 + width, 2 + width, 2 + width * 2],
		[1, 1 + width, width * 2, 1 + width * 2]
	];

	//L shaped tetromino
	const lTetromino = [
		[2, width, 1 + width, 2 + width],
		[1, 1 + width, 1 + width * 2, 2 + width * 2],
		[width, 1 + width, 2 + width, width * 2],
		[0, 1, 1 + width, 1 + width * 2]
	];

	//S shaped tetromino
	const sTetromino = [
		[1, 2, width, 1 + width],
		[1, 1 + width, 2 + width, 2 + width * 2],
		[1 + width, 2 + width, width * 2, 1 + width * 2],
		[0, width, 1 + width, 1 + width * 2]
	];

	//Z shaped tetromino
	const zTetromino = [
		[0, 1, 1 + width, 2 + width],
		[2, 1 + width, 2 + width, 1 + width * 2],
		[width, 1 + width, 1 + width * 2, 2 + width * 2],
		[1, width, 1 + width, width * 2]
	];

	const tetrominoes = [
		iTetromino,
		oTetromino,
		tTetromino,
		jTetromino,
		lTetromino,
		sTetromino,
		zTetromino
	];

	let currentPosition = 4;
	let currentTetromino = tetrominoes[0][0];

	function draw() {
		currentTetromino.forEach((index) => {
			squares[currentPosition + index].classList.add("tetromino-space");
		});
	}

	function undraw() {
		currentTetromino.forEach((index) => {
			squares[currentPosition + index].classList.remove(
				"tetromino-space"
			);
		});
	}

	function moveDown() {
		undraw();
		currentPosition += width;
		draw();
		freeze();
	}

	function freeze() {
		if (
			currentTetromino.some((index) =>
				squares[currentPosition + index + width].classList.contains(
					"taken"
				)
			)
		) {
			currentTetromino.forEach((index) =>
				squares[currentPosition + index].classList.add("taken")
			);
			random = Math.floor(Math.random() * tetrominoes.length);
			currentTetromino = tetrominoes[random][0];
			currentPosition = 4;
			draw();
		}
	}

	draw();

	//Listen to when a key is pressed
	document.addEventListener("keyup", control);

	timerId = setInterval(moveDown, 200);
});
