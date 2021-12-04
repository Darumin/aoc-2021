const { solve } = require('./input');

solve('puzzles/day4.txt', (entries) => {

  const parseBoard = (board) => {
    let newBoard = [];

    for(let line of board) {
      let numbers = line.split(' ');
      for(let number of numbers) {
        if(number !== '') {
          newBoard.push(Number(number));
        }
      }
    }

    return newBoard;
  };

  const partOne = () => {
    let numbersToCall = entries[0].split(',').map((x) => Number(x));
    let boards = [];
    let board = [];

    for(let i = 2; i < entries.length; i++) {
      if(entries[i] === '') {
        boards.push(...parseBoard(board));
        board = [];
      } else {
        board.push(entries[i]);
      }
    }

    boards.push(...parseBoard(board));

    const findBingo = () => {
      let magicTable = {};

      for(let number of numbersToCall) {
        for(let i = 0; i < boards.length; i++) {
          if(number === boards[i] && boards[i] !== 0) {
            // console.log(boards[i], number)
            boards[i] = -1;
          }

          let magicNumberA = Math.floor(i / 5) * 5;
          let magicNumberB = (Math.floor(i / 25) * 25) + (i % 5);
          let sumA = 0, sumB = 0, k = 5;
          for(let j = magicNumberA; j < magicNumberA + 5; j++) {
            sumA += boards[j] === -1 ? 1 : 0;
            sumB += boards[magicNumberB + k] === -1 ? 1 : 0;
            k += 5;
          }

          if(sumA === 5 || sumB === 5) {
            let bingoSum = 0;
            let magicNumberC = magicNumberB - (i % 5);
            magicTable[magicNumberC] = true;
            

            for(let m = magicNumberC; m < magicNumberC + 25; m++) {
              if(boards[m] === -1) { continue; }

              bingoSum += boards[m];
            }


            // solution 2
            if(Object.keys(magicTable).length === boards.length / 25) {
              return bingoSum * number;
            }
            
            // solution 1
            // return number * bingoSum; 
          }
        }
      }
    }
    
    console.log(findBingo());
  }

  partOne();
});