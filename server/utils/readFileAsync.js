const path = require('path');
const fs = require('fs');

const readFileAsync = (pathTo, fileName) => {
    return new Promise((resolve, reject) => {
        fs.readFile(
            path.join(__dirname, '..', pathTo, fileName),
            'utf8',
            (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(Buffer.from(data).toString());
                }
            }
        )
    })
}

module.exports = readFileAsync;