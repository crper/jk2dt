/* eslint-disable */
const pushMsg = require("./pushMsg");
const config = require("./config");
const utils = require("./utils");
const configImport = require("./utils/configImport");
console.log(" jk2dt外部读取的配置: ", configImport);

const pushMsgOption = config.init(configImport);
console.log("pushMsgOption: ", JSON.stringify(pushMsgOption));

/**
 *
 * @param {object|array} pushMsgOption 钉钉推送集合或者对象
 */
function dkMsgExec(pushMsgOption) {
    if (Array.isArray(pushMsgOption)) {
    pushMsgOption.map(config => {
      if (utils.isObj(config)) {
        const st = setTimeout(() => {
          clearTimeout(st);
          pushMsg(config);
        }, 3000);
      }
    });
  } else {
    if (utils.isObj(pushMsgOption)) {
      const st = setTimeout(() => {
        clearTimeout(st);
        pushMsg(pushMsgOption);
      }, 3000);
    }
  }
}


function jk2dt(dkMsgQueue) {
  const noEmptyArray = Array.isArray(dkMsgQueue) && dkMsgQueue.length > 0;
  if (utils.isObj(dkMsgQueue) || noEmptyArray) {
    dkMsgExec(dkMsgQueue);
  } else {
    dkMsgExec(pushMsgOption)
  }
}

module.exports = jk2dt;
