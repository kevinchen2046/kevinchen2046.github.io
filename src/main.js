const fs = require("fs");
const path = require("path");
const showdown = require('showdown');
const FileUtil = require('./utils/file');
const { FileHash } = require("./utils/fileHash");

let converter = new showdown.Converter();

/**
 * 同步文件夹
 * @param {*} sourceFolder 
 * @param {*} outFolder 
 * @param {*} options?
 * @param {{ext:string,getFileName:(filename:string)=>string,readFile:()=>any}[]} options.filters
 * @param {string[]} options.excepts
 */
async function syncFolder(sourceFolder, outFolder, options) {
    if (!options) options = {};
    let fileFilters = options.filters;
    let exceptFiles = options.excepts;
    function filterName(filename) {
        if (fileFilters && fileFilters.length) {
            for (filter of fileFilters) {
                if (path.extname(filename) == filter.ext) {
                    filename = filter.getFileName(filename);
                    break;
                }
            }
        }
        return filename;
    }
    function filterContent(filepath) {
        let content = null;
        if (fileFilters && fileFilters.length) {
            for (filter of fileFilters) {
                if (path.extname(filepath) == filter.ext) {
                    content = filter.readFile(filepath);
                    break;
                }
            }
        }
        if (!content) content = fs.readFileSync(filepath);
        return content;
    }
    if (!fs.existsSync(outFolder)) fs.mkdirSync(outFolder);
    let sourcefiles = fs.readdirSync(sourceFolder);
    let outfiles = fs.readdirSync(outFolder);
    let sourceFilterFiles = sourcefiles.map(v => filterName(v));
    for (let i = 0; i < outfiles.length; i++) {
        let outfile = outfiles[i];
        if (sourceFilterFiles.indexOf(outfile) == -1) {
            if (exceptFiles.indexOf(`${outFolder}/${outfile}`) >= 0) continue;
            if (fs.statSync(`${outFolder}/${outfile}`).isDirectory) {
                FileUtil.removeFolder(`${outFolder}/${outfile}`);
            } else {
                fs.unlinkSync(`${outFolder}/${outfile}`);
            }
            outfiles.splice(i, 1);
            i--;
        }
    }
    for (let sourcefile of sourcefiles) {
        if (fs.statSync(`${sourceFolder}/${sourcefile}`).isDirectory()) {
            if (!fs.existsSync(`${outFolder}/${sourcefile}`)) {
                fs.mkdirSync(`${outFolder}/${sourcefile}`)
            }
            syncFolder(`${sourceFolder}/${sourcefile}`, `${outFolder}/${sourcefile}`, options);
            continue;
        }
        let fileContent = filterContent(`${sourceFolder}/${sourcefile}`);
        sourcefile = filterName(sourcefile);
        if (outfiles.indexOf(sourcefile) >= 0) {
            if (FileHash.hashContentSync(fileContent) != FileHash.hashFileSync(`${outFolder}/${sourcefile}`)) {
                fs.writeFileSync(`${outFolder}/${sourcefile}`, fileContent);
            } else {
                console.log(`已存在相同文件:${sourceFolder}/${sourcefile}`);
            }
        } else {
            fs.writeFileSync(`${outFolder}/${sourcefile}`, fileContent);
        }
    }
}
async function exec() {
    console.log("开始同步资源....")
    syncFolder(`./blog/assets`, `./docs/assets`);
    // syncFolder(`./www`, `./docs`, {
    //     excepts: ["./docs/blog"],
    //     filters: [{
    //         ext: ".md",
    //         getFileName: (filepath) => {
    //             return path.basename(filepath).replace(".md", ".html")
    //         },
    //         readFile: (filepath) => {
    //             let content = fs.readFileSync(filepath, "utf-8");
    //             return `<head><link rel="stylesheet" href="https://unpkg.com/beautiful-markdown" /></head>
    // <body>
    // ${converter.makeHtml(content)}
    // </body>`
    //         }
    //     }]
    // });
    console.log(`同步资源完成.`);
}

exec();
