const fs = require('fs')
const process = require('process');

function cat(file) {
    fs.readFile(file, 'utf8', function(err, data) {
        if (err) {
          console.error(err);
          process.exit(1);
        }
        console.log(data);
      });
}

cat(process.argv[2])