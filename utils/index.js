const convertMD2Str = require("./covert-md-2-str");
const shellList = require("./shell-list");
const isType = require("./is-type");
const path = require("path");
/*
 ** @return {string} - 当前的时间 YYYY-MM-DD HH:mm:ss
 */
function getCurentTime() {
  const now = new Date();

  const year = now.getFullYear(); // 年
  const month = now.getMonth() + 1; // 月
  const day = now.getDate(); // 日

  const hh = now.getHours(); // 时
  const mm = now.getMinutes(); // 分

  let clock = year + "-";

  if (month < 10) clock += "0";

  clock += month + "-";

  if (day < 10) clock += "0";

  clock += day + " ";

  if (hh < 10) clock += "0";

  clock += hh + ":";
  if (mm < 10) clock += "0";
  clock += mm;
  return clock;
}

function findValidAK(dict) {
  let tempObj = {};
  for (let [k, v] of Object.entries(dict)) {
    if (isType.isString(v) && v) {
      tempObj[k] = v;
    }
    if (
      isType.isObj(v) &&
      Array.isArray(v.success) &&
      Array.isArray(v.error) &&
      v.success.length > 0 &&
      v.error.length > 0
    ) {
      tempObj[k] = v;
    }
  }
  return tempObj;
}

module.exports = {
  getCurentTime,
  findValidAK,
  convertMD2Str,
  ...isType,
  ...shellList
};
