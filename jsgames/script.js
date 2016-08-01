$(function() {
	clickedNewGame();
});

var grid = [ [false, false, true, true, true, true], [false, true, true, true, true, true], [true, true, true, true, true, true] ];
var rows = grid.length;
var cols = grid[0].length; // set to 6
var score = 0;

function clickedNewGame() {
	rows = Math.max(3, $('#nrows').val());
	randomizeGrid();
	resetGame();
}

function randomizeGrid() {
	// assume ncols is set to 6
	grid = new Array();
 	console.log(cols + " "+rows); 
	for (var i = 0; i < rows; i++) {
		grid[i] = new Array();
		for (var j = 0 ; j < cols; j++) {
				grid[i][j] = (Math.random() > 0.5) ? true : false;
		}
	}
}

function resetGame() {
	score = 0;
	updateScore();
	renderGrid();
	disableResetButton();
}

function disableResetButton() {
	$('#resetButton').prop('disabled', true);
}

function updateScore() {
	$('#scoreArea').html('Score: ' + score);
}

function renderGrid() {
	var gameArea = $('.gameArea');
	gameArea.html('');
	
	for(var y=0; y<rows; y++) {
		gameArea.append('<div class="row">');
		for (var x=0; x<cols; x++) {
			var col = grid[y][x] ? 'black': 'white'; 
			gameArea.append('<div class="col-xs-2 gameButtonArea"><button class="btn gameButton ' + col + '" id="gameButton'+x+'-'+y+'" onclick="buttonClick(' + x + ',' + y +')"></button></div>');
		}
		gameArea.append('</div>');
	}
}

function buttonClick(x, y) {
	enableResetButton();
	score++;
	updateScore();
	affectButtons(x, y);
	if (checkWinCondition())
		endGame();
}

function enableResetButton() {
	$('#resetButton').prop('disabled', false);
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
	$('#scoreArea').html('Congratulations! You won with a winning score of '+score+'.');
	$('.gameButton').prop('disabled', 'true');
	
}

