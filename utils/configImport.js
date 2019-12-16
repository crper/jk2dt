const fs = require("fs");
const path = require("path");
const process = require("process");
const jk2dtFile = path.resolve(process.cwd(), "./jk2dtrc.js");
const pkgFile = require(path.resolve(process.cwd(), "./package.json"));
let importConfig = {};
if (fs.existsSync(jk2dtFile)) {
  process.stdout.write("jk2dt配置文件存在 \n");
  const config = require(jk2dtFile);
  importConfig = config;
} else {
  if (fs.existsSync(pkgFile)) {
    process.stdout.write("jk2dt配置文件不存在，尝试从 package.json 读取 \n");
    if (pkgFile.jk2dt && typeof pkgFile.jk2dt === "object") {
      importConfig = pkgFile.jk2dt;
    } else {
      process.stdout.write("package.json也没有对应配置项,采用默认配置 \n");
    }
  }
}

module.exports = importConfig;
