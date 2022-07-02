

let fs = require('fs');
let crypto = require('crypto');

// enum
const AlgorithmType = {
    SHA256: "SHA256",
    SHA1: "SHA1",
    MD5: "MD5"
}

class FileHash {
    /**
     * promise
     * @param filePath
     * @param algorithm
     * @returns {Promise<any>}
     */
    static Sha256(filePath, algorithm) {
        return new Promise((resolve, reject) => {
            if (!fs.existsSync(filePath)) {
                reject("the file does not exist, make sure your file is correct!");
                return;
            }
            if (!algorithmType.hasOwnProperty(algorithm)) {
                reject("nonsupport algorithm, make sure your algorithm is [SHA256,SHA1,MD5] !");
                return;
            }
            let stream = fs.createReadStream(filePath);
            let hash = crypto.createHash(algorithm.toLowerCase());

            stream.on('data', function (data) {
                hash.update(data)
            })

            stream.on('end', function () {
                let final = hash.digest('hex');
                resolve(final)
            })

            stream.on('error', function (err) {
                reject(err)
            })
        })
    }

    /**
     * async
     * @param filePath
     * @param algorithm
     * @returns {string|Error}
     */
    static sha256Async(filePath, algorithm) {
        if (!fs.existsSync(filePath)) {
            return new Error("the file does not exist, make sure your file is correct!");
        }
        if (!algorithmType.hasOwnProperty(algorithm)) {
            return new Error("nonsupport algorithm, make sure your algorithm is [SHA256,SHA1,MD5] !");
        }
        let buffer = fs.readFileSync(filePath);
        let hash = crypto.createHash(algorithm.toLowerCase());
        hash.update(buffer)
        let final = hash.digest('hex');
        return final;
    }
}
exports.FileHash = FileHash;
exports.AlgorithmType = AlgorithmType;
