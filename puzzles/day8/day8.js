const { syncBuiltinESMExports } = require('module');
const { solve } = require('../input');

solve('puzzles/day8/day8.txt', (entries) => {
  const buildDecoder = (array) => {
    let decoder = {};
    let invertedDecoder = {};
    let fives = [], sixes = [];

    for(let code of array) {
      if(code.length === 2) { decoder[1] = code; }
      if(code.length === 3) { decoder[7] = code; }
      if(code.length === 4) { decoder[4] = code; }
      if(code.length === 7) { decoder[8] = code; }
      if(code.length === 5) { fives.push(code); }
      if(code.length === 6) { sixes.push(code); }
    }

    for(let five of fives) {
      let isTwo = new Set(five.split('').filter((x) => !new Set(decoder[4]).has(x))).size === 3;
      let isThree = new Set(decoder[7].split('').filter((x) => !new Set(five).has(x))).size === 0;
      if(isTwo) { decoder[2] = five; }
      else if(isThree) { decoder[3] = five; }
      else { decoder[5] = five; }
    }

    for(let six of sixes) {
      let isNine = new Set(six.split('').filter((x) => !new Set(decoder[3]).has(x))).size === 1;
      let isZero = new Set(decoder[5].split('').filter((x) => !new Set(six).has(x))).size === 1;
      if(isNine) { decoder[9] = six; }
      else if(isZero) { decoder[0] = six; }
      else { decoder[6] = six; }
    }

    for(let code in decoder) {
      invertedDecoder[decoder[code]] = code;
    }

    return invertedDecoder;
  }

  const getOutputValue = (decoder, signalwires) => {
    let output = '';

    for(let wire of signalwires) {
      let wireSorted = wire.split('').sort().join('');
      if(wireSorted in decoder) {
        output = output + decoder[wireSorted];
      }
    }
    
    return output;
  }

  const getSolution = () => {
    let inputs = [];
    let outputs = [];

    entries.forEach((entry) => {
      let p = entry.split(' | ');
      inputs.push(p[0]);
      outputs.push(p[1]);
    });

    let partOne = 0;
    let partTwo = 0;

    for(let i = 0; i < outputs.length; i++) {
      let signalwires = outputs[i].split(' ');

      for(let wire of signalwires) { 
        if(wire.length in {2:2, 4:4, 7:7, 3:3}){ 
          partOne++; 
        } 
      }

      let decoder = buildDecoder(inputs[i].split(' ').map((x) => x.split('').sort().join('')));
      partTwo += Number(getOutputValue(decoder, signalwires));
    }

    return [partOne, partTwo];
  };
  
  console.log(getSolution());
});