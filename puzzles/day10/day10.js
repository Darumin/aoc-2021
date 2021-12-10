const { solve } = require('../input');

solve('puzzles/day10/day10.txt', (entries) => {
  const parseChunks = (line, chunkRules) => {
    let unchunked = [];

    for(let i = 0; i < line.length; i++) {
      let char = line[i];

      if(char in chunkRules) {
        unchunked.push(char);
      } else {
        if(unchunked.length === 0) { return false; }
        let chunkStart = unchunked.pop();
        if(char !== chunkRules[chunkStart]) {
          return [false, char];
        }
      }
    }

    return [true, unchunked];
  };

  const getSyntaxErrorScore = (brackets, errorRules) => {
    let score = 0;

    for(let bracket of brackets) {
      score += errorRules[bracket];
    }

    return score;
  };

  const getAutocompleteScore = (brackets, autoRules) => {
    let score = 0;

    for(let bracket of brackets) {
      score *= 5;
      score += autoRules[bracket];
    }

    return score;
  };

  const completeLine = (arr, chunkRules) => {
    let completedChunks = '';

    while(arr.length !== 0) {
      let bracket = arr.pop();
      completedChunks += chunkRules[bracket];
    }

    return completedChunks;
  };

  const getSubsystemSyntaxScores = () => {
    const chunkRules = {
      '[': ']',
      '(': ')',
      '{': '}',
      '<': '>',
    };

    const autoRules = {
      ')': 1,
      ']': 2,
      '}': 3,
      '>': 4,
    };

    const errorRules = {
      ')': 3,
      ']': 57,
      '}': 1197,
      '>': 25137,
    };

    let corruptedChunks = '';
    let autocompleteScores = []

    for(let line of entries) {
      let parsed = parseChunks(line, chunkRules);
      let lineStatus = parsed[0];
      let lineResult = parsed[1];

      if(lineStatus) {
        let chunks = completeLine(lineResult, chunkRules);
        let score = getAutocompleteScore(chunks, autoRules);
        autocompleteScores.push(score);
      } else {
        corruptedChunks += lineResult;
      }
    }

    autocompleteScores.sort((a, b) => a - b);

    return [
      getSyntaxErrorScore(corruptedChunks, errorRules),
      autocompleteScores[Math.floor(autocompleteScores.length / 2)]
    ];
  };
  
  console.log(getSubsystemSyntaxScores());
});