// Jenkins 环境变量
const utils = require("../utils");
const process = require("process");
const JobInfo = {
  JOB_DOMAIN: "",
  JOB_NAME: process.env.JOB_NAME ? process.env.JOB_NAME : "",
  JOB_BUILD_ID: process.env.BUILD_ID ? process.env.BUILD_ID : "",
  JOB_BUILD_DISPLAY_NAME: `${
    process.env.BUILD_DISPLAY_NAME ? process.env.BUILD_DISPLAY_NAME : ""
  } 构建过程日志`,
  JOB_EXECUTOR_NUMBER: process.env.EXECUTOR_NUMBER
    ? process.env.EXECUTOR_NUMBER
    : "",
  JOB_STATUS: process.env.EXECUTOR_NUMBER === "0" ? "构建成功" : "构建失败",
  JOB_END_TIME: utils.getCurentTime()
};

JobInfo.JOB_BUILD_URL = `${JobInfo.JOB_DOMAIN}/${JobInfo.JOB_NAME}/${JobInfo.JOB_BUILD_ID}/console`;

module.exports = JobInfo;
