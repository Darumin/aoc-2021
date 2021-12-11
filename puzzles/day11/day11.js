const { off } = require('process');
const { solve } = require('../input');

solve('puzzles/day11/day11.txt', (entries) => {
  let width = entries[0].length;
  let dumbos = entries.map((x) => x.split('').map((z) => Number(z)));
  let flashes = 0;

  const flash = (i, j) => {
    dumbos[i][j] = null;
    flashes += 1;

    let positions = [
      [i - 1, j],
      [i + 1, j],
      [i, j + 1],
      [i, j - 1],
      [i + 1, j + 1],
      [i - 1, j - 1],
      [i + 1, j - 1],
      [i - 1, j + 1]
    ];

    for(let pos of positions) {
      let x = pos[0];
      let y = pos[1];

      if(y < 0 || y >= width || x < 0 || x > dumbos.length - 1) { continue; }
      if(dumbos[x][y] === null) { continue; }

      dumbos[x][y] += 1;

      if(dumbos[x][y] > 9) {
        flash(x, y);
      }
    }
  }

  const step = () => {
    let simultaneousFlashCounter = 0;
    let flashPoints = [];

    for(let i = 0; i < dumbos.length; i++) {
      for(let j = 0; j < dumbos[i].length; j++) {
        dumbos[i][j] += 1;

        if(dumbos[i][j] > 9) {
          flashPoints.push([i, j]);
        }
      }
    }

    for(let coords of flashPoints) {
      let x = coords[0], y = coords[1];
      if(dumbos[x][y] > 9) {
        flash(x, y);
      }
    }

    for(let i = 0; i < dumbos.length; i++) {
      for(let j = 0; j < dumbos[i].length; j++) {
        if(dumbos[i][j] === null) {
          dumbos[i][j] = 0;
          simultaneousFlashCounter++;
        }
      }
    }

    return simultaneousFlashCounter;
  }

  const runSteps = () => {
    let generations = 0;
    let frozenGeneration;
    let counter;

    while(counter !== dumbos.length * width) {
      if(generations === 100) { 
        frozenGeneration = flashes; 
      }

      counter = step();
      generations++;
    }

    return `Part 1: ${frozenGeneration}, Part 2: ${generations}`;
  }

  console.log(runSteps());
});