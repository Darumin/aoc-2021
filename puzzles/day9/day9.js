const { solve } = require('../input');

solve('puzzles/day9/day9.txt', (entries) => {
  let elevations = entries.map((x) => x.split('')).flat().map((y) => Number(y));

  let width = entries[entries.length - 1].length;
  
  let visited = {};
  let basins = [];
  let basin = 0;
  let riskLevel = 0;

  const scanElevations = (i) => {
    if(elevations[i] === 9 || elevations[i] === undefined) { return; }

    visited[i] = true;
    basin++;

    let north = elevations[i - width] === undefined ? 11 : elevations[i - width];
    let south = elevations[i + width] === undefined ? 11 : elevations[i + width];
    let east = (i + 1) % width === 0 || elevations[i + 1] === undefined ? 11 : elevations[i + 1];
    let west = i % width === 0 || elevations[i - 1] === undefined ? 11 : elevations[i - 1];

    let x = elevations[i];

    if(north >= x && north !== 11 && !(visited[i - width])) { scanElevations(i - width); }
    if(south >= x && south !== 11 && !(visited[i + width])) { scanElevations(i + width); }
    if(east >= x && east !== 11 && !(visited[i + 1])) { scanElevations(i + 1); }
    if(west >= x && west !== 11 && !(visited[i - 1])) { scanElevations(i - 1); }

    return x < north && x < east && x < south && x < west;
  }

  for(let i = 0; i < elevations.length; i++) {
    if(scanElevations(i)) {
      riskLevel += elevations[i] + 1;
      basins.push(basin);
    };

    basin = 0;
    visited = {};
  }
  
  basins.sort((a, b) => a - b)
  let partTwo = basins[basins.length - 1] * basins[basins.length - 2] * basins[basins.length - 3]

  console.log(riskLevel);
  console.log(partTwo);
});