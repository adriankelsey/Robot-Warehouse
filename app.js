// main grid array
let grid = [];
//commands array, this is where commands will be pushed into
let commandsX = [];
let commandsY = [];
//robot starting x and y coordinates
let x = 0;
let y = 0;

let crateX = 4;
let crateY = 4;

let crateState = [];

let crateCommandsX = [];
let crateCommandsY = [];

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

// crate commands
function crateNorth() {
  let addY = 1;
  crateCommandsY.push(addY);
}

function crateSouth() {
  let minusY = -1;
  crateCommandsY.push(minusY);
}

function crateEast() {
  let addX = 1;
  crateCommandsX.push(addX);
}

function crateWest() {
  let minusX = -1;
  crateCommandsX.push(minusX);
}

for (i = 0; i < 4; i++) {
  crateEast();
  crateNorth();
}

//robot
let robot = {
  position: grid[x][y],
  state: '',
  carrying: [],
};
//crates
let crate1 = {
  name: 'crate 1',
  position: grid[crateX][crateY],
  state: crateState,
};

// Main App
function app() {
  // calculates array by adding array together with reduce
  // calculate position y
  calculatePositionY = (crateommandsY) => {
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
  // calculate crate position y
  calculateCratePositionY = (crateCommandsY) => {
    if (crateCommandsY.length > 0) {
      return (crateY = crateCommandsY.reduce((a, b) => a + b));
    } else {
      return (crateY = 0);
    }
  };
  // calculate crate position x
  calculateCratePositionX = (commandsX) => {
    if (commandsX.length > 0) {
      return (crateX = commandsX.reduce((a, b) => a + b));
    } else {
      return (crateX = 0);
    }
  };
  //robot updated x and y coordinates assigned to varaibles
  x = calculatePositionX(commandsX);
  y = calculatePositionY(commandsY);
  // crate updated x and y coordinates assigned to variables
  crateX = calculateCratePositionX(crateCommandsX);
  crateY = calculateCratePositionY(crateCommandsY);
  let robotPosition = grid[y][x];
  let cratePosition = grid[crateY][crateX];

  //robot
  let robot = {
    position: robotPosition,
    state: '',
  };
  //crates
  let crate1 = {
    name: 'crate 1',
    position: cratePosition,
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
            crate1.position = robotPosition;
            console.log(
              `${crate1.name} has been picked up at `,
              crate1.position
            );
            robotCommands(robot.state, crate1.position);
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
  function robotCommands(robotState, cratePosition) {
    rl.question(
      'Give robot commands by typing N, W, E, S:  ',
      function (command) {
        // switch statement that process users input into a command
        switch (command) {
          // case N
          case 'N':
            // check if robot can keep moving north
            if (robot.position[0] === 10) {
              console.log('error cant go any more North');
              console.log('robots coordinates (y, x): ', robot.position);
              app();
            }
            // check if robot is carrying a crate
            else if (robot.state === 1) {
              North();
              crateNorth();
              x = calculatePositionX(commandsX);
              y = calculatePositionY(commandsY);
              crateX = calculateCratePositionX(crateCommandsX);
              crateY = calculateCratePositionY(crateCommandsY);

              robot.position = grid[y][x];
              crate1.position = grid[crateY][crateX];

              console.log('robots coordinates (y, x): ', robot.position);
              console.log('robot is carrying a crate type D to drop it');

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
          // case S
          case 'S':
            // check if robot can keep moving south
            if (robotPosition[0] === 1) {
              console.log('error cant go any more South');
              console.log('robots coordinates (y, x): ', robotPosition);
              app();
            }
            // check if robot is carrying a crate
            else if (robot.state === 1) {
              South();
              crateSouth();
              x = calculatePositionX(commandsX);
              y = calculatePositionY(commandsY);
              crateX = calculateCratePositionX(crateCommandsX);
              crateY = calculateCratePositionY(crateCommandsY);

              robot.position = grid[y][x];
              crate1.position = grid[crateY][crateX];

              console.log('robots coordinates (y, x): ', robot.position);
              console.log('robot is carrying a crate type D to drop it');

              robotCommands();
            } else {
              South();
              x = calculatePositionX(commandsX);
              y = calculatePositionY(commandsY);
              robotPosition = grid[y][x];

              console.log('robots coordinates (y, x): ', robotPosition);

              app();
            }
            break;
          // case E
          case 'E':
            // check if robot can keep moving east
            if (robotPosition[1] === 10) {
              console.log('error cant go any more East');
              console.log('robots coordinates (y, x): ', robotPosition);
              app();
            }
            // check if robot is carrying a crate
            else if (robot.state === 1) {
              East();
              crateEast();
              x = calculatePositionX(commandsX);
              y = calculatePositionY(commandsY);
              crateX = calculateCratePositionX(crateCommandsX);
              crateY = calculateCratePositionY(crateCommandsY);

              robot.position = grid[y][x];
              crate1.position = grid[crateY][crateX];

              console.log('robots coordinates (y, x): ', robot.position);
              console.log('robot is carrying a crate type D to drop it');

              robotCommands();
            } else {
              East();
              x = calculatePositionX(commandsX);
              y = calculatePositionY(commandsY);
              robotPosition = grid[y][x];

              console.log('robots coordinates (y, x): ', robotPosition);
              app();
            }
            break;
          // case W
          case 'W':
            // check if robot can keep moving west
            if (robotPosition[1] === 1) {
              console.log('error cant move anymore West');
              console.log('robots coordinates (y, x): ', robotPosition);
              app();
            }
            // check if robot is carrying a crate
            else if (robot.state === 1) {
              West();
              crateWest();
              x = calculatePositionX(commandsX);
              y = calculatePositionY(commandsY);
              crateX = calculateCratePositionX(crateCommandsX);
              crateY = calculateCratePositionY(crateCommandsY);

              robot.position = grid[y][x];
              crate1.position = grid[crateY][crateX];

              console.log('robots coordinates (y, x): ', robot.position);
              console.log('robot is carrying a crate type D to drop it');

              robotCommands();
            } else {
              West();
              x = calculatePositionX(commandsX);
              y = calculatePositionY(commandsY);
              robotPosition = grid[y][x];

              console.log('robots coordinates (y, x): ', robotPosition);
              app();
            }
            break;
          case 'D':
            if (robot.state === 1) {
              console.log('crate had been dropped at', crate1.position);
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
  if (robot.position === crate1.position) {
    console.log('crate here');
    carryCrate();
  } else {
    robotCommands();
  }
}

app();
