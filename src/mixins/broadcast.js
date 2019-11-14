function broadcast(componentName, eventName, params) {
  this.$children.forEach(child => {
    const name = child.$options.name;
    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      // todo 如果 params 是空数组，接收到的会是 undefined
      broadcast.apply(child, [componentName, eventName].concat([params]));
    }
  });
}
export default {
  // 事件派发，找到指定的所有父级节点直到顶级，并且触发指定的事件
  dispatch(component, componentName, eventName, params) {
    var parent = component.$parent || component.$root;
    var name = parent.$options.name;
    while (parent && (!name || name !== componentName)) {
      parent = parent.$parent; console.log("parent", parent);
      if (parent) {
        name = parent.$options.name;
      }
    }
    if (parent) {
      console.log("ee", parent);
      parent[eventName](params);
    }
  },
  // 事件广播，找到指定的所有子级节点直到末级，并且触发指定的事件
  broadcast(componentName, eventName, params) {
    broadcast.call(this, componentName, eventName, params);
  }
};
