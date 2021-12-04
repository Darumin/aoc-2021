const getMagicNumber = (num) => {
  return (Math.floor(num / 25) * 25)
}

let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
console.log(getMagicNumber(27))