const { diff } = require('./Diff')

//  Componet 组件  可继承
class Component {
  constructor (props) {
    this.virtul_dom = {
      tag: '',
      attributes: {

      },
      childs: []
    }
    this.patch = {}
  }
  setState (newState) {
    const oldDom = this.virtul_dom
    this.state = { ...this.state, ...newState}
    this.virtul_dom = this._render()
    this.patch = diff(oldDom, this.virtul_dom)
    if (this.handleStateChange) {
      this.handleStateChange(this.patch)
    }
  }
  // 生成并返回virtual-dom
  _render () {
    if (!this.render) throw 'a render function should be declared'
    let dom = document.createElement('div') // 由于无法使用jsx语法，我们这里返回的是模板字符串 借助父节点的innerHTML来生成dom结构
    dom.innerHTML = this.render()
    this.virtul_dom = createElement(dom.children[0], this.virtul_dom)
    return this.virtul_dom
  }


  ComponentWillUnMount () {
    console.log('ComponentWillUnMount')
  }
  ComponentDidUnMount () {
    console.log('ComponentDidUnMount')
  }


  ComponentWillMount () {
    console.log('ComponentWillMount')
  }
  ComponentDidMount () {
    console.log('ComponentDidMount')
  }
}

/**
 * 由于没法使用jsx,我们使用模板字符串模拟，该方法将render返回的html字符串转换成我们的virtul-dom
 * @param {当前render返回来的HTML字符串经过处理得到的dom结构} currentDOM 
 * @param {一个传进来的virtul-dom的引用，我们在这里面改变它} virtul_dom 
 * @param {用来记录当前走过的节点总数} currentTotal
 */
function createElement(currentDOM, virtul_dom, currentTotal = { index: 0 }) {
  const { attributes, nodeName, children, childNodes} = currentDOM
  //count
  virtul_dom.count = currentTotal.index
  currentTotal.index = currentTotal.index + 1
  // tag
  virtul_dom.tag = nodeName
  // attributes
  for (let i = 0; i < attributes.length; i++) {
    virtul_dom.attributes[attributes[i].name] = attributes[i].value
  }
  // childs
  if (children.length === 0) {
    // 文本节点
    for (let i = 0; i < childNodes.length; i++) {
      if (childNodes[i].nodeType == 3) {
        virtul_dom.childs.push({
          tag: 'text',
          value: childNodes[i].nodeValue,
          count: currentTotal.index
        })
        currentTotal.index = currentTotal.index + 1
      }
    }
  } else {
    // 元素节点
    for (let i = 0; i < children.length; i++) {
      const result = createElement(children[i], {
        tag: '',
        attributes: {},
        childs: []
      }, currentTotal)
      virtul_dom.childs.push(result)
    }
  }

  return virtul_dom
}

module.exports = {
  Component,
  createElement
}