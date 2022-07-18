

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
     * @param {AlgorithmType} algorithm?
     * @returns {Promise<any>}
     */
    static hashFile(filePath, algorithm) {
        if (algorithm == undefined) algorithm = AlgorithmType.SHA256;
        return new Promise((resolve, reject) => {
            if (!fs.existsSync(filePath)) {
                reject("the file does not exist, make sure your file is correct!");
                return;
            }
            if (!AlgorithmType.hasOwnProperty(algorithm)) {
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
     * @param {AlgorithmType} algorithm?
     * @returns {string|Error}
     */
    static hashFileSync(filePath, algorithm) {
        if (!fs.existsSync(filePath)) {
            return new Error("the file does not exist, make sure your file is correct!");
        }
        let buffer = fs.readFileSync(filePath);
        return FileHash.hashContentSync(buffer, algorithm);
    }

    static hashContentSync(content, algorithm) {
        if (algorithm == undefined) algorithm = AlgorithmType.SHA256;
        if (!AlgorithmType.hasOwnProperty(algorithm)) {
            return new Error("nonsupport algorithm, make sure your algorithm is [SHA256,SHA1,MD5] !");
        }
        return FileHash.__getHash(content, algorithm);
    }

    static __getHash(buffer, algorithm) {
        let hash = crypto.createHash(algorithm.toLowerCase());
        hash.update(buffer)
        let final = hash.digest('hex');
        return final;
    }
}
exports.FileHash = FileHash;
exports.AlgorithmType = AlgorithmType;
