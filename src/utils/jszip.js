var JSZIP = require('JSZIP');
var fs = require('fs');
var path = require('path');
module.exports = class Zip {

    /** 创建压缩文件 */
    static create() {
        let zip = new JSZIP();
        return zip;
    }

    /** 保存压缩文件 */
    static async save(zip, outPath) {
        var content = await zip.generateAsync({//设置压缩格式，开始打包
            type: "nodebuffer",//nodejs用
            compression: "DEFLATE",//压缩算法
            compressionOptions: {//压缩级别
                level: 9
            }
        });
        console.log('写入压缩文件:', outPath);
        if (outPath.indexOf('.zip') < 0) {
            outPath += new Date().getTime() + '.zip';
        }
        fs.writeFileSync(outPath, content, "utf-8");//将打包的内容写入 当前目录下的 result.zip中
    }

    /** 添加者目录到压缩文件 */
    static pushFolder(zip, folderPath) {
        console.log('读取压缩目录:', folderPath);
        var that = this;
        let files = fs.readdirSync(folderPath);//读取目录中的所有文件及文件夹（同步操作）
        files.forEach(function (fileName, index) {//遍历检测目录中的文件
            //console.log(fileName, index);//打印当前读取的文件名
            let filePath = folderPath + "/" + fileName;
            let file = fs.statSync(filePath);//获取一个文件的属性
            if (file.isDirectory()) {//如果是目录的话，继续查询
                let childZip = zip.folder(fileName);//压缩对象中生成该目录
                that.pushFolder(childZip, filePath);//重新检索目录文件
            } else {
                zip.file(fileName, fs.readFileSync(filePath));//压缩目录添加文件
            }
        });
    }

    /** 添加文件集合到压缩文件 */
    static pushFile(zip, filePath, fileName) {
        if (filePath instanceof Array) {
            for (var p of filePath) {
                console.log(fileName, p)
                zip.file(fileName, fs.readFileSync(p));
            }
        } else {
            zip.file(fileName, fs.readFileSync(filePath));
        }
    }

    /////////////////////////////////////////////////////////

    /** 
     * 压缩文件/目录 普通压缩
     * @param curpaths 指定路径或者路径集合
     * @param outPath 输出文件地址
     */
    static async compress(curpaths, outPath) {
        let zip = this.create();
        await this.compressHandler(zip, curpaths);
        await this.save(zip, outPath);
    }
    /** 
     * 压缩目录 以folderPath为根节点
     * @param folderPath 压缩文件夹路径
     * @param outPath 输出文件地址
     */
    static async compressFolder(folderPath, outPath) {
        let zip = this.create();
        this.pushFolder(zip, folderPath);
        await this.save(zip, outPath);
    }

    /** 
     * 压缩目录到指定的压缩文件夹
     * @param folderName 根节点支持.分隔符
     * @param curpaths 指定路径或者路径集合
     * @param outPath 输出文件地址
     */
    static async compressToFolder(folderName, curpaths, outPath) {
        let mainZip = this.create()
        var arr = folderName.split('.');
        var zip = mainZip;
        while (arr.length) {
            var name = arr.shift();
            zip = zip.folder(name);
        }
        await this.compressHandler(zip, curpath);
        await this.save(mainZip, outPath);
    }

    static async compressHandler(zip, curpath) {
        if (curpath instanceof Array) {
            for (var p of curpath) {
                if (fs.statSync(p).isDirectory()) {
                    this.pushFolder(zip, p);
                } else {
                    this.pushFile(zip, p, path.basename(p));
                }
            }
        } else {
            this.pushFolder(zip, curpath);
        }
    }
}