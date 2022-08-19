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
	const numberOfRotations = 4;
	const startingPosition = 4;

	//Tetris pieces function (formally: tetrominoes)
	function tetrominoesCreation(tetrominoWidth) {
		//I shaped tetromino
		const iTetromino = [
			[
				tetrominoWidth,
				1 + tetrominoWidth,
				2 + tetrominoWidth,
				3 + tetrominoWidth
			],
			[
				2,
				2 + tetrominoWidth,
				2 + tetrominoWidth * 2,
				2 + tetrominoWidth * 3
			],
			[
				tetrominoWidth * 2,
				1 + tetrominoWidth * 2,
				2 + tetrominoWidth * 2,
				3 + tetrominoWidth * 2
			],
			[
				1,
				1 + tetrominoWidth,
				1 + tetrominoWidth * 2,
				1 + tetrominoWidth * 3
			]
		];

		//square shaped tetromino
		const oTetromino = [
			//for ease, just putting the same rotation 4 times
			[0, 1, tetrominoWidth, 1 + tetrominoWidth],
			[0, 1, tetrominoWidth, 1 + tetrominoWidth],
			[0, 1, tetrominoWidth, 1 + tetrominoWidth],
			[0, 1, tetrominoWidth, 1 + tetrominoWidth]
		];

		//short t shaped tetromino
		const tTetromino = [
			[1, tetrominoWidth, 1 + tetrominoWidth, 2 + tetrominoWidth],
			[1, 1 + tetrominoWidth, 2 + tetrominoWidth, 1 + tetrominoWidth * 2],
			[
				tetrominoWidth,
				1 + tetrominoWidth,
				2 + tetrominoWidth,
				1 + tetrominoWidth * 2
			],
			[1, tetrominoWidth, 1 + tetrominoWidth, 1 + tetrominoWidth * 2]
		];

		//j shaped tetromino (similar to L)
		const jTetromino = [
			[0, tetrominoWidth, 1 + tetrominoWidth, 2 + tetrominoWidth],
			[1, 2, 1 + tetrominoWidth, 1 + tetrominoWidth * 2],
			[
				tetrominoWidth,
				1 + tetrominoWidth,
				2 + tetrominoWidth,
				2 + tetrominoWidth * 2
			],
			[1, 1 + tetrominoWidth, tetrominoWidth * 2, 1 + tetrominoWidth * 2]
		];

		//L shaped tetromino
		const lTetromino = [
			[2, tetrominoWidth, 1 + tetrominoWidth, 2 + tetrominoWidth],
			[
				1,
				1 + tetrominoWidth,
				1 + tetrominoWidth * 2,
				2 + tetrominoWidth * 2
			],
			[
				tetrominoWidth,
				1 + tetrominoWidth,
				2 + tetrominoWidth,
				tetrominoWidth * 2
			],
			[0, 1, 1 + tetrominoWidth, 1 + tetrominoWidth * 2]
		];

		//S shaped tetromino
		const sTetromino = [
			[1, 2, tetrominoWidth, 1 + tetrominoWidth],
			[1, 1 + tetrominoWidth, 2 + tetrominoWidth, 2 + tetrominoWidth * 2],
			[
				1 + tetrominoWidth,
				2 + tetrominoWidth,
				tetrominoWidth * 2,
				1 + tetrominoWidth * 2
			],
			[0, tetrominoWidth, 1 + tetrominoWidth, 1 + tetrominoWidth * 2]
		];

		//Z shaped tetromino
		const zTetromino = [
			[0, 1, 1 + tetrominoWidth, 2 + tetrominoWidth],
			[2, 1 + tetrominoWidth, 2 + tetrominoWidth, 1 + tetrominoWidth * 2],
			[
				tetrominoWidth,
				1 + tetrominoWidth,
				1 + tetrominoWidth * 2,
				2 + tetrominoWidth * 2
			],
			[1, tetrominoWidth, 1 + tetrominoWidth, tetrominoWidth * 2]
		];

		return [
			iTetromino,
			oTetromino,
			tTetromino,
			jTetromino,
			lTetromino,
			sTetromino,
			zTetromino
		];
	}

	const tetrominoes = tetrominoesCreation(width);

	let currentPosition = startingPosition;
	let randomTetrominoShape = Math.floor(Math.random() * tetrominoes.length);
	let currentTetromino = tetrominoes[randomTetrominoShape][currentRotation];

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
			randomTetrominoShape = nextRandomTetromino;
			currentTetromino = tetrominoes[randomTetrominoShape][0];
			nextRandomTetromino = Math.floor(
				Math.random() * tetrominoes.length
			);
			currentPosition = 4;
			draw();
			displayShape();
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

	function rotate() {
		undraw();
		currentRotation += 1;
		if (currentRotation === numberOfRotations) {
			currentRotation = 0;
		}
		currentTetromino = tetrominoes[randomTetrominoShape][currentRotation];
		draw();
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

	//mini-grid next piece display
	const displaySquares = document.querySelectorAll(".mini-grid div");
	const displayWidth = 4;
	let nextRandomTetromino = Math.floor(Math.random() * tetrominoes.length);
	const displayTetrominoes = tetrominoesCreation(displayWidth);

	function displayShape() {
		displaySquares.forEach((square) => {
			square.classList.remove("tetromino-space");
		});
		displayTetrominoes[nextRandomTetromino][0].forEach((index) => {
			displaySquares[index].classList.add("tetromino-space");
		});
	}

	startButton.addEventListener("click", () => {});

	draw();

	//Listen to when a key is pressed
	document.addEventListener("keyup", control);

	timerId = setInterval(moveDown, 200);

	displayShape();
});
