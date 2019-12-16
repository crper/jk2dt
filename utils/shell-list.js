const path = require("path");
const pkgFile = require(path.resolve(process.cwd(), "./package.json"));
const projectExecShellPath = process.cwd();
const fs = require("fs");
const { execSync } = require("child_process");

function rootExistChangelogFile() {
  const CHANGELOG = path.resolve(process.cwd(), "./CHANGELOG.md");
  try {
    if (fs.existsSync(CHANGELOG)) {
      return true;
    } else {
      return !!execSync(
        `ls -l  ${projectExecShellPath} | grep -i "changelog.md"`
      ).toString();
    }

    return false;
  } catch (error) {
    return false;
  }
}

/**
 * 获取包的dist-tags
 */
function getPackageDistTag(branch) {
  if (
    !pkgFile ||
    !pkgFile.name ||
    !pkgFile.main ||
    ["master", "dev", "develop", "next"].indexOf(branch) === -1
  ) {
    return "";
  }
  let distTag;
  switch (branch) {
    case "master":
      distTag = "latest";
      break;
    case "dev":
      distTag = "dev";
      break;
    case "develop":
      distTag = "dev";
      break;
    case "next":
      distTag = "next";
      break;
    default:
      distTag = "dev";
      break;
  }
  const execShell = `npm show ${pkgFile.name}  dist-tags.${distTag} 2>/dev/null`;
  try {
    return execSync(execShell).toString();
  } catch (error) {
    return "";
  }
}

function getLastNCommit(n = 5, branch) {
  if (n <= 0 || !branch) {
    return "";
  }
  const readLineFilterResult =
    branch === "master"
      ? 'grep -E -i -v "lerna"'
      : 'grep -E -i -v "lerna|into|merge"';
  const lineModify = "sed  's/^/> /g' |sed  's/$/\\\n/g' ";
  const execShell = `git log --oneline -${n} ${branch}| ${readLineFilterResult} |  ${lineModify}  `;
  try {
    return execSync(execShell).toString();
  } catch (error) {
    return "";
  }
}

module.exports = {
  getLastNCommit,
  getPackageDistTag,
  rootExistChangelogFile
};
