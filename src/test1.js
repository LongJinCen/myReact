// 该测试文件展示了如何定义一个组件并渲染它

const React = require('../lib/React')
const ReactDom = require('../lib/ReactDom')

// 模板html我放在public中，该root表示 至于为什么这里可以使用 请了解webpack的使用
var root = document.getElementById('root')

class Test1 extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '老王',
      age: '30'
    }
  }
  render () {
    const { name, age } = this.state
    return `
      <div id=0>
        <div id=1 style = "height:50px; background-color: red;">
          <div id=2>${name}</div>
          <div id=3>${age}</div>
        </div>
        <div id=2 style = "height:50px; background-color: burlywood;">
          <div id=2>2</div>
          <div id=3>3</div>
        </div>
        <div id=3 style = "height:50px; background-color: red;">
          <div id=2>2</div>
          <div id=3>3</div>
        </div>
      </div>
    `
  }
}

var test1 = new Test1()

ReactDom.render(test1, root)