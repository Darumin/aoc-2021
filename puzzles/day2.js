const fs = require('fs');
  
(() => {
  fs.readFile('puzzles/day2.txt', 'utf-8', (err, data) => {
      if (err) throw err;

      const entries = data.split('\r\n');

      const partOne = () => {
        let horizontalPos = 0, depth = 0;

        for(let entry of entries) {
          let directive = entry.split(' ');
          let command = directive[0];
          let units = Number(directive[1]);
  
          if(command === 'forward') {
            horizontalPos += units;
          } else if (command === 'down') {
            depth += units;
          } else if (command === 'up') {
            depth -= units;
          }
        }

        return horizontalPos * depth;
      }

      const partTwo = () => {
        let horizontalPos = 0, depth = 0, aim = 0;

        for(let entry of entries) {
          let directive = entry.split(' ');
          let command = directive[0];
          let units = Number(directive[1]);
  
          if(command === 'forward') {
            horizontalPos += units;
            depth += (aim * units);
          } else if (command === 'down') {
            aim += units;
          } else if (command === 'up') {
            aim -= units;
          }
        }
        
        return horizontalPos * depth;
      }
     
      console.log('Part 1:', partOne());
      console.log('Part 2:', partTwo())
  });
})();
