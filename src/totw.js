const fs=require("fs");
const simplebig=require("simplebig");
let filPath=`./markdown/privacy-policy/cn.md`;

fs.writeFileSync(
    filPath.replace("cn.md","tw.md"),
    simplebig.s2t(fs.readFileSync(filPath,"utf-8")));


