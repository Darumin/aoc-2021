const { solve } = require('../input');

solve('puzzles/day5/day5.txt', (entries) => {
  const plotVentLine = (map, a, b, diagonals) => {
    let x1 = Number(a[0]), y1 = Number(a[1]);
    let x2 = Number(b[0]), y2 = Number(b[1]);

    let vertical = x1 === x2;
    let horizontal = y1 === y2;

    if(vertical || horizontal){
      // set correct start and end points to increment if vertical or horizontal line
      let start = vertical ? (y1 < y2 ? y1 : y2) : (x1 < x2 ? x1 : x2);
      let end = vertical ? (y1 >= y2 ? y1 : y2) : (x1 >= x2 ? x1 : x2);
      
      while(start <= end) {
        let mark = vertical ? x1 + ',' + start : start + ',' + y1;

        if(mark in map) { map[mark] += 1; }
        else { map[mark] = 1; }

        start++;
      }
    } else {
      // this block checks for diagonal lines
      if(!diagonals) { return; }

      let incrementingX = x1 < x2 ? true : false;
      let incrementingY = y1 < y2 ? true : false;
      let startX = x1, startY = y1;

      let endingMark = x2 + ',' + y2;
      if(endingMark in map) { map[endingMark] += 1; }
      else { map[endingMark] = 1; }

      while(startX !== x2 && startY !== y2) {
        let mark = startX + ',' + startY;

        if(mark in map) { map[mark] += 1; }
        else { map[mark] = 1; }

        startX += incrementingX ? 1 : -1;
        startY += incrementingY ? 1 : -1;
      }
    }
  };

  const mapVentLines = (checkForDiagonals=false) => {
    const ventMap = {};

    let answer = 0;

    for(let entry of entries) {
      const points = entry.split(' -> ');

      const coordsA = points[0].split(',');
      const coordsB = points[1].split(',');

      plotVentLine(ventMap, coordsA, coordsB, checkForDiagonals);
    }

    for(let mark in ventMap) {
      if(ventMap[mark] >= 2) {
        answer++;
      }
    }

    return answer;
  };

  console.log('Part One:', mapVentLines());
  console.log('Part Two:', mapVentLines(true));
})