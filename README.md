# myReact

## Usage
#### 方式一
> git  clone xxxxx
> npm install
> npm run start
#### 方式二
> npm install ljc_react
> npm install
> npm run start

在`webpack.config.js`的`entry`属性中配置你想要运行的`src`目录下的单个入口文件，仅支持单个文件，例如你想要运行`src`下面的`index.js`，那么将`entry`改为`./src/index.js`，之后执行的将是该文件

# info

`react`充当`view`层，同时得益于ECMScript2015的`class`，是实现继承更加简单，`state`改变到整个视图的渲染的流程大概像下面这样
1. 调用`renderDOM`来将我们的组件挂载进DOM结构中
2. 调用`this.setState()`改变状态
3. 在`setState`函数中改变我们的状态然后重新调用`render`渲染页面

## react的简单实现 index1.js

在这个文件中，我们简单的实现了`react`的`Component`以及`ReactDOM.render()`也就是文件中的`mount`,当我们有通过点击事件来实现事件响应发的时候，可以通过继承`Component`实现这一功能，该文件实现的总体流程如下
第一次的初始化过程
1. 调用`mount`并调用`Component._render()`等待返回结果，将其插入到节点中,
2. 在`Component._render()`方法里面调用用户自定义的`render()`
3. 根据用户自定义`render()`返回的html字符串调用`createDOM()`生成一个新的DOM节点
4. 给该节点绑定事件并返回我们新的`ele`节点
5. 将返回阿结果添加到dom中，然后绑定状态改变函数，回调参数为旧的新的两个ele
状态改变的过程
1. 调用`setState`将新数据传递过去
2. 在`setState()`函数中改变我们的state，然后调用`this._render()`,然后重复前面初始化过程中的2-4步
3. 触发我们绑定的状态改变函数