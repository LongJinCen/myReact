const { diffType } = require('./LocalData')

/**
 * 返回一个包含两棵树差别信息的对象
 * @param {旧的virtul-dom} oldTree 
 * @param {新的virtul-dom} newTree 
 */
function diff (oldTree, newTree) {
  var patches = {} // 用来记录每个节点差异的对象
  dfsWalk(oldTree, newTree, patches)
  return patches
}
/**
 * @param {旧的virtul-dom} oldNode 
 * @param {新的virtul-dom}} newNode 
 * @param {包含我们改变的信息对象} change 
 */
function dfsWalk(oldNode, newNode, change) {
  const currentChange = []
  const index = oldNode.count
  //如果子节点为空 那么不做处理
  if (newNode === undefined || newNode.length === 0) {
    
    // 文本节点内容不同替换
  } else if (oldNode.tag === 'text' && newNode.tag === 'text') {
    if (oldNode.value !== newNode.value) {
      currentChange.push({
        type: diffType.TEXT,
        content: newNode.value
      })
    }
    // 节点类型相同时 diff属性与childs
  } else if (oldNode.tag === newNode.tag) {
    const diff_props_result = diffProps(oldNode, newNode)
    if (diff_props_result) {
      currentChange.push({
        type: diffType.PROPS,
        props:diff_props_result
      })
    }
    diffChild(oldNode, newNode, change)
    // 节点类型不同的时候，替换
  } else if (oldNode.tag !== newNode.tag) {
    currentChange.push({
      type: diffType.REPLACE,
      node: newNode
    })
  }
  change[index] = currentChange
}

function diffChild (oldNode, newNode, change) {
  // 比较列表的节点
  

  // 继续递归比较子节点
  oldNode.childs.forEach((element, index) => {
    dfsWalk(element, newNode.childs[index], change)
  });
}

/**
 * 该函数的作用是比较两个dom节点的属性，并将比较结果返回
 * @param {之前的node} oldNode 
 * @param {最新的node} newNode 
 */
function diffProps (oldNode, newNode) {
  let currentChange = {length: 0}
  let old_attr = oldNode.attributes
  let new_attr = newNode.attributes
  // 判断oldnode中改变的属性值
  for (let key in old_attr) {
    if (new_attr.hasOwnProperty(key) && old_attr[key] !== new_attr[key]) {
      currentChange[key] = new_attr[key]
      currentChange.length ++
    } else if (!new_attr.hasOwnProperty(key)) {
      currentChange[key] = null
      currentChange.length ++
    }
  }
  // 判断newnode中新添的属性
  for (let key in new_attr) {
    if (!old_attr.hasOwnProperty(key)) {
      currentChange[key] = new_attr[key]
      currentChange.length ++
    }
  }
  // 如果有属性改变或增加，那么length不为0，这时返回比较结果，否则返回false
  if (currentChange.length > 0) {
    // delete只是起一个标识作用结束的时候要将其删除
    delete currentChange.length
    return currentChange
  } else {
    return false
  }
}

module.exports =  diff