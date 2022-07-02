const fs = require("fs");
const showdown = require('showdown');
const FileUtil = require('./utils/file');
let converter = new showdown.Converter();

let sourceFolder = `./markdown`;
let outFolder = `./docs`;

async function convertFolder(folder) {
    let __outfolder = folder.replace(sourceFolder, outFolder);
    if (!fs.existsSync(__outfolder)) {
        fs.mkdirSync(__outfolder);
    }
    let files = fs.readdirSync(folder);
    for (let file of files) {
        let filepath = `${folder}/${file}`;
        if (fs.statSync(filepath).isDirectory()) {
            convertFolder(filepath);
            continue;
        }
        let content = fs.readFileSync(filepath, "utf-8");
        filepath = filepath.replace(".md", ".html").replace(sourceFolder, outFolder);
        fs.writeFileSync(filepath, converter.makeHtml(content), "utf-8");
    };
}

async function exec() {
    FileUtil.clearFolder(outFolder);
    convertFolder(sourceFolder);
}

exec();
