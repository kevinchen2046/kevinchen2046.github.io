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

        fs.writeFileSync(filepath,
            `<head><link rel="stylesheet" href="https://unpkg.com/beautiful-markdown" /></head>
        ${converter.makeHtml(content)}`, "utf-8");
    };
}

async function exec() {
    FileUtil.clearFolder(outFolder);
    FileUtil.copyFolder("./css","./docs/css")
    convertFolder(sourceFolder);
}

exec();
