![xxxxx](https://img.shields.io/github/issues/LongJinCen/myReact.svg)
![xxxxx](https://img.shields.io/github/forks/LongJinCen/myReact.svg)
![xxxxx]()
# myReact
网上`react`核心机制的文章有很多，但是介绍`react`整个完整的核心流程的却很少，该`demo`适合想深入了解`react`核心机制与整体流程的人。我在这里把`react`从定义组件到渲染以及更新的核心部分都写在`lib`文件中，主要涉及到五个核心文件。
* `React.js`
  * 包括`Component`和`createElement`的定义
* `ReactDom.js`
  * 定义了`render`方法
* `Diff.js`
  * 实现`diff`算法
* `Patch.js`
  * 将使用`diff`算法得到的差异应用到页面中
在`Issues`中有对每个文件进行详细的介绍
## Install
#### method one
```
git  clone https://github.com/LongJinCen/myReact.git
npm install
npm run start
```
#### method two
```
npm install ljc_react
cd node_modules
cd ljc_react
npm install
npm run start
```

## Usage
在`webpack.config.js`的`entry`属性中配置你想要运行的`src`目录下的单个入口文件，仅支持单个文件，例如你想要运行`src`下面的`index.js`，那么将`entry`属性改为`./src/index.js`，修改配置文件之后别忘了重启项目，之后执行的将是该文件，同时支持`CommonJs`和`es6`的`import`模块。

在这里请使用es6的`class`来声名一个组件，我们可以像使用`react`一样使用该`demo`,包括继承`React.Component`,定义一个`render`方法，定义`state`并调用`setState`改变它。
请务必先查看并运行提供的两个测试文件来帮助你理解如果使用提供的源码

需要注意的是
1. 由于这里没有使用`jsx`语法，所以使用的是模板字符串的形式，也就是你的render返回的必须是一个字符串，而且在`React.createElement`的实现上也和官方的有所差别，不过最终都是将`render`返回的转换为一个`virtul-dom`对象。
2. 在这里不能像`react`里面那样使用组件，如果你想使用一个组件，请使用`组件.render()`的方式通过模板字符串嵌入到当前结构中
3. 不能绑定事件，这里由于使用的是模板字符串，要绑定事件有很大的难度，所以你在测试的过程中不能绑定事件。虽然没有绑定事件，但是事件引起的`state`改变->`diff`->`dom`操作 这一流程仍然写在源码中

## More
关于该`demo`具体的介绍请查看[Issues](https://github.com/LongJinCen/myReact/issues)中对`react`执行流程的介绍,另外由于水平有限，如有错误的地方，请指出

## reference
> https://github.com/livoras/blog/issues/13

> http://huziketang.mangojuice.top/books/react/lesson1
