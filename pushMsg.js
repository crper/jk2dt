/* eslint-disable*/

const https = require("https");
const process = require("process");
const querystring = require("querystring")

function postMsg({ accessToken, postData }) {
  if (!accessToken || !postData) {
    return;
  }
  const ak = typeof accessToken === 'string' ? accessToken.trim() : typeof accessToken === 'number' ? `${accessToken}`.trim() : "";
  const akQueryString = querystring.stringify({
    access_token:ak
  });
  console.log(akQueryString);
  const options = {
    hostname: "oapi.dingtalk.com",
    port: 443,
    path: `/robot/send?${akQueryString}`,
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8;"
    }
  };

  const postDataStringfy =
    typeof postData === "object" ? JSON.stringify(postData) : "";

  const req = https.request(options, res => {
    console.log("DingTalk_POST_STATUS:", res.statusCode);
    console.log("DingTalk_POST_HEADERS:", res.headers);
    res.setEncoding("utf8");
    res.on("data", function(chunk) {
      // console.log("BODY: " + chunk);
      // JSON.parse(chunk)
      process.stdout.write(chunk);
    });
    res.on("end", () => {
      // console.log("响应中已无数据");
    });
  });
  req.on("error", function(e) {
    console.log("请求异常: " + e.message);
  });
  // write data to request body
  req.write(postDataStringfy);
  req.end();
}

module.exports = postMsg;
