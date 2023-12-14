const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === "production" ? "https://kamiiliu.github.io/r2b1-mobile/" : "/",
  transpileDependencies: true
})
