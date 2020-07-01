/* eslint-disable */
const path = require("path");

const resolve = dir => {
  return path.join(__dirname, dir);
};

module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "" : "/",
  devServer: {
    port: 8000,
    open: true,
    proxy: {
      "/KBankAPI/UAT": {
        target: "http://172.21.57.214:3006" //"http://172.21.21.8:3006"
      }
    }
  },
  chainWebpack: config => {
    // == Fix all warning
    config.module
      .rule("eslint")
      .use("eslint-loader")
      .options({
        fix: true
      }),
      config.resolve.alias
        .set("@", resolve("src"))
        .set("_c", resolve("src/components"));
  }
};
