const path = require('path');
const fs = require('fs');

const writeFileAsync = (pathTo, fileName, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(
            path.join(__dirname, '..', pathTo, fileName),
            JSON.stringify(data),
            (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            }
        )
    })
}

module.exports = writeFileAsync;