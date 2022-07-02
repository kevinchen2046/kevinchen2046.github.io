const http = require('http');
module.exports=class HttpRequest {
    request(url,method,caller) {
        this.body='';
        const req = http.get(url, (res) => {
            //console.log(`状态码: ${res.statusCode}`);
            //console.log(`响应头: ${JSON.stringify(res.headers)}`);
            res.setEncoding('utf8');
            res.on('data', (chunk) => {
                //console.log(`响应主体: ${chunk}`);
                this.body+=chunk;
            });
            res.on('end', () => {
                //console.log('响应中已无数据');
                if(method) method.call(caller,this.body);
                if(this.complete) this.complete.call(this.completeCaller,this.body);
            });
        });

        req.on('error', (e) => {
            console.error(`请求遇到问题: ${e.message}`);
            if(this.errorhandler) this.errorhandler.call(this.errorhandlerCaller,e.message);
        });
    }

    onData(method,caller){
        this.complete=method;
        this.completeCaller=caller;
    }
    onError(method,caller){
        this.errorhandler=method;
        this.errorhandlerCaller=caller;
    }
}