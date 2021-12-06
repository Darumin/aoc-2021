const { solve } = require('../input');

solve('puzzles/day6/day6.txt', (entries) => {
  const getLanternfishPopulation = () => {
    let lanternfish = entries[0].split(',').map((x) => Number(x));
    let fishbowl = {};

    for(let i = 0; i <= 8; i++) {
      fishbowl[i] = 0;
    }

    for(let fish of lanternfish) {
      fishbowl[fish] += 1;
    }

    let timeElapsed = 0;
    let totalDays = 80;
    // ... change to 256 for part 2

    while(timeElapsed < totalDays) {
      let newFishCycles = 0;

      for(let fish in fishbowl) {
        if(fishbowl[fish] === 0) { continue; }

        if(fish === '0') { 
          newFishCycles = fishbowl['0'];
          fishbowl['0'] = 0;
        } else {
          let newfish = fishbowl[fish];
          fishbowl[fish] = 0;
          
          let key = Number(fish) - 1;
          fishbowl[key] = newfish;
        }
      }

      fishbowl['6'] += newFishCycles;
      fishbowl['8'] += newFishCycles;
      timeElapsed++;
    }

    return Object.values(fishbowl).reduce((a, b) => { return a + b; }, 0);
  }

  console.log(getLanternfishPopulation());
});