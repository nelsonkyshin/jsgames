$(function() {
	newGame();
});

var grid = [ [false, false, true, true, true, true], [false, true, true, true, true, true], [true, true, true, true, true, true] ];
var rows = grid.length;
var cols = grid[0].length;
var score = 0;

function newGame() {
	score = -1;
	updateScore();
	drawNewGrid();
}

function updateScore() {
	score++;
	$('.scoreArea').html('Score: ' + score);
}

function drawNewGrid() {
	var gameArea = $('.gameArea');
	gameArea.html('');
	
	for(var y=0; y<rows; y++) {
		gameArea.append('<div class="row">');
		for (var x=0; x<cols; x++) {
			var col = grid[y][x] ? 'black': 'white'; 
			gameArea.append('<div class="col-md-2"><button class="gameButton btn ' + col + '" id="gameButton'+x+'-'+y+'" onclick="buttonClick(' + x + ',' + y +')"></button></div>');
		}
		gameArea.append('</div>');
	}
}

function buttonClick(x, y) {
	updateScore();
	affectButtons(x, y);
	if (checkWinCondition())
		endGame();
}

function affectButtons(x, y) {
	// touched
	affectButton(x, y);
	
	// adjacent
	if (x-1 >= 0) affectButton(x-1, y);
	if (x+1 < cols) affectButton(x+1, y);
	if (y-1 >= 0) affectButton(x, y-1);
	if (y+1 < rows) affectButton(x, y+1);
}

function affectButton(x, y) {
	var sel = '#gameButton'+x+'-'+y;
	$(sel).toggleClass('black white');
}

function checkWinCondition() {
	return ($('.gameButton.black').length == 0 || $('.gameButton.white').length == 0);
}

function endGame() {
	$('.scoreArea').html('Finished game! Final Score = '+score);
	$('.scoreArea').append(' <button class="btn btn-success" onclick="newGame()">New Game</button>');
	$('.gameButton').prop('disabled', 'true');
	
}

