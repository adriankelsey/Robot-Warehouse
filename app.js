// main grid array
let grid = [];
//commands array, this is where commands will be pushed into
let commandsX = [];
let commandsY = [];
//robot starting x and y coordinates
let x = 0;
let y = 0;

let crate1X = 4;
let crate1Y = 4;

let crate1CommandsX = [];
let crate1CommandsY = [];

let crate2CommandsX = [];
let crate2CommandsY = [];

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

// crate 1 commands
//
function crate1North() {
  let addY = 1;
  crate1CommandsY.push(addY);
}

function crate1South() {
  let minusY = -1;
  crate1CommandsY.push(minusY);
}

function crate1East() {
  let addX = 1;
  crate1CommandsX.push(addX);
}

function crate1West() {
  let minusX = -1;
  crate1CommandsX.push(minusX);
}

// crate 2 commands
//
function crate2North() {
  let addY = 1;
  crate2CommandsY.push(addY);
}

function crate2South() {
  let minusY = -1;
  crate2CommandsY.push(minusY);
}

function crate2East() {
  let addX = 1;
  crate2CommandsX.push(addX);
}

function crate2West() {
  let minusX = -1;
  crate2CommandsX.push(minusX);
}

// initialize crate 1 position
for (i = 0; i < 4; i++) {
  crate1East();
  crate1North();
}

// initialize crate 2 position
for (i = 0; i < 9; i++) {
  crate2East();
  crate2North();
}

// Main App
function app(state) {
  // calculates array by adding array together with reduce
  // calculate position y
  calculatePositionY = (commandsY) => {
    if (commandsY.length > 0) {
      return (y = commandsY.reduce((a, b) => a + b));
    } else {
      return (y = 0);
    }
  };
  // calculate position x
  calculatePositionX = (commandsX) => {
    if (commandsX.length > 0) {
      return (x = commandsX.reduce((a, b) => a + b));
    } else {
      return (x = 0);
    }
  };
  // crate 1
  // calculate crate position y
  calculateCrate1PositionY = (crate1CommandsY) => {
    if (crate1CommandsY.length > 0) {
      return (crate1Y = crate1CommandsY.reduce((a, b) => a + b));
    } else {
      return (crate1Y = 0);
    }
  };
  // crate 1
  // calculate crate position x
  calculateCrate1PositionX = (crate1CommandsX) => {
    if (crate1CommandsX.length > 0) {
      return (crate1X = crate1CommandsX.reduce((a, b) => a + b));
    } else {
      return (crate1X = 0);
    }
  };
  // crate 2
  // calculate crate position y
  calculateCrate2PositionY = (crate2CommandsY) => {
    if (crate2CommandsY.length > 0) {
      return (crate2Y = crate2CommandsY.reduce((a, b) => a + b));
    } else {
      return (crate2Y = 0);
    }
  };
  // crate 2
  // calculate crate position x
  calculateCrate2PositionX = (crate2CommandsX) => {
    if (crate2CommandsX.length > 0) {
      return (crate2X = crate2CommandsX.reduce((a, b) => a + b));
    } else {
      return (crate2X = 0);
    }
  };
  // robot updated x and y coordinates assigned to varaibles
  x = calculatePositionX(commandsX);
  y = calculatePositionY(commandsY);
  // crate updated x and y coordinates assigned to variables
  // crate 1
  crate1X = calculateCrate1PositionX(crate1CommandsX);
  crate1Y = calculateCrate1PositionY(crate1CommandsY);
  // crate 2
  crate2X = calculateCrate2PositionX(crate2CommandsX);
  crate2Y = calculateCrate2PositionY(crate2CommandsY);
  let robotPosition = grid[y][x];
  let crate1Position = grid[crate1Y][crate1X];
  let crate2Position = grid[crate2Y][crate2X];

  //robot
  let robot = {
    position: robotPosition,
    state: 0,
  };
  //crates
  let crate1 = {
    name: 'crate 1',
    position: crate1Position,
  };

  let crate2 = {
    name: 'crate 2',
    position: crate2Position,
  };

  // detect crate
  function detectCrate(state, position) {
    if (robot.position === crate1.position) {
      console.log('crate here');
      // if crate 1 position is equal to robot position carryCrate() will execute
      carryCrate();
    }
  }

  // carry crate
  function carryCrate() {
    rl.question(
      'Type in G to pick up crate or E to continue: ',
      function (command) {
        switch (command) {
          case 'G':
            // robot state equals 1 to symbol robot is carrying a crate
            robot.state = 1;
            if (robot.position === crate1.position) {
              console.log(`${crate1.name} has been picked up`);
            } else if (robot.position === crate2.position) {
              console.log(`${crate2.name} has been picked up`);
            }
            robotCommands();
            break;
          case 'E':
            robotCommands();
          default:
            break;
        }
      }
    );
  }

  // readline question
  function robotCommands(robotState, crate1Position) {
    rl.question(
      'Give robot commands by typing N, W, E, S:  ',
      function (command) {
        // switch statement that process users input into a command
        switch (command) {
          // move robot North
          //
          case 'N':
            // check if robot can keep moving north
            if (robot.position[0] === 10) {
              console.log('error cant go any more North');
              console.log('robots coordinates (y, x): ', robot.position);

              robotCommands();
            }
            // check if robot is carrying a crate 1
            else if (robot.state === 1 && robot.position === crate1.position) {
              North();
              crate1North();
              x = calculatePositionX(commandsX);
              y = calculatePositionY(commandsY);
              crate1X = calculateCrate1PositionX(crate1CommandsX);
              crate1Y = calculateCrate1PositionY(crate1CommandsY);

              robot.position = grid[y][x];
              crate1.position = grid[crate1Y][crate1X];

              console.log('robots coordinates (y, x): ', robot.position);
              console.log('robot is carrying a crate type D to drop it');

              robotCommands();
            }
            // check if robot is carrying crate 2
            else if (robot.state === 1 && robot.position === crate2.position) {
              North();
              crate2North();
              x = calculatePositionX(commandsX);
              y = calculatePositionY(commandsY);
              crate2X = calculateCrate1PositionX(crate2CommandsX);
              crate2Y = calculateCrate1PositionY(crate2CommandsY);

              robot.position = grid[y][x];
              crate2.position = grid[crate2Y][crate2X];

              console.log('robots coordinates (y, x): ', robot.position);
              console.log('robot is carrying a crate 2 type D to drop it');

              robotCommands();
            } else {
              North();
              x = calculatePositionX(commandsX);
              y = calculatePositionY(commandsY);
              robot.position = grid[y][x];

              console.log('robots coordinates (y, x): ', robot.position);
              app();
            }
            break;
          // move robot South
          //
          case 'S':
            // check if robot can keep moving South
            if (robot.position[0] === 1) {
              console.log('error cant go any more South');
              console.log('robots coordinates (y, x): ', robot.position);

              robotCommands();
            }
            // check if robot is carrying a crate 1
            else if (robot.state === 1 && robot.position === crate1.position) {
              South();
              crate1South();
              x = calculatePositionX(commandsX);
              y = calculatePositionY(commandsY);
              crate1X = calculateCrate1PositionX(crate1CommandsX);
              crate1Y = calculateCrate1PositionY(crate1CommandsY);

              robot.position = grid[y][x];
              crate1.position = grid[crate1Y][crate1X];

              console.log('robots coordinates (y, x): ', robot.position);
              console.log('robot is carrying a crate type D to drop it');

              robotCommands();
            }
            // check if robot is carrying crate 2
            else if (robot.state === 1 && robot.position === crate2.position) {
              South();
              crate2South();
              x = calculatePositionX(commandsX);
              y = calculatePositionY(commandsY);
              crate2X = calculateCrate1PositionX(crate2CommandsX);
              crate2Y = calculateCrate1PositionY(crate2CommandsY);

              robot.position = grid[y][x];
              crate2.position = grid[crate2Y][crate2X];

              console.log('robots coordinates (y, x): ', robot.position);
              console.log('robot is carrying a crate 2 type D to drop it');

              robotCommands();
            } else {
              South();
              x = calculatePositionX(commandsX);
              y = calculatePositionY(commandsY);
              robot.position = grid[y][x];

              console.log('robots coordinates (y, x): ', robot.position);
              app();
            }
            break;
            break;
          // move robot East
          case 'E':
            // check if robot can keep moving north
            if (robot.position[1] === 10) {
              console.log('error cant go any more East');
              console.log('robots coordinates (y, x): ', robot.position);

              robotCommands();
            }
            // check if robot is carrying a crate
            else if (robot.state === 1) {
              East();
              crate1East();
              x = calculatePositionX(commandsX);
              y = calculatePositionY(commandsY);
              crate1X = calculateCrate1PositionX(crate1CommandsX);
              crate1Y = calculateCrate1PositionY(crate1CommandsY);

              robot.position = grid[y][x];
              crate1.position = grid[crate1Y][crate1X];

              console.log('robots coordinates (y, x): ', robot.position);
              console.log('robot is carrying a crate type D to drop it');

              robotCommands();
            }
            // check if robot is carrying crate 2
            else if (robot.state === 1 && robot.position === crate2.position) {
              East();
              crate2East();
              x = calculatePositionX(commandsX);
              y = calculatePositionY(commandsY);
              crate2X = calculateCrate1PositionX(crate2CommandsX);
              crate2Y = calculateCrate1PositionY(crate2CommandsY);

              robot.position = grid[y][x];
              crate2.position = grid[crate2Y][crate2X];

              console.log('robots coordinates (y, x): ', robot.position);
              console.log('robot is carrying a crate 2 type D to drop it');

              robotCommands();
            } else {
              East();
              x = calculatePositionX(commandsX);
              y = calculatePositionY(commandsY);
              robot.position = grid[y][x];

              console.log('robots coordinates (y, x): ', robot.position);
              app();
            }
            break;
            break;
          // move robot West
          case 'W':
            // check if robot can keep moving north
            if (robot.position[1] === 1) {
              console.log('error cant go any more West');
              console.log('robots coordinates (y, x): ', robot.position);

              robotCommands();
            }
            // check if robot is carrying a crate
            else if (robot.state === 1) {
              West();
              crate1West();
              x = calculatePositionX(commandsX);
              y = calculatePositionY(commandsY);
              crate1X = calculateCrate1PositionX(crate1CommandsX);
              crate1Y = calculateCrate1PositionY(crate1CommandsY);

              robot.position = grid[y][x];
              crate1.position = grid[crate1Y][crate1X];

              console.log('robots coordinates (y, x): ', robot.position);
              console.log('robot is carrying a crate type D to drop it');

              robotCommands();
            }
            // check if robot is carrying crate 2
            else if (robot.state === 1 && robot.position === crate2.position) {
              West();
              crate2West();
              x = calculatePositionX(commandsX);
              y = calculatePositionY(commandsY);
              crate2X = calculateCrate1PositionX(crate2CommandsX);
              crate2Y = calculateCrate1PositionY(crate2CommandsY);

              robot.position = grid[y][x];
              crate2.position = grid[crate2Y][crate2X];

              console.log('robots coordinates (y, x): ', robot.position);
              console.log('robot is carrying a crate 2 type D to drop it');

              robotCommands();
            } else {
              West();
              x = calculatePositionX(commandsX);
              y = calculatePositionY(commandsY);
              robot.position = grid[y][x];

              console.log('robots coordinates (y, x): ', robot.position);
              app();
            }
            break;
          case 'D':
            // drop crate 1
            if (robot.state === 1 && robot.position === crate1.position) {
              console.log('crate 1 had been dropped at', crate1.position);
              console.log('robots coordinates (y, x): ', robot.position);
              robot.state = 0;
              robotCommands();
            }
            // drop crate 2
            if (
              robot.position === crate1.position &&
              robot.position == crate2.position &&
              robot.state === 0
            ) {
              console.log('cannot drop crate here');
              robotCommands();
            } else if (
              robot.state === 1 &&
              robot.position === crate2.position
            ) {
              console.log('crate 2 had been dropped at', crate2.position);
              console.log('robots coordinates (y, x): ', robot.position);
              robot.state = 0;
              robotCommands();
            } else {
              console.log('robot is not carrying anything');
              robotCommands();
            }

          default:
            break;
        }
      }
    );
  }
  // check if robot is near a crate
  //check crate 1
  if (robot.position === crate1.position && robot.state === 0) {
    console.log('crate 1 here');
    carryCrate();
  } else if (robotPosition === crate2.position && robot.state === 0) {
    console.log('crate 2 here');
    carryCrate();
  } else {
    robotCommands();
  }
}

app();
