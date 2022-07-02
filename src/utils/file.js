const fs = require('fs');
const path = require('path');
const logger = require('./logger');
module.exports = class FileUtil {
    /** 
     * 递归获取文件夹内的文件
     * @param folderPath 文件夹路径
     * @param exts （可选）扩展名集合数组。只取出该数组指定的文件类型
     * @return {Array}
     */
    static getFiles(folderPath, exts) {
        if (!fs.existsSync(folderPath)) return [];
        if (folderPath.charAt(folderPath.length - 1) != '/') folderPath += '/';
        var results = [];
        var files = fs.readdirSync(folderPath);
        for (var name of files) {
            if (fs.statSync(folderPath + name).isDirectory()) {
                results = results.concat(FileUtil.getFiles(folderPath + name, exts));
            } else {
                if (!!exts && exts.length) {
                    let ext=path.extname(name);
                    if (exts.indexOf(ext) >= 0) {
                        results.push(folderPath + name);
                    }
                } else {
                    results.push(folderPath + name);
                }
            }
        }
        return results;
    }
    /** 
     * 删除文件
     * @param folderPath 文件夹路径
     * @param extensions （可选）扩展名集合数组。只删除该数组指定的文件类型
     */
    static delFiles(folderPath, extensions) {
        let files = fs.readdirSync(folderPath);
        for (let fileName of files) {
            let filepath = folderPath + '/' + fileName;
            if (fs.statSync(filepath).isDirectory()) {
                FileUtil.delFiles(filepath, extensions);
            } else {
                if (!!extensions && extensions.length) {
                    let i = fileName.indexOf('.');
                    let extension = i > 0 ? fileName.substring(i + 1, fileName.length) : '';
                    if (extension && extensions.indexOf(extension) >= 0) {
                        fs.unlinkSync(filepath);
                    }
                } else {
                    fs.unlinkSync(filepath);
                }
            }
        }
    }

    /** 
     * 复制文件夹
     * @param fromPath 复制源文件夹
     * @param toPath 目标文件夹
     */
    static copyFolder(fromPath, toPath, ...excepts) {
        if (!fs.existsSync(fromPath)) {
            return;
        }
        if (!fs.existsSync(toPath)) {
            fs.mkdirSync(toPath);
        }
        let files = fs.readdirSync(fromPath);
        for (let fileName of files) {
            let filepath = fromPath + '/' + fileName;
            if (excepts.indexOf(filepath) >= 0) continue;
            if (fs.statSync(filepath).isDirectory()) {
                if (!fs.existsSync(toPath + '/' + fileName)) {
                    fs.mkdirSync(toPath + '/' + fileName);
                }
                FileUtil.copyFolder(filepath, toPath + '/' + fileName, ...excepts);
            } else {
                fs.writeFileSync(toPath + '/' + fileName, fs.readFileSync(filepath));
            }
        }
    }

    /** 
     * 复制文件到文件夹
     * @param filePath 复制源文件
     * @param toPath 目标文件夹
     * @param rename (可选)重命名
     */
    static copyTo(filePath, toPath, rename) {
        let index = toPath.lastIndexOf('/');
        let folderPath = toPath.substring(0, index);
        let fileName = filePath.substring(index + 1, filePath.length);
        fs.writeFileSync(folderPath + '/' + (rename ? rename : fileName), fs.readFileSync(filePath));
    }

    /** 
     * 复制文件 到目标文件夹
     * @param fromPath 当前文件
     * @param toPath 目标文件夹
     */
    static copyFile(filePath, toPath, newName) {
        if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) return;
        if (!fs.existsSync(toPath)) {
            fs.mkdirSync(toPath);
        }
        toPath = toPath.replace(/\\/, '/').replace(/\/\//, '/').replace(/\/\//, '/')
        filePath = filePath.replace(/\\/, '/').replace(/\/\//, '/').replace(/\/\//, '/')
        var index = filePath.lastIndexOf('.');
        if (index < 0 || index < (filePath.length - 6)) {
            return;
        }
        toPath = toPath.charAt(toPath.length - 1) != '/' ? (toPath + '/') : toPath;
        var name = newName ? newName : (filePath.substring(filePath.lastIndexOf('/') + 1, filePath.length));
        fs.writeFileSync(toPath + name, fs.readFileSync(filePath));
    }
    /** 
     * 创建文件夹-强制
     * @param folderpath 文件夹路径
     */
    static createFolder(folderpath) {
        if (!folderpath) return;
        folderpath = folderpath.replace(/\\/, '/');
        folderpath = folderpath.replace(/\/\//, '/');
        // if (path.indexOf(':')>=0) {
        //     path = path.substring(path.indexOf(':') + 1, path.length);
        // }
        let pathnames = folderpath.split('/');
        while (true) {
            if (!pathnames[0]) {
                pathnames.shift();
                continue;
            }
            break;
        }
        let fullpath = '';
        for (var p of pathnames) {
            fullpath += p + '/';
            //logger.log(fullP);
            if (!fs.existsSync(fullpath)) {
                //console.log('create:',fullP);
                fs.mkdirSync(fullpath);
            }
        }
    }

    /** 
     * 删除文件夹-强制
     * @param folderPath 文件夹路径
     */
    static removeFolder(folderPath) {
        if (!fs.existsSync(folderPath)) return;
        if (!fs.statSync(folderPath).isDirectory()) {
            fs.unlinkSync(folderPath);
            return;
        }
        var files = fs.readdirSync(folderPath);
        for (var name of files) {
            var curPath = folderPath + '/' + name;
            if (fs.statSync(curPath).isDirectory()) {
                this.removeFolder(curPath + '/');
            } else {
                //console.log("unlink", curPath)
                fs.unlinkSync(curPath);
            }
        }
        fs.rmdirSync(folderPath);
    }

    /** 
    * 清空文件夹
    * @param folderPath 文件夹路径
    */
    static clearFolder(folderPath) {
        if (!fs.existsSync(folderPath)) return;
        if (!fs.statSync(folderPath).isDirectory()) {
            return;
        }
        var files = fs.readdirSync(folderPath);
        for (var name of files) {
            var curPath = folderPath + '/' + name;
            if (fs.statSync(curPath).isDirectory()) {
                FileUtil.clearFolder(curPath);
                fs.rmdirSync(curPath);
            } else {
                //console.log("unlink", curPath)
                fs.unlinkSync(curPath);
            }
        }
    }

    /**写入文件 强制创建文件所有父级文件夹 */
    static writeFileCompel(filepath, data) {
        var pathNames = filepath.split('/');
        var head = pathNames.length > 1 ? pathNames.shift() : './';
        var name = pathNames.pop();
        if (head) {
            if (head == '.' || head == '..') {
                head += '/';
            } else {
                head += '/';
                if (!fs.existsSync(head)) {
                    fs.mkdirSync(head);
                }
            }
        }
        var curPath = head;
        for (var p of pathNames) {
            curPath += p;
            if (!fs.existsSync(curPath)) {
                fs.mkdirSync(curPath);
            }
            curPath += '/';
        }
        fs.writeFileSync(curPath + name, data);
    }

    /**重命名文件 */
    static renameFile(filepath, name, newName) {
        var data = fs.readFileSync(filepath + '/' + name);
        fs.unlinkSync(filepath + '/' + name);
        fs.writeFileSync(filepath + '/' + newName, data);
    }

    /**过滤指定扩展名的文件 */
    static filter(files, extention) {
        var results = [];
        for (var name of files) {
            var i = name.lastIndexOf('.');
            if (i == -1) {
                continue;
            }
            if (name.substring(i) != extention) {
                continue;
            }
            results.push(name);
        }
        return results;
    }

    /**修改文件内容 */
    static fileReplaceFiled(filepath, stringOrRegExp, replaceString) {
        var handler = new FileModifyHandler(filepath);
        handler.exec(content => {
            if (stringOrRegExp instanceof RegExp) {
                return content.replace(content.match(stringOrRegExp)[0], replaceString);
            } else {
                return content.replace(stringOrRegExp, replaceString);
            }
        })
        handler.end();
    }

    /**
     * 修改文件内容
     * @param { string } filepath
     * @param { ((filecontent:string)=>string)[]} methods
     * */
    static modifyFile(filepath, ...methods) {
        var handler = new FileModifyHandler(filepath);
        if (!methods.length) {
            return handler;//调用者自定义操作
        }
        //批量执行方法
        while (methods.length) {
            handler.exec(methods.shift());
        }
        handler.end();
    }
}
class FileModifyHandler {
    constructor(filepath) {
        this.filepath=filepath;
        this.content = fs.readFileSync(filepath, "utf-8");
    }
    exec(method) {
        this.content = method(this.content);
        return this;
    }
    end() {
        fs.writeFileSync(this.filepath, this.content, "utf-8");
    }
}
