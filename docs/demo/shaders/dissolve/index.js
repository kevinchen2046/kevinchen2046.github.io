/**
 * 设置LayaNative屏幕方向，可设置以下值
 * landscape           横屏
 * portrait            竖屏
 * sensor_landscape    横屏(双方向)
 * sensor_portrait     竖屏(双方向)
 */
window.screenOrientation = "sensor_landscape";

//-----libs-begin-----
loadLib("libs/laya.core.js")
//loadLib("libs/laya.html.js")
//loadLib("libs/laya.particle.js")
//loadLib("libs/laya.ui.js")
//loadLib("libs/laya.d3.js")
// loadLib("libs/domparserinone.js")
//loadLib("libs/laya.physics.js")
//loadLib("libs/laya.physics3D.js")
// loadLib("libs/long.js")
// loadLib("libs/protobuf.js")
// loadLib("libs/ramda.js")
// loadLib("libs/rx.lite.js")
// loadLib("libs/state-machine.js")
// loadLib("libs/bytebuffer.js")
//-----libs-end-------
// loadLib("libs/netmsg.js")//网络协议，运行npm run net生成
// loadLib("libs/fairygui/rawinflate.min.js");// 如果勾选了不压缩，这个库不需要
//loadLib("libs/fairygui.js");// 只依赖laya.core,laya.html两个模块
loadLib("libs/devtools-detector.js");
loadLib("js/bundle.js");
