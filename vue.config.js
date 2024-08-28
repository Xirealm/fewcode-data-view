const { defineConfig } = require('@vue/cli-service')
// const AutoImport = require("unplugin-auto-import/webpack");
// const Components = require("unplugin-vue-components/webpack");
// const ElementPlus = require("unplugin-element-plus/webpack");
// const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  // css: {
  //   loaderOptions: {
  //     scss: {
  //       additionalData: `@use "~/assets/scss/element/index.scss";`,
  //     },
  //   },
  // },
  // configureWebpack: {
  //   plugins: [
  //     AutoImport({
  //       resolvers: [ElementPlusResolver({
  //         importStyle: "sass",
  //       })],
  //     }),
  //     Components({
  //       resolvers: [ElementPlusResolver({
  //         importStyle: "sass",
  //       })],
  //     }),
  //     ElementPlus({
  //       useSource: true,
  //     }),
  //   ],
  // },
})