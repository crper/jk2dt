/**
 *
 * @param {*} obj - 对象
 * @return  {boolean} - 布尔值
 * @description - 判断是否为Promise
 */
function isThenable(obj) {
  return (
    !!obj &&
    (typeof obj === "object" || typeof obj === "function") &&
    typeof obj.then === "function"
  );
}

function isString(o) {
  //是否字符串
  return Object.prototype.toString.call(o).slice(8, -1) === "String";
}

function isNumber(o) {
  //是否数字
  return Object.prototype.toString.call(o).slice(8, -1) === "Number";
}

function isObj(o) {
  //是否对象
  return Object.prototype.toString.call(o).slice(8, -1) === "Object";
}

module.exports = {
  isThenable,
  isString,
  isObj,
  isNumber
};
