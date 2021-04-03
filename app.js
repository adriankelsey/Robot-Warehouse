// main grid array
let grid = []

function createGrid(){
    for(let x = 0; x < 10; x++){
        // creates 10 arrays to house cells
        grid[x] = []
        for(let y = 0; y < 10; y++){
            // loop createCell 10 times
            createCell(x, y)
        }
    }
}

function createCell(x, y){
    // new cell with x and y values passed to them
    grid[x][y] = [x + 1, y + 1]
}

createGrid()
