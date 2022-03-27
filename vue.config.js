const path = require("path");

module.exports = {
  publicPath:
    process.env.NODE_ENV === "production" ? "/kangaroo-1-website/" : "/",
  lintOnSave: false,
  chainWebpack: (config) => {
    //确定icon所在的目录   __dirname是当前目录的意思
    const dir = path.resolve(__dirname, "src/assets/icons");

    config.module
      .rule("svg-sprite")
      .test(/\.svg$/)
      .include.add(dir)
      .end() //包含icons目录
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({ extract: false })
      .end();
    config
      .plugin("svg-sprite")
      .use(require("svg-sprite-loader/plugin"), [{ plainSprite: true }]);
    config.module.rule("svg").exclude.add(dir); //其他svg loader 排除 icons目录
  },
};
