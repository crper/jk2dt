const generateGitInfo = require("./git-info");
const JobInfo = require("./job-info");
const DingGroupAccessToekn = require("./access-token");
const utils = require("../utils");

function pushAccessToken(branch, accessTokenDict) {
  if (JobInfo.JOB_EXECUTOR_NUMBER === "0") {
    return accessTokenDict[branch]
      ? accessTokenDict[branch]
      : accessTokenDict["dev"];
  } else {
    return accessTokenDict["error"]
      ? accessTokenDict["error"]
      : accessTokenDict["dev"];
  }
}

function pushOptions(accessToken, config = {}) {
  return {
    accessToken,
    postData: {
      ...config
    }
  };
}

function pushArr(branch, akDict, config) {
  let tempAk = [];
  let tempArr = [];
  for (const [k, v] of Object.entries(akDict)) {
    if (k === branch) {
      if (utils.isObj(v)) {
        v.success.map(ak => {
          if (tempAk.indexOf(ak) === -1) {
            tempAk.push(ak);
            tempArr.push(pushOptions(ak, config));
          }
        });
        v.error.map(ak => {
          if (tempAk.indexOf(ak) === -1) {
            tempAk.push(ak);
            tempArr.push(pushOptions(ak, config));
          }
        });
      }
      if (utils.isString(v)) {
        let ak = pushAccessToken(branch, akDict);
        if (tempAk.indexOf(ak) === -1) {
          tempAk.push(ak);
          tempArr.push(pushOptions(ak, config));
        }
      }
    } else {
      let ak = pushAccessToken(branch, akDict);
      if (tempAk.indexOf(ak) === -1) {
        tempAk.push(ak);
        tempArr.push(pushOptions(ak, config));
      }
    }
  }

  return tempArr;
}

// 构建新的@数据
function newAtData(branch, atConfig, GitInfo) {
  if (atConfig && atConfig[branch] && utils.isObj(atConfig[branch])) {
    return atConfig[branch];
  } else {
    return {
      isAtAll: !!(
        GitInfo.RepoBranch === "master" && JobInfo.JOB_EXECUTOR_NUMBER === "0"
      )
    };
  }
}

function init(
  config = {
    git: {},
    jenkins: {},
    banner: "",
    template: "",
    push: {},
    ak: {},
    at: {}
  }
) {
  const TipsBanner = config.banner;
  const TemplateName = config.template || "ui-msg";
  const GitInfo = generateGitInfo(config.git);
  const PkgVersion = utils.getPackageDistTag(GitInfo.RepoBranch);
  const DingTalkAccessToken = utils.findValidAK({
    ...DingGroupAccessToekn,
    ...config.ak
  });

  return pushArr(GitInfo.RepoBranch, DingTalkAccessToken, {
    msgtype: "markdown",
    at: {
      ...newAtData(GitInfo.RepoBranch, config.at, GitInfo)
    },
    markdown: {
      title: `构建 ${JobInfo.JOB_NAME}(${JobInfo.JOB_BUILD_DISPLAY_NAME})`,
      text: utils.convertMD2Str({
        TipsBanner,
        PkgVersion,
        TemplateName,
        GitInfo,
        JobInfo
      })
    },
    ...config.push
  });
}

module.exports = { init };
