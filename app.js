/** @format */

document.addEventListener("DOMContentLoaded", () => {
	const grid = document.querySelector(".tetris-grid-board");
	let squares = Array.from(
		document.querySelectorAll(".tetris-grid-board div")
	);
	const scoreDisplay = document.querySelector("#score");
	const startButton = document.querySelector("#start-button");
	const width = 10;
	const currentRotation = 0;

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
	let currentTetromino =
		tetrominoes[Math.floor(Math.random() * tetrominoes.length)][
			currentRotation
		];

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

	function moveLeft() {
		const isAtLeftEdge = currentTetromino.some(
			(index) => (currentPosition + index) % width === 0
		);

		const isLeftTaken = currentTetromino.some((index) =>
			squares[currentPosition + index - 1].classList.contains("taken")
		);

		//Only moves left if not at left edge and not blocked at left by another tetromino
		if (!isAtLeftEdge && !isLeftTaken) {
			undraw();
			currentPosition -= 1;
			draw();
		}
	}

	function moveRight() {
		const isAtRightEdge = currentTetromino.some(
			(index) => (currentPosition + index) % width === width - 1
		);

		const isRightTaken = currentTetromino.some((index) =>
			squares[currentPosition + index + 1].classList.contains("taken")
		);

		//Only moves right if not at right edge and not blocked at right by another tetromino
		if (!isAtRightEdge && !isRightTaken) {
			undraw();
			currentPosition += 1;
			draw();
		}
	}

	function control(e) {
		if (e.key === "ArrowLeft") {
			//Move Left
			moveLeft();
		} else if (e.key === "ArrowUp") {
			//rotate
		} else if (e.key === "ArrowDown") {
			//Move down
			moveDown();
		} else if (e.key === "ArrowRight") {
			//Move right
			moveRight();
		}
		//Check if the move was frame perfect
		freeze();
	}

	draw();

	//Listen to when a key is pressed
	document.addEventListener("keyup", control);

	timerId = setInterval(moveDown, 200);
});
