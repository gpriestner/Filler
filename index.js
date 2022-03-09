console.log("Starting. . . .");
var canvas = document.querySelector("canvas");
var view = canvas.getContext("2d");
//resize();

var xCellWidth = 20;
var yCellWidth = 20;
var grid = [];

for (let i = 0; i < 200; i++) {
  var g = Array(200).fill(0);
  grid.push(g);
}
resize();

function resize() {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  view.fillStyle = "white";
  xCellWidth = canvas.width / grid[0].length;
  yCellWidth = canvas.height / grid.length;
  display();
}

addEventListener("mousemove", mouseMove);
addEventListener("dblclick", dblClick);
addEventListener("resize", resize);


function mouseMove(event) {
  if (event.buttons === 1) {
      const x = Math.floor(event.x / xCellWidth);
      const y = Math.floor(event.y / yCellWidth);
      grid[y][x] = 1;
      display();
  }
}

function dblClick(event) {
    const x = Math.floor(event.x / xCellWidth);
    const y = Math.floor(event.y / yCellWidth);
    fill(x, y);
    display();
}



function display() {
    for(let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] === 1) {
                view.fillRect(j * xCellWidth, i * yCellWidth, xCellWidth + 1, yCellWidth + 1);
            }
        }
    }
}

var cellsToProcess = [];

function fill(x, y) {
    cellsToProcess.push(x);
    cellsToProcess.push(y);

    while (cellsToProcess.length > 0) {
        const y = cellsToProcess.pop();
        const x = cellsToProcess.pop();

        if(x >= 0 && y >= 0 && x < grid[0].length && y < grid.length && grid[y][x] === oldColour) {
            grid[y][x] = newColour;
            //display();

            // north
            cellsToProcess.push(x);
            cellsToProcess.push(y - 1);

            // south
            cellsToProcess.push(x);
            cellsToProcess.push(y + 1);

            // west
            cellsToProcess.push(x - 1);
            cellsToProcess.push(y);

            //east
            cellsToProcess.push(x + 1);
            cellsToProcess.push(y)

            // fill(x, y - 1); // north
            // fill(x, y + 1); // south
            // fill(x - 1, y); // west
            // fill(x + 1, y); // east
        }


    }


}

//display();

var oldColour = 0;
var newColour = 1;

//fill(2, 2);

//display();