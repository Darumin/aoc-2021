const fs = require('fs');

const solve = (pathToTxt, cb) => {
  return fs.readFile(pathToTxt, 'utf-8', (err, data) => {
    if (err) throw err;

    let entries = data.split('\r\n');
    
    cb(entries);
  });
}

module.exports = { solve };