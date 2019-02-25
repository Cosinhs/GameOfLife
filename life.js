var cellSize = 20;
var probabilityOfAliveAtStart = 0.3;
var alive = "darkgreen";
var dead = "black";
var ctx = document.getElementById('game').getContext('2d');
var width = document.getElementById('game').width / cellSize;
var height = document.getElementById('game').height / cellSize;

var drawCell = (ctx, i, j, color)=> {
	ctx.fillStyle = color;
	ctx.fillRect(i*cellSize+1, j*cellSize+1, cellSize-2, cellSize-2);
}

function Cell(isAlive=false, neighbors=0) {
	this.isAlive = isAlive;
	this.neighbors = neighbors;
}

var cells = [];

for (let i=0; i<width; i++) {
	cells.push([]);
	for (let j=0; j<height; j++) {
		cells[cells.length-1].push(new Cell(Math.random()<probabilityOfAliveAtStart))
		drawCell(ctx, i, j, cells[i][j].isAlive ? alive : dead);
	}
}

function update() {
	for (let i=0; i<width; i++) {
		for (let j=0; j<height; j++) {
			var neighbors = 0;
			for (let ii=i-1; ii<=i+1; ii++) {
				for (let jj=j-1; jj<=j+1; jj++) {
					if (0<=ii && ii<width && 0<=jj && jj<height && !(ii===i && jj===j)) {
						neighbors += cells[ii][jj].isAlive
					}
				}
			}
			cells[i][j].neighbors = neighbors;
		}
	}
	
	for (let i=0; i<width; i++) {
		for (let j=0; j<height; j++) {
			drawCell(ctx, i, j, cells[i][j].isAlive ? alive : dead);
			if (cells[i][j].isAlive===false && cells[i][j].neighbors===3) {
				cells[i][j].isAlive = true;
			} else if (cells[i][j].isAlive===true && (cells[i][j].neighbors<2 || cells[i][j].neighbors>3)) {
				cells[i][j].isAlive = false;
			}
		}
	}
}

setInterval(update, 100);
