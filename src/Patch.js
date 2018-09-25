const { diffType } = require('./LocalData')
const ReactDom = require('./ReactDom')
const { setAttributes } = require('./utils')

/**
 * 将patch包含的更改应用到页面中去，实现部分更新而不是全部重排
 * @param {根节点} root 
 * @param {包含两颗树差别信息的对象} patch 
 * @param {用来记录当前走过的节点数目} currentIndex 
 */
function Patch (root, patch, currentIndex = { index: 0 }) {
  const { childNodes } = root
  const currentPatch = patch[currentIndex.index]
  currentIndex.index ++
  if (childNodes.length >= 0) {
    childNodes.forEach(element => {
      Patch(element, patch, currentIndex)  
    });
  }
  applyPatch(root, currentPatch)
}

/**
 * 更新单个节点
 * @param {需要更新的单个节点} node 
 * @param {包含改节点更改信息的对象} patch 
 */
function applyPatch (node, patch) {
  const { parentNode } = node
  switch (patch.type) {
    case diffType.REPLACE:
      const dom_node = ReactDom._render(patch.node) 
      parentNode.replaceChild(dom_node, node)
      break;
    case diffType.NODECUD:
         
    break;
    case diffType.PROPS:
      setAttributes(node, patch.props)  
    break;
    case diffType.TEXT:
      node.parentNode.textContent = patch.content
    break;
    default:
      break;
  }  
}



module.exports = Patch