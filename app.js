// main grid array
let grid = [];
//commands array, this is where commands will be pushed into
let commandsX = [];
let commandsY = [];
//robot starting position
let x = 0;
let y = 0;

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function createGrid() {
  for (let x = 0; x < 10; x++) {
    // creates 10 arrays to house cells
    grid[x] = [];
    for (let y = 0; y < 10; y++) {
      // loop createCell 10 times
      createCell(x, y);
    }
  }
}

function createCell(x, y) {
  // new cell with x and y values passed to them
  grid[x][y] = [x + 1, y + 1];
}

createGrid();

// commands that will push number according to direction
// North
function North() {
  let addY = 1;
  commandsY.push(addY);
}
// South
function South() {
  let minusY = -1;
  commandsY.push(minusY);
}
// East
function East() {
  let addX = 1;
  commandsX.push(addX);
}
// West
function West() {
  let minusX = -1;
  commandsX.push(minusX);
}

// Main App
function app() {
  // calculates array by adding array together with reduce
  // calculate position x
  calculatePositionX = (commandsX) => {
    if (commandsX.length > 0) {
      return (x = commandsX.reduce((a, b) => a + b));
    } else {
      return (x = 0);
    }
  };
  // calculate position y
  calculatePositionY = (commandsY) => {
    if (commandsY.length > 0) {
      return (y = commandsY.reduce((a, b) => a + b));
    } else {
      return (y = 0);
    }
  };
  // readline question
  rl.question('Give robot commands:  ', function (command) {
    // switch statement that process users input into a command
    switch (command) {
      // case N
      case 'N':
        North();
        x = calculatePositionX(commandsX);
        y = calculatePositionY(commandsY);
        robotPosition = grid[y][x];
        console.log(robotPosition);
        app();
        break;
      // case S
      case 'S':
        South();
        x = calculatePositionX(commandsX);
        y = calculatePositionY(commandsY);
        robotPosition = grid[y][x];
        console.log(robotPosition);
        app();
        break;
      // case E
      case 'E':
        East();
        x = calculatePositionX(commandsX);
        y = calculatePositionY(commandsY);
        robotPosition = grid[y][x];
        console.log(robotPosition);
        app();
        break;
      // case W
      case 'W':
        West();
        x = calculatePositionX(commandsX);
        y = calculatePositionY(commandsY);
        robotPosition = grid[y][x];
        console.log(robotPosition);
        app();
        break;

      default:
        break;
    }
  });
}

app();
