//使用hexo-theme-aurora主题后 发布的文件路径有问题 在这里修复下
// let hexo = require("hexo");
// const fs = require("fs");
// let path = require("path");
// hexo.extend.filter.register('after_post_render', function (data) {
//     data.content = data.content.replace(/\=\"\//g, "\=\".\/");
//     return data;
// });

// hexo.extend.filter.register('before_exit', function () {
//     // console.log(hexo);

//     let rootpath = path.resolve("./", hexo.config.public_dir);
//     for (let name in hexo.route.routes) {
//         let filepath = path.resolve(rootpath, name).replace(/\\/g, "/");
//         // console.log(filepath, fs.existsSync(filepath));
//         let ext = path.extname(filepath);
//         if (ext == ".html" || ext == ".js" || ext == ".css") {
//             let content = fs.readFileSync(filepath, "utf-8");
//             content = content.replace(/\=\"\//g, "\=\".\/");
//             fs.writeFileSync(filepath, content, "utf-8");
//         }
//     }
// });