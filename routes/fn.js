const fs = require('fs');

function readFile() {
    let json = fs.readFileSync("items.json", 'utf8');
    return JSON.parse(json);
}

function writeToFile(json) {
    fs.writeFile("items.json", json, function(err) {
        if (err) {
          console.error(err);
          process.exit(1);
        }
        console.log('Successfully wrote to file!');
    });
}

module.exports = { readFile, writeToFile }