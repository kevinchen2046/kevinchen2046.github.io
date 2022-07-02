let fs = require("fs");
const Jimp = require("jimp");
let PNG = require("pngjs").PNG;

module.exports = class ImageUtil {
    static __readImage(filepath) {
        return new Image(filepath).read();
    }

    static async resize(imagepath, outpath, width, height, quality) {
        if (width == undefined) width = 200;
        if (height == undefined) height = 200;
        if (quality == undefined) quality = 80;
        var png = await Jimp.read(imagepath);
        return new Promise(reslove => {
            png.resize(200, 200).quality(80).write(outpath, reslove);
        })
    }
    /**
     * 灰度
     * @returns 
     */
    static async gray(imagepath, outpath) {
        let image = await this.__readImage(imagepath);
        image.each((x, y) => {
            const { r, g, b } = image.getPixel(x, y);
            /**整数方法： */
            let GRAY = (r * 30 + g * 59 + b * 11) / 100;
            /**移位方法： */
            //let GRAY = (R * 77 + G * 151 + B * 28) >> 8;
            /**平均值法： */
            // let GRAY =n (R + G + B) / 3;
            image.setPixel(x, y, GRAY, GRAY, GRAY);
        });
        image.write(outpath);
    }

    /**
     * 减淡
     * @returns 
     */
    static async fade(imagepath, outpath, percent) {
        if (percent == undefined) percent = 0.5;
        let repercent = 1 - percent;
        let image = await this.__readImage(imagepath);
        image.each((x, y) => {
            const { r, g, b } = image.getPixel(x, y);
            let GRAY = (r * 30 + g * 59 + b * 11) / 100;
            image.setPixel(x, y, Math.min(0xFF, GRAY * repercent + r * percent) >> 0, Math.min(0xFF, GRAY * repercent + g * percent) >> 0, Math.min(0xFF, GRAY * repercent + b * percent) >> 0);
        });
        image.write(outpath);
    }
    /**
     * 褪色
     */
    static async sepia(imagepath, outpath) {
        let image = await this.__readImage(imagepath);
        image.each((x, y) => {
            const { r, g, b } = image.getPixel(x, y);
            /**整数方法： */
            let GRAY = (r * 30 + g * 59 + b * 11) / 100;
            image.setPixel(x, y, Math.min(0xFF, GRAY + 22), GRAY, Math.max(0, GRAY - 22));
        });
        image.write(outpath);
    }
}

class Image {
    constructor(filepath) {
        this._filepath = filepath;
    }

    /**
     * 读取图片
     * @returns {Promis<Image>}
     */
    async read() {
        return new Promise(reslove => {
            this.png = fs.createReadStream(this._filepath).pipe(new PNG({ filterType: 4 }));
            this.png.on("parsed", () => reslove(this));
        });
    }

    async write(filepath) {
        this.png.pack().pipe(fs.createWriteStream(filepath));
    }

    each(method) {
        for (var y = 0; y < this.png.height; y++) {
            for (var x = 0; x < this.png.width; x++) {
                method(x, y);
            }
        }
    }

    getPixel(x, y) {
        var idx = (this.png.width * y + x) << 2;
        let R = this.png.data[idx];
        let G = this.png.data[idx + 1];
        let B = this.png.data[idx + 2];
        let A = this.png.data[idx + 3];
        return { r: R, g: G, b: B, a: A };
    }

    setPixel(x, y, r, g, b, a) {
        var idx = (this.png.width * y + x) << 2;
        if (x == undefined || y == undefined) return;
        if (r != undefined) this.png.data[idx] = r;
        if (g != undefined) this.png.data[idx + 1] = g;
        if (b != undefined) this.png.data[idx + 2] = b;
        if (a != undefined) this.png.data[idx + 3] = a;
    }
}