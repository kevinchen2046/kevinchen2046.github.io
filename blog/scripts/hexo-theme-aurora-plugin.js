//使用hexo-theme-aurora主题后 发布的文件路径有问题 在这里修复下
// let hexo = require("hexo");
let path=require("path");
hexo.extend.filter.register('after_post_render', function (data, arg1, arg2) {
    // data.content = data.content.replace(/\=\"\/static\//g, "\=\".\/static\/");
    if(path.extname(data.path)!=".html") return data;
    console.log("===============")
    console.log(data.path)
    console.log("---------------")
    console.log(data.content);
    data.content = data.content.replace(/\=\"\/static\//g, "\=\".\/static\/");
    return data;
});