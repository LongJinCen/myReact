const Patch = require('./Patch')
const { _render } = require('./utils')


const ReactDom = {
  /**该函数用来第一次生成dom结构的时候渲染页面，并且只执行一次，后面的状态更新全部交给handleStateChange来处理
   * @param {需要渲染的类名} Component
   * @param {根节点} root
   */
  render: function (Component, root) {
    Component.ComponentWillMount()
    var virtul_dom = Component._render()
    var result = _render(virtul_dom)
    root.appendChild(result)
    Component.ComponentDidMount()
    /**
     * 监听函数，每次状态发生改变都调用该函数，patch
     * @param {包含两颗虚拟dom差异的对象} patch 
     */
    Component.handleStateChange = function (patch) {
      // 每次触发该函数时，将差异应用到root上
      Patch(root, patch)
    }
  },
}


module.exports = ReactDom