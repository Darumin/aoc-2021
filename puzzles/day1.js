const fs = require('fs');
  
(() => {
  fs.readFile('puzzles/day1.txt', 'utf-8', (err, data) => {
      if (err) throw err;

      const entries = data.split('\r\n');
   
      let current = Number(entries[0]);
      let currentWindowSum = current + Number(entries[1]) + Number(entries[2]);
      let increases = 0, slidingIncreases = 0;

      for(let i = 1; i < entries.length; i++) {
        let first = Number(entries[i]);
        let second = Number(entries[i + 1]);
        let third = Number(entries[i + 2]);

        if(third) {
          let windowSum = first + second + third;
          if(windowSum > currentWindowSum) { slidingIncreases++; }
          currentWindowSum = windowSum;
        }

        if(first > current) { increases++; }

        current = first;
      }

      console.log(`Part 1 ${increases}`);
      console.log(`Part 2 ${slidingIncreases}`);
  });
})();
