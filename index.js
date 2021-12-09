let elevations = 
`21999432103987894921985678989287678967899899965678`
  .split('')
  .map((x) => Number(x));

let i = 0;
let width = 10;

let north = elevations[i - width] === undefined ? 11 : elevations[i - width];
let south = elevations[i + width] === undefined ? 11 : elevations[i + width];
let east = (i + 1) % width === 0 || elevations[i + 1] === undefined ? 11 : elevations[i + 1];
let west = i % width === 0 || elevations[i - 1] === undefined ? 11 : elevations[i - 1];

console.log(north, south, east, west, elevations[i]);