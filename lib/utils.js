/**
 * 设置一个dom节点的属性
 * @param {源dom节点} origin 
 * @param {需要设置的属性的一个对象} attributes 
 */
function setAttributes (origin, attributes) {
  Object.keys(attributes).forEach( current => {
    origin.setAttribute(current, attributes[current])
  })
}

/**根据传进来的虚拟dom生成dom节点
 * @param {virtual-dom} node
 */
function _render(node) {
  var dom = null
  if (node.tag === 'text') {
    dom = document.createTextNode(node.value)
    return dom
  }
  dom = document.createElement(node.tag)
  setAttributes(dom, node.attributes)
  _renderWalk(node.childs, dom)
  return dom
}

function _renderWalk(node, root) {
  if (node.length > 0) {
    node.forEach( current => {
      root.appendChild(_render (current))  
    })
  }
} 


module.exports = {
  setAttributes,
  _render
}