const fs = require("fs");
const path = require("path");
function mdTemplateStr({
  TipsBanner,
  TemplateName,
  PkgVersion,
  JobInfo: {
    JOB_NAME,
    JOB_BUILD_DISPLAY_NAME,
    JOB_BUILD_URL,
    JOB_STATUS,
    JOB_END_TIME
  },
  GitInfo: {
    RepoUrl,
    RepoBranch,
    RepoName,
    RepoDesc,
    RepoBranchUrl,
    RepoChangeLog,
    RepoPushMan,
    RepoActionType,
    RepoRecentCommitMsg,
    BuildCommitMDLink
  }
}) {
  const PlacehoderVar = {
    "{{TIPS_BANNER}}": TipsBanner,
    "{{JK_JOBS_NAME}}": JOB_NAME,
    "{{JK_JOBS_TIME}}": JOB_END_TIME,
    "{{JK_JOBS_CONSOLE}}": `[${JOB_BUILD_DISPLAY_NAME}](${JOB_BUILD_URL})`,
    "{{JK_JOBS_STATUS}}": JOB_STATUS,
    "{{GitRepoName}}": RepoName,
    "{{GitRepoDesc}}": RepoDesc,
    "{{GitRepoBranch}}": RepoBranch,
    "{{GitRepoBranchUrl}}": RepoBranchUrl,
    "{{PkgVersion}}": PkgVersion ? `**打包版本:** ${PkgVersion}` : "",
    "{{RepoRecentTitle}}": RepoRecentCommitMsg ? "**提交概要:**" : "",
    "{{RepoRecentCommitMsg}}": RepoRecentCommitMsg,
    "{{GitRepoChangeLog}}":
      RepoBranch === "master"
        ? `**变更日志:** [CHANGELOG](${RepoChangeLog})`
        : "",
    "{{GitBuildCommitLink}}": BuildCommitMDLink
      ? `**构建提交:** ${BuildCommitMDLink}`
      : "",
    "{{GitRepoActionType}}": RepoActionType
      ? `**推送行为:** ${RepoActionType}`
      : "",
    "{{PushBy}}": RepoPushMan
  };
  let mdStr = fs.readFileSync(
    path.join(__dirname, `../template/${TemplateName}.md`)
  );

  mdStr = mdStr.toString();

  for (const [k, v] of Object.entries(PlacehoderVar)) {
    const re = new RegExp(k, "g");
    mdStr = mdStr.replace(re, v);
  }
  return mdStr;
}

module.exports = mdTemplateStr;
