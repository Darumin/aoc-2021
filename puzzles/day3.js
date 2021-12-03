const { solve } = require('./input');

solve('puzzles/day3.txt', (entries) => {
  // power consumption
  const partOne = () => {
    var numBits = entries[0].length;
    let difference = entries.length;
    let gammaRate = '', epsilonRate = '';
    var occurrences = {};

    for(let entry of entries) {
      for(let i = 0; i < numBits; i++) {
        let bit = entry[i];
        if(bit === '1' && i in occurrences) {
          occurrences[i] += 1;

        } else if(bit === '1') {
          occurrences[i] = 1;
        }
      }
    }

    for(let key in occurrences) {
      let val = occurrences[key];

      if(difference - val >= val) {
        gammaRate += '0';
        epsilonRate += '1';
      } else {
        gammaRate += '1';
        epsilonRate += '0';
      }
    }

    console.log(parseInt(gammaRate, 2) * parseInt(epsilonRate, 2))
  };

  const partTwoHelper = (arr, i, bits, decide) => {
    if(arr.length === 1 || i === bits) {
      return arr[0];
    }

    let left = [], right = [];

    for(let entry of arr) {
      let bit = entry[i];

      if(bit === '1') { left.push(entry); } 
      else { right.push(entry); }
    }

    return partTwoHelper(decide(left, right), i + 1, bits, decide);
  };

  // life support rating
  const partTwo = () => {
    let numBits = entries[0].length;

    let oxygenRating = partTwoHelper(entries, 0, numBits, (x, y) => {
      if(x.length >= y.length) { return x; } 
      else { return y; }
    });

    let scrubberRating = partTwoHelper(entries, 0, numBits, (x, y) => {
      if(x.length < y.length) { return x; }
      else { return y; }
    })

    return parseInt(oxygenRating, 2) * parseInt(scrubberRating, 2);
  };

  console.log(partOne());
  console.log(partTwo());
});