const fs = require('fs');
const path = require('path');
const logger = require('./logger');
const childProcess = require('child_process');
const ora = require('ora-classic');
const { clear } = require('console');
const Logger = require('./logger');

module.exports = class Util {

	static testChinese(str) {
		return (/.*[\u4e00-\u9fa5]+.*$/.test(str))
	}

	static async nextTick() {
		return new Promise(function (r1, r2) {
			process.nextTick(r1);
		});
	}

	static async waitForInput(title, method) {
		title += '> ';
		process.stdout.write(title);
		//process.stdin.pause();
		process.stdin.setEncoding('utf8');
		function readHandler() {
			const chunk = process.stdin.read();
			if (chunk !== null) {
				process.stdin.on('readable', readHandler);
				method(chunk);
			}
		};
		process.stdin.on('readable', readHandler);
		// const buf = Buffer.allocUnsafe(1);
		// fs.readSync(process.stdin.fd, buf, 0, 1, 0);
		// process.stdin.end();
		// return buf.toString('utf8', 0, buf.byteLength).trim();
	}

	static async verifyTime(deviationSec, method) {
		return new Promise((reslove, reject) => {
			(new (require('../core/net').HttpRequest)()).request('http://api.k780.com:88/?app=life.time&appkey=10003&sign=b59bc3ef6191eb9f747dd4e83c99f2a4&format=json', (res) => {
				var serverData = JSON.parse(res);
				if (serverData.success != 1) {
					console.error('服务器时间获取失败...'.red);
					if (method) method(false);
					reslove(false);
					return;
				}
				var serverDate = new Date(serverData.result.datetime_1);
				var localDate = new Date();
				console.log('北京时间:', serverDate);
				console.log('本地时间:', localDate);
				if (Math.abs(serverDate.getSeconds() - localDate.getSeconds()) > deviationSec) {
					console.error('时间校验失败..'.red);
					method(false);
					return;
				};
				console.log('时间效验成功!'.green);
				if (method) method(true);
				reslove(true);
			});
		});
	}

	/**
	 * 批量运行命令行
	 * @param {Array<string>} cmds 
	 * @param {() => void} method 
	 * @param {{showOutput?:string,execStart?:()=>void,execEnd?:(res:boolean)=>void,args?:Array<any>}} output
	 */
	static runMutiCmd(cmds, method, output) {
		output = output ? output : {};
		let i = 0;
		function run() {
			if (!cmds.length) {
				method();
				return;
			}
			Util.runCmd(cmds.shift(), run.bind(this), { showOutput: output.showOutput, execStart: output.execStart, execEnd: output.execEnd, arg: output.args ? output.args[i++] : undefined });
		}
		run.call(this);
	}

	/**
	 * 运行命令行
	 * @param {string} cmd 
	 * @param {() => void} method 
	 * @param {{showOutput?:string,execStart?:()=>void,execEnd?:(res:boolean)=>void,arg?:any}} output
	 */
	static runCmd(cmd, method, output, maxBuffer) {
		output = output ? output : {};
		output.log = [];
		if (output.showOutput == undefined) output.showOutput = true;
		if (output.execStart) output.execStart(output.arg);
		if (output.showOutput) {
			logger.log(`[CMD][${cmd}]`);
		} else {
			output.log.push(`[CMD][${cmd}]`);
		}
		let childprocess;
		try {
			childprocess = childProcess.exec(cmd, {
				encoding: 'buffer',
				timeout: 0, /*子进程最长执行时间 */
				maxBuffer: maxBuffer ? maxBuffer : 1024 * 1024
			});
			function stdotHandler(data) {
				output.showOutput ? logger.log(data.toString()) : output.log.push(data.toString());
			}
			function stderrHandler(data) {
				output.showOutput ? logger.log(data.toString()) : output.log.push(data.toString());
			}
			function exitHandler(code) {
				childprocess.stdout.removeListener('data', stdotHandler);
				childprocess.stderr.removeListener('data', stderrHandler);
				childprocess.removeListener('exit', exitHandler);
				// code=0还是code=1为正常,有待确认
				if (output.execEnd) output.execEnd(code == 0 || code == 1, output.arg);
				// if (output.showOutput) {
				// 	logger.log(`[${cmd}]`);
				// } else {
				// 	output.log.push(`[${cmd}]`);
				// }
				method && method(code == 0 || code == 1, output.log);
			}
			childprocess.stdout.on('data', stdotHandler);
			childprocess.stderr.on('data', stderrHandler);
			childprocess.on('exit', exitHandler);
		} catch (e) {
			if (childprocess) {
				childprocess.kill();
			}
			if (output.execEnd) {
				output.log.push(e.toString())
				output.execEnd(false, output.arg);
			} else {
				logger.error(e.toString());
			}
			method && method(false, output.log);
		}
	}

	/**
	 * 运行命令行
	 * @param {string} cmd 
	 * @param {{showOutput?:string,execStart?:()=>void,execEnd?:(res:boolean)=>void}} output
	 */
	static runCmdSync(cmd, output) {
		return new Promise((reslove, reject) => {
			Util.runCmd(cmd, () => reslove(), output);
		});
	}

	/**获取命令行实际参数 */
	static parseParams(...parms) {
		var raws = [];
		var raw;
		while (parms.length) {
			var tag = parms.shift();
			var has = false;
			if (tag.indexOf("--") == 0) {
				has = true;
			}
			if (has) {
				raw = {
					tag: tag,
					value: ''
				}
				raws.push(raw);
			} else {
				if (raw) raw.value = tag;
				raw = null;
			}
		}
		return raws;
	}
	static progress = {
		// color:'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white' | 'gray'
		start: (tag, prefix, color = 'yellow') => {
			if (this.__spinner) {
				this.__spinner.stop();
			}
			this.__spinner = ora({ interval: 10 });
			this.__spinner.color = color;
			this.__spinner.text = tag;
			prefix && (this.__spinner.prefixText = `[${prefix}]`);
			this.__spinner.start();
		},
		stop: () => {
			if (!this.__spinner) return;
			this.__spinner.stop();
		},
		// type:"success" | "fail" | "info" | "warn"
		end: (type = "success", text, prefix) => {
			if (!text) text = "";
			if (!this.__spinner) return;
			prefix && (this.__spinner.prefixText = `[${prefix}]`);
			this.__spinner.stop();
			switch (type) {
				case "success": this.__spinner.succeed(text); break;
				case "fail": this.__spinner.fail(text); break;
				case "info": this.__spinner.info(text); break;
				case "warn": this.__spinner.warn(text); break;
			}
		},
		clear: () => {
			if (!this.__spinner) return;
			this.__spinner.clear();
		}
	}
	static __checkDoneObfuscator(filepath) {
		let content = fs.readFileSync(filepath, 'utf-8').toString();
		//check obfuscatored
		let isobfuscatored = true;
		let total = 20;
		let start = 0;
		while (total--) {
			start = content.indexOf(`_0x`, start + 1);
			if (start == -1) {
				isobfuscatored = false;
				break;
			}
		}
		return isobfuscatored;
	}

	/*对JS文件进行混淆*/
	static obfuscatorFile(filepath) {
		var content = fs.readFileSync(filepath, 'utf-8').toString();
		if (this.__checkDoneObfuscator(filepath)) {
			Logger.warn(`[${path.basename(filepath)}]文件已加密,无需重复加密!`);
			return Promise.resolve();
		}
		fs.writeFileSync(filepath, this.obfuscator(content), 'utf-8');
		return Util.runCmdSync(`uglifyjs ${filepath} -o ${filepath}`);
	}
	static obfuscator(content) {
		var JavaScriptObfuscator = require('javascript-obfuscator');
		var obfuscationResult = JavaScriptObfuscator.obfuscate(content,
			{
				compact: false,
				controlFlowFlattening: true
			}
			//{
			//     compact: true,
			//     controlFlowFlattening: true,
			//     controlFlowFlatteningThreshold: 0.75,
			//     deadCodeInjection: true,
			//     deadCodeInjectionThreshold: 0.4,
			//     debugProtection: false,
			//     debugProtectionInterval: false,
			//     disableConsoleOutput: true,
			//     identifierNamesGenerator: 'hexadecimal',
			//     log: false,
			//     renameGlobals: false,
			//     rotateStringArray: true,
			//     selfDefending: true,
			//     stringArray: true,
			//     stringArrayEncoding: 'base64',
			//     stringArrayThreshold: 0.75,
			//     transformObjectKeys: true,
			//     unicodeEscapeSequence: false
			// }
		);
		return obfuscationResult.getObfuscatedCode();

	}
}

