const { createProxyMiddleware } = require("http-proxy-middleware");
const { default: config } = require("./config");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: config.API_URL,
      changeOrigin: true,
      pathRewrite: { "^/api": "" },
    })
  );
};
