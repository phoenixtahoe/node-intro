const fs = require('fs')
const process = require('process');
const axios = require('axios')

function writeOut(text, file) {
    if (out) {
        fs.writeFile(file, text, 'utf8', function(err) {
            if (err) {
                console.error(`Error ${out}: ${err}`);
                process.exit(1);
            }
        });
    } else {
        console.log(text);
    }
}

function cat(file, out) {
    fs.readFile(file, 'utf8', function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        writeOut(data, out);
    });
}

async function webCat(url, out) {
    try {
        let resp = await axios.get(url);
        writeOut(resp.data, out);
    } catch (err) {
        console.error(`Error ${url}: ${err}`);
        process.exit(1);
    }
}

let out
let arg = process.argv[2]

if (arg.startsWith('--out')) {
    out = process.argv[3];
    arg = process.argv[4];
}

if (arg.startsWith('http') || arg.startsWith('https')) {
    webCat(arg, out)
} else {
    cat(arg, out)
}