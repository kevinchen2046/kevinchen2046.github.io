# 开始
`https://purchase.cordova.fovea.cc/use-cases/subscription-android`
## 编码部分
由于编码部分机翻的代码部分异常，影响阅读，所以创建此文档，以供查阅
### Initialization 初始化
假设您从一个空白项目开始，我们将为本教程添加最少的HTML。
让我们替换`www/index.html`中的`<body>`。包含以下内容的html文件。
```html
<body> from the www/index.html file with the below.
<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="Content-Security-Policy" content="default-src 'self' https://reeceipt-validator.fovea.cc 'unsafe-eval' 'unsafe-inline' gap:; style-src 'self' 'unsafe-inline'; media-src *">
</head>
<body style="margin-top: 50px">
  <script type="text/javascript" src="cordova.js"></script>
  <script type="text/javascript" src="js/index.js"></script>
</body>
</html>
```
确保注释掉Cordova模板项目的CSS。
我们通过将"unsafe-inline" `Content-Security-Policy(内容安全策略)` 添加到`default-src`部分来启用该策略。
因为我们要用[Fovea.Billing](https://billing.fovea.cc/)。计费时，您还需要将验证服务器添加到`default-src`，请在[cordova安装文档](https://billing-dashboard.fovea.cc/setup/cordova)中找到。我的情况是(https://reeceipt-validation.fovea.cc).
现在让我们编辑JavaScript文件`js/index.js`。用下面的代码替换内容，这将设置一个最小的应用程序框架，并根据应用程序状态将一些HTML呈现到页面中。
```js
document.addEventListener('deviceready', onDeviceReady);
function onDeviceReady() {
    const state = {};
    function setState(attr) {
        Object.assign(state, attr);
        render(state);
    }
    setState({
        error: '',
        status: 'Loading...',
        product1: {},
        product2: {},
    });
    //我们将在此处初始化应用内购买插件。
    function render() {
        const body = document.getElementsByTagName('body')[0];
        body.innerHTML = `
<pre> 
${state.error}
subscription: ${state.status}
</pre>
        `;
    }
}
```
现在，让我们初始化应用内购买插件，如`onDeviceReady`函数所示。
```js
    //我们应该首先注册我们的所有产品，否则我们不能在应用程序中使用它们。
    store.register([{
        id:    'my_subscription1',
        type:   store.PAID_SUBSCRIPTION,
    }, {
        id:    'my_subscription2',
        type:   store.PAID_SUBSCRIPTION,
    }]);
    //设置收据验证器服务。
    store.validator = '<<< YOUR_RECEIPT_VALIDATION_URL >>>';
    //显示错误10秒钟。
    store.error(function(error) {
        setState({ error: `ERROR ${error.code}: ${error.message}` });
        setTimeout(function() {
            setState({ error: `` });
        }, 10000);
    });
    // 稍后，我们将在此处添加事件处理程序
    // todo....
    // 加载有关产品和采购的信息
    store.refresh();
}
```
这里有一点解释:

我们首先注册ID为`my_subscription1`和`my_subscription2`的产品。
我们将产品声明为可续费订阅(store.PAID_SUBSCRIPTION)。[⇒API文档](https://github.com/j3k0/cordova-plugin-purchase/blob/master/doc/api.md#registering-products)

我们设置了到收据验证服务器的链接。如果您使用的是[Fovea.Billing](https://billing.fovea.cc/)，您可以在[这里](https://billing-dashboard.fovea.cc/setup/cordova)找到它。

我们设置了一个错误处理程序。它将在屏幕顶部显示最后一条错误消息10秒钟。
最后，我们执行所有产品状态的初始`refresh()`。[⇒API文档](https://github.com/j3k0/cordova-plugin-purchase/blob/master/doc/api.md#registering-products)

>无论您的设置是什么，都应该确保在javascript应用程序启动后立即执行初始化代码。您必须准备好尽快处理IAP事件。

### Presentation演示
现在让我们显示订阅状态，因为它是由本机平台提供的。在调用`store.refresh()`之前，我们将为更新事件添加一个处理程序:
每当我们的产品状态发生变化时，就会调用此hander。
```js
// 更新任何订阅产品时调用
store.when('subscription').updated(function() {
    const product1 = store.get('my_subscription1') || {};
    const product2 = store.get('my_subscription2') || {};

    let status = 'Please subscribe below';
    if (product1.owned || product2.owned)
        status = 'Subscribed';
    else if (product1.state === 'approved' || product2.state === 'approved')
        status = 'Processing...';

    setState({ product1, product2, status });
});
```
现在，我们可以通过`render()`函数显示有关产品的一些信息：
```js
function render() {
    const purchaseProduct1 = '';
    const purchaseProduct2 = '';
    const body = document.getElementsByTagName('body')[0];
    body.innerHTML = `
<pre> 
${state.error}

subscription: ${state.status}

id:     ${state.product1.id          || ''}
title:  ${state.product1.title       || ''}
state:  ${state.product1.state       || ''}
descr:  ${state.product1.description || ''}
price:  ${state.product1.price       || ''}
expiry: ${state.product1.expiryDate  || ''}
</pre>
${purchaseProduct1}
<pre>

id:     ${state.product2.id          || ''}
title:  ${state.product2.title       || ''}
descr:  ${state.product2.description || ''}
price:  ${state.product2.price       || ''}
state:  ${state.product2.state       || ''}
expiry: ${state.product2.expiryDate  || ''}
</pre>
${purchaseProduct2}
    `;
}
```
无论何时我们的产品发生任何变化，界面现在都会更新以反映当前状态。

>苹果和谷歌要求以这种方式显示您的产品信息，即完全按照从商店加载的方式显示。否则，他们可能会拒绝您的申请。

>您还可以使用`store.off()`断开事件处理程序的连接，以便您的订阅视图仅在可见时更新。

如果您想了解更多这方面的背景信息，请查看简介的[显示产品](https://purchase.cordova.fovea.cc/discover/about-the-plugin#displaying-products)部分和[⇒API文档](https://github.com/j3k0/cordova-plugin-purchase/blob/master/doc/api.md#storeproduct-object)，了解有关为产品找到的字段的完整详细信息。

### Purchase 购买
到目前为止还不错，但如果我们真的可以开始购买呢？为此，我们将为这两种产品添加一个购买按钮。我们已经为购买按钮添加了占位符，让我们创建它们。在显示购买按钮之前，我们需要确保用户可以实际购买该项目。这可能是不可能的，因为有几个原因：已经在进行购买，产品已经拥有，该功能已为用户禁用(Child Mode)。
在`render()`函数中，我们更新初始化`purchaseProduct1`和`purchaseProduct2`的代码。

```js
//产品1的按钮
const purchaseProduct1 = state.product1.canPurchase
    ? `<button onclick="store.order('my_subscription1')">Subscribe</button>` : '';

//产品2相同
const purchaseProduct2 = state.product2.canPurchase
    ? `<button onclick="store.order('my_subscription2')">Subscribe</button>` : '';
```

>仅当`product.canPurchase`为true时，才应显示“购买”按钮。否则，调用`store.order()`将生成错误。

我们可以通过将按钮标签更改为"Upgrade"或"Downgrade"来更好地实现这一点，当其他产品为`owned`时，我将把这作为一个练习留给读者。
现在，让我们构建并测试！

### Extra step for Android. Android的额外步骤
如果使用[Fovea验证服务](https://billing.fovea.cc/)，`expiryDate`和API的其他一些自动续订Android订阅功能只有在您使用此处的解释程序完成"Connect With Google"步骤后才可用。在[这里](https://billing.fovea.cc/documentation/connect-with-google-publisher-api/)使用解释程序。