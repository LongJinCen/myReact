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

var test1 = new Test1()

ReactDom.render(test1, root)