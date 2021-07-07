const fs = require('fs')
const process = require('process');
const axios = require('axios')

function cat(file) {
    fs.readFile(file, 'utf8', function(err, data) {
        if (err) {
          console.error(err);
          process.exit(1);
        }
        console.log(data);
    });
}

async function webCat(url) {
    try {
        let resp = await axios.get(url);
        console.log(resp.data);
    } catch (err) {
        console.error(`Error ${url}: ${err}`);
        process.exit(1);
    }
}

let arg = process.argv[2]

if (arg.startsWith('http') || arg.startsWith('https')) {
    webCat(arg)
}
else {
    cat(arg)
}