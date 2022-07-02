require('colors');

var Editor;
if(!Editor) Editor=console;

module.exports=class Logger{

    static line(...args){
        var tag=args.length?args.join('|'):'';
        var total=20;
        var charTotal=0;
        for(var i=0;i<tag.length;i++){
            if( tag.charAt(i).search(/([^(\u0000-\u00FF)])/g)==-1){
                charTotal+=1;
            }else{
                charTotal+=2;
            }
        }
        total-=(Math.ceil(charTotal/2));
        var str=''
        while(total--){
            str+='-';
        }
        var time=(new Date().toLocaleString().split(' ')[1]);
        Editor.log(`[${time} LIN] ${str}${tag}${str}`.gray);
    }

    static log(...args){
        var time=(new Date().toLocaleString().split(' ')[1]);
        var content=args.join('');
        Editor.log(`[${time} LOG] ${content}`.white);
    }

    static error(...args){
        var time=(new Date().toLocaleString().split(' ')[1]);
        Editor.log(`[${time} ERR] ${args.join('')}`.red);
    }

    static info(...args){
        var time=(new Date().toLocaleString().split(' ')[1]);
        Editor.log(`[${time} INF] ${args.join('')}`.green);
    }

    static debug(...args){
        var time=(new Date().toLocaleString().split(' ')[1]);
        Editor.log(`[${time} DEB] ${args.join('')}`.cyan);
    }

    static warn(...args){
        var time=(new Date().toLocaleString().split(' ')[1]);
        Editor.log(`[${time} WAR] ${args.join('')}`.yellow);
    }
}