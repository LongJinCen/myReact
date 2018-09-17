var root = document.getElementById('root')

// 根据我们的字符串生成DOM
const createDOM = function (string) {
  var div = document.createElement('div')
  div.innerHTML = string
  return div
}


class Component {
  constructor (props = {}) {
    this.props = props
    this.ele = null // 保存当前的ele 
  }
  setState (state) {
    const oldEle = this.ele
    this.state = { ...this.state, ...state }
    this.ele = this._render() // 数据发生改变重新渲染 并更新当前的ele
    if (this.onStateChange) {  // 数据发生改变 时候暴露给组件外部的接口
      this.onStateChange(oldEle, this.ele)
    }
  }
  _render () {
    this.ele = createDOM(this.render()) // 这里是关键，用户返回的html字符串我们在这里插入到ele中
    if (this.onClick) { // 每次改变了ele之后需要重新绑定事件
      this.ele.addEventListener('click', this.onClick.bind(this), false)
    }
    return this.ele  // 将新生成的ele返回出去  将我们当前的ele暴露给外部
  }
}



class LikeButton extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLike: false
    }
  }

  onClick () {
    this.setState({
      isLike: !this.state.isLike
    })
  }
  render () {
    return `<button class='like-btn'>
              <span class='like-text'>${this.state.isLike ? '已点赞': '点赞'}</span>
              <span>👍</span>
            </button>`
  }
}

// 相当于我们的render函数
const mount = function (Component, wrapper) {
  wrapper.appendChild(Component._render())
  Component.onStateChange = function (oldEle, newEle) {
    wrapper.replaceChild(newEle, oldEle)
  }
}

mount(new LikeButton(), root)
mount(new LikeButton(), root)