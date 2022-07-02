var fs = require('fs');
const path = require('path');
var utils = require('./utils');

module.exports = class PublishUtils {

    static get TAG() {
        return {
            clear: '--clear',
            platform: '--platform',
            language: '--language',
        }
    }

    /**获得最后一个发布路径 */
    static getLastReleasePath() {
        var folders = fs.readdirSync('./bin-release/web/');
        if (!folders || !folders.length) return [];
        var timestamp = 0;
        for (var name of folders) {
            timestamp = Math.max(parseInt(name), timestamp);
        }
        return './bin-release/web/' + timestamp + '/';
    }


    /*对JS文件进行混淆*/
    static async obfuscatorUseManifest(manifestPath) {
        let folderPath = path.dirname(manifestPath);
        var manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
        for (var name of manifest.game) {
            await utils.obfuscatorFile(`${folderPath}/${name}`);
        }
    }

    /**对文件中变量填值*/
    static fillValue(file, objectName, property, value) {
        var content = fs.readFileSync(file, 'utf-8').toString();
        var index = content.indexOf(objectName);
        if (index == -1) {
            console.error(`在文件${file}未找到名称${objectName},填值失败...`);
            return;
        }
        // if(content.indexOf(objectName,index+objectName.length)>0){
        //     console.error(`在文件${file}找到多个名称${objectName}!填值失败...`);
        //     return;
        // }
        index = content.indexOf(property, index + objectName.length);
        if (index == -1) {
            console.error(`在文件${file}未找到名称${property},填值失败...`);
            return;
        }
        var startIndex;
        var startChar;
        var i = index + property.length;
        while (true) {
            var char = content.charAt(i);
            if (char == ':' || char == ' ' || char == '    ') {
                i++;
                continue;
            }
            if (char == "'" || char == '"') {
                startIndex = i;
                startChar = char;
                break;
            }
            break;
        }
        if (!startIndex) {
            console.error(`在文件${file}中的属性${property}格式不合法,填值失败...`);
            return;
        }
        var endIndex = content.indexOf(startChar, startIndex + 1);
        if (!endIndex) {
            console.error(`在文件${file}中的属性${property}格式不合法,填值失败...`);
            return;
        }
        content = content.substring(0, startIndex + 1) + value + content.substring(endIndex, content.length);
        fs.writeFileSync(file, content, 'utf-8');
    }


}