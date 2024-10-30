const crypto = require('crypto');
const fs = require('fs');

const BUFFER_SIZE = 8192

exports.md5FileSync = async function(filePath) {
    return new Promise((resolve, reject) => {
        let hash = crypto.createHash('md5')
        let stream = fs.createReadStream(filePath)

        stream.on('error', function (err) {
            reject(err);
        })

        stream.on('data', function (data) {
            hash.update(data, 'utf8')
        })

        stream.on('end', function () {
            stream.close();
            resolve(hash.digest('hex'));
        })
    });
}

exports.md5File = function(path) {
    return new Promise((resolve, reject) => {
        const output = crypto.createHash('md5')
        const input = fs.createReadStream(path)

        input.on('error', (err) => {
            reject(err)
        })

        output.once('readable', () => {
            resolve(output.read().toString('hex'))
        })

        input.pipe(output)
    })
}

exports.md5 = function(str) {
    crypto.createHash('md5').update(str).digest("hex");
}