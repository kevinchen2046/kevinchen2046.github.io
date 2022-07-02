var ByteArray =require('./byteArray').ByteArray;
var zlib = require("./zlib.beauty.js");

var fs = require('fs');
module.exports = class CompressUtil {

    /**
     * lzw中文压缩类
     * @type {*}
     */
    static lzwcnCompress(str) {
        var i = 0;
        var size = 0;
        var xstr = '';
        var chars = 256;
        var dict = [];
        for (i = 0; i < chars; i++) {
            dict[String(i)] = i;
        }
        var splitted = [];
        splitted = str.split("");
        var buffer = [];
        size = splitted.length;
        var current = '';
        var result = new String("");
        for (i = 0; i <= size; i++) {
            current = new String(splitted[i]);
            xstr = (buffer.length == 0) ? String(current.charCodeAt(0)) : (buffer.join("-") + "-" + String(current.charCodeAt(0)));
            if (dict[xstr] !== undefined) {
                buffer.push(current.charCodeAt(0));
            } else {
                result += String.fromCharCode(dict[buffer.join("-")]);
                dict[xstr] = chars;
                chars++;
                buffer = [];
                buffer.push(current.charCodeAt(0));
            }
        }
        return result;
    }

    static lzwcnDecompress(str) {
        var i;
        var chars = 256;
        var dict = [];
        for (i = 0; i < chars; i++) {
            dict[i] = String.fromCharCode(i);
        }
        var original = new String(str);
        var splitted = original.split("");
        var size = splitted.length;
        var buffer = new String("");
        var chain = new String("");
        var result = new String("");
        for (i = 0; i < size; i++) {
            var code = original.charCodeAt(i);
            var current = dict[code];
            if (buffer == "") {
                buffer = current;
                result += current;
            } else {
                if (code <= 255) {
                    result += current;
                    chain = buffer + current;
                    dict[chars] = chain;
                    chars++;
                    buffer = current;
                } else {
                    chain = dict[code];
                    if (chain == null) {
                        chain = buffer + buffer.slice(0, 1);
                    }
                    result += chain;
                    dict[chars] = buffer + chain.slice(0, 1);
                    chars++;
                    buffer = chain;
                }
            }
        }
        return result;
    }

    static utfEncode(input) {
        if (input instanceof ByteArray) {
            input = new Buffer(input.buffer);
        } else if (input instanceof Buffer) {
            input = input;
        } else if (input instanceof ArrayBuffer) {
            input = input.buffer;
        }
        input = new Uint8Array(input);
        console.log('encode:', input.length);
        //zlib压缩
        var deflate = new zlib.Zlib.Deflate(input);
        var compressed = deflate.compress();
        return compressed
    }
    static utfDecode(input) {
        if (input instanceof ByteArray) {
            input = new Buffer(input.buffer);
        } else if (input instanceof Buffer) {
            input = input;
        } else if (input instanceof ArrayBuffer) {
            input = input.buffer;
        }
        input = new Uint8Array(input);
        console.log('decode:', input.length);
        //zlib解压缩
        var inflate = new zlib.Zlib.Inflate(input);
        var deplain = inflate.decompress();
        var newDeplain = new Uint8Array(deplain.length);
        for (var i = 0; i < deplain.length; i++) {
            newDeplain[i] = deplain[i];
        }
        return newDeplain;
    }

    /** uncompress需要引用zlib.min.js */
    static zlibUncompress(buffer) {
        var inflate = new zlib.Zlib.Inflate(new Uint8Array(buffer));
        var inbuffer = inflate.decompress();
        return Buffer.from(inbuffer,'binary');
    }

    /** compress需要引用zlib.min.js */
    static zlibCompress(buffer) {
        var deflate = new zlib.Zlib.Deflate(new Uint8Array(buffer));
        var inbuffer = deflate.compress();
        return Buffer.from(inbuffer,'binary');
    }

    /**
     * packInfo [{path:'',needReplace:false}]
     */
    static bytesEncode(packInfo) {
        var contentBytes;
        var bytes = new ByteArray();
        for (var info of packInfo) {
            var name = info.path.substring(info.path.lastIndexOf('/') + 1, info.path.length);

            var content = fs.readFileSync(info.path).toString();
            if (info.needReplace) content = content.replace(/&/g, '//&').replace(/，/g, '//，');
            //console.log('替换特殊字符...')
            var compressBytes = new ByteArray();
            compressBytes.writeUTFBytes(content);
            console.log('---------------------------------------');
            console.log(name)
            var isCompress = false;
            if (compressBytes.length > 32768) {
                console.log('压缩前:', compressBytes.length, compressBytes.buffer);
                compressBytes = new ByteArray(ByteArray.compress(compressBytes.buffer));
                console.log('压缩后:', compressBytes.length, compressBytes.buffer);
                isCompress = true;
            }

            //写单个文件
            bytes.writeUTF(name);
            bytes.writeBoolean(info.needReplace);
            bytes.writeBoolean(isCompress);
            bytes.writeUnsignedInt(compressBytes.length);
            bytes.writeBytes(compressBytes, 0, compressBytes.length);
        }
        bytes.position = 0;
        return Buffer(bytes.buffer);
    }

    static bytesDecode(buffer, callback, complete) {
        var contentBytes;
        var bytes = new ByteArray(buffer);
        while (bytes.bytesAvailable) {
            console.log('---------------------------------------');
            var name = bytes.readUTF();
            var needReplace = bytes.readBoolean();
            var isCompress = bytes.readBoolean();
            var length = bytes.readUnsignedInt();
            contentBytes = new ByteArray();
            bytes.readBytes(contentBytes, 0, length);
            if (isCompress) {
                contentBytes.position = 0;
                console.log('截取字节长度:', length);
                //contentBytes.uncompress();
                contentBytes = new ByteArray(ByteArray.uncompress(contentBytes.buffer));
                console.log('解压后字节长度:', contentBytes.buffer.byteLength);
            }
            console.log('[' + name + '] 文件字节长度:', contentBytes.length);
            var content = contentBytes.readUTFBytes(contentBytes.length);
            if (needReplace) content = content.replace(/\/\//g, '');
            callback(name, content);
        }
        complete();
    }
}
