const { solve } = require('../input');

solve('puzzles/day7/day7.txt', (entries) => {
  let crabPositions = entries[0].split(',').map((x) => Number(x)).sort((a, b) => a - b);
  let crabCalculations = {};

  const calculateFuel = (n) => {
    let fuel = 0;
    
    for(let i = 0; i < crabPositions.length; i++) {
      let diff = Math.abs(crabPositions[i] - n);
      let totalFuelIncrease = 0;

      if(diff in crabCalculations){ 
        fuel += crabCalculations[diff]; 
      } else {
        for(let j = 1; j <= diff; j++) {
          totalFuelIncrease += j;
          fuel += j;
        }

        crabCalculations[diff] = totalFuelIncrease;
      }
    }

    return fuel;
  }

  const bruteForceCrabs = () => {
    let minimumFuel = +Infinity;
    let lastCrabPosition = crabPositions[crabPositions.length - 1];

    for(let i = 0; i <= lastCrabPosition; i++) {
      let fuel = calculateFuel(i);

      if(fuel < minimumFuel) {
        minimumFuel = fuel;
      }
    }

    return minimumFuel;
  }

  console.log(bruteForceCrabs());
});