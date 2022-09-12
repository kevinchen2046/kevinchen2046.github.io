const fs=require("fs");
const download = require('download');
const translate = require("translate");



// (async () => {
//     await download('http://unicorn.com/foo.jpg', 'dist');
 
//     fs.writeFileSync('dist/foo.jpg', await download('http://unicorn.com/foo.jpg'));
 
//     download('unicorn.com/foo.jpg').pipe(fs.createWriteStream('dist/foo.jpg'));
 
//     await Promise.all([
//         'unicorn.com/foo.jpg',
//         'cats.com/dancing.gif'
//     ].map(url => download(url, 'dist')));
// })();
