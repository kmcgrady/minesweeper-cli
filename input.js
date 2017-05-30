const readline = require('readline');

const rl = readline.createInterface(process.stdin, process.stdout);
rl.setPrompt('> ');

function input() {
  return new Promise((resolve, reject) => {
    rl.prompt();
    rl.on('line', function(line) {
      resolve(line);
    }).on('close', function() {
      reject();
    });
  });
}

module.exports = input;
