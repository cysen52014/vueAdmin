import router from "@/router";
/*-工具类-*/
export default class Tool {
  // 过滤空值
  static filterParams(params) {
    const p = {};
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        const el = params[key];
        if (el !== "") {
          p[key] = el;
        }
      }
    }
    return p;
  }
  // sort
  static toTreeData(data, attr) {
    var pos = {};
    var tree = [];
    var i = 0;

    while (data.length > 0) {
      if (data[i][attr.parentId] * 1 === 0) {
        tree.push(data[i]);
        pos[data[i][attr.id] * 1] = [tree.length - 1];
        data.splice(i, 1);
        i--;
      } else {
        var posArr = pos[data[i][attr.parentId] * 1];
        if (posArr != undefined) {

          var obj = tree[posArr[0]];
          for (var j = 1; j < posArr.length; j++) {
            obj = obj.children[posArr[j]];
          }
          obj.children = obj.children ? obj.children : []
          obj.children.push(data[i]);
          pos[data[i][attr.id] * 1] = posArr.concat([obj.children.length - 1]);
          data.splice(i, 1);
          i--;
        }
      }
      i++;
      if (i > data.length - 1) {
        i = 0;
      }
    }
    return tree;
  }

  // json对象排序
  static compare(arr, key) {
    return arr.sort(function (a, b) {
      var value1 = a[key];
      var value2 = b[key];
      return value1 - value2;
    });
  }
}
