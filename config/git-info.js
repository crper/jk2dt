/* eslint-disable */
const utils = require("../utils");
const process = require("process");

function generateGitInfo(options = {}) {
  const GitInfo = {
    RepoDoc: "",
    RepoDomain: "",
    RepoGroup: process.env.gitlabSourceNamespace
      ? process.env.gitlabSourceNamespace
      : "",
    RepoTitle: process.env.gitlabSourceRepoName
      ? process.env.gitlabSourceRepoName
      : "",
    RepoName: process.env.gitlabSourceRepoName
      ? process.env.gitlabSourceRepoName
      : "",
    RepoBranch: process.env.gitlabTargetBranch
      ? process.env.gitlabTargetBranch
      : "",
    RepoCommitCountShow: 5,
    RepoActionType: process.env.gitlabActionType
      ? process.env.gitlabActionType
      : "",
    RepoPushMan: process.env.gitlabUserName
      ? `${process.env.gitlabUserName}(${process.env.gitlabUserEmail})`
      : "",
    RepoChangeLog: "",
    RepoIssues: "",
    ...options
  };

  GitInfo.RepoUrl = GitInfo.RepoDomain
    ? `${GitInfo.RepoDomain + "/" + GitInfo.RepoGroup + "/" + GitInfo.RepoName}`
    : process.env.gitlabSourceRepoHomepage
    ? process.env.gitlabSourceRepoHomepage
    : "";

  if (!GitInfo.RepoIssues) {
    GitInfo.RepoIssues = GitInfo.RepoUrl ? `${GitInfo.RepoUrl}/issues` : "";
  }
  if (!GitInfo.RepoChangeLog) {
    GitInfo.RepoChangeLog =
      utils.rootExistChangelogFile() && GitInfo.RepoUrl
        ? `${GitInfo.RepoUrl}/blob/master/CHANGELOG.md`
        : "";
  }

  GitInfo.BuildCommit = process.env.gitlabAfter ? process.env.gitlabAfter : "";
  if (GitInfo.BuildCommit) {
    GitInfo.BuildCommitMDLink = GitInfo.RepoUrl
      ? `[${GitInfo.BuildCommit.slice(0, 8)}](${GitInfo.RepoUrl}/commit/${
          GitInfo.BuildCommit
        })`
      : GitInfo.BuildCommit;
  }

  GitInfo.RepoBranchUrl = `[origin/${GitInfo.RepoBranch}](${GitInfo.RepoUrl}/commits/${process.env.gitlabTargetBranch})`;
  GitInfo.RepoLongTitle = `${GitInfo.RepoTitle}(${GitInfo.RepoGroup + "/"}${
    GitInfo.RepoName
  })`;

  MD_GitInfoDoc = GitInfo.RepoDoc ? `[docs](${GitInfo.RepoDoc})` : "";
  MD_GitInfoRepo = GitInfo.RepoUrl ? `[repo](${GitInfo.RepoUrl})` : "";
  MD_GitInfoIssue = GitInfo.RepoIssues ? `[issues](${GitInfo.RepoIssues})` : "";
  MD_GitInfoChangelog = GitInfo.RepoChangeLog
    ? `[changelog](${GitInfo.RepoChangeLog})`
    : "";
  MD_GitStatusBar = [
    MD_GitInfoDoc,
    MD_GitInfoRepo,
    MD_GitInfoIssue,
    MD_GitInfoChangelog
  ]
    .filter(item => {
      if (item) {
        return item;
      }
    })
    .join("|");
  GitInfo.RepoDesc = `
  > ${GitInfo.RepoLongTitle}
  >
  > ${MD_GitStatusBar}`;

  GitInfo.RepoRecentCommitMsg = GitInfo.RepoBranch
    ? utils.getLastNCommit(
        GitInfo.RepoCommitCountShow,
        `origin/${GitInfo.RepoBranch}`
      )
    : "";
  return GitInfo;
}

module.exports = generateGitInfo;
