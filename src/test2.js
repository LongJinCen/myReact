const React = require('../lib/React')
const ReactDom = require('../lib/ReactDom')
const diff = require('../lib/Diff')
var root = document.getElementById('root')


class Test1 extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      
    }
  }
  render () {
    return `
      <div id=0>
        <div id=1 style = "height:50px; background-color: red;">
          <div id=2>2</div>
          <div id=3>3</div>
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

class Test2 extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      
    }
  }
  render () {
    return `
      <div id=0>
        <div id=1>
          <div id=2>2</div>
          <div id=3>3</div>
        </div>
        <div id=2>
          <div id=2>2</div>
          <div id=3>3</div>
        </div>
        <div id=3>
          <div id=2>2</div>
          <div id=3>3</div>
        </div>
      </div>
    `
  }
}

var test1 = new Test1()
var test2 = new Test2()
var virtul_dom1 = test1._render()
var virtul_dom2 = test2._render()
console.log(virtul_dom1)
console.log(virtul_dom2)
var result = diff(virtul_dom1, virtul_dom2)
console.log(result)