const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === "production" ? "https://kamiiliu.github.io/R2B1-mobile/" : "/",
  transpileDependencies: true
})
