
module.exports = {
    publicPath: './',
    indexPath: 'index.html', // 相对于打包路径index.html的路径
    assetsDir: '', // 相对于outputDir的静态资源(js、css、img、fonts)目录
    lintOnSave: 'error', // 设置eslint报错时停止代码编译,false为取消Eslint验证
    productionSourceMap: false, // 不需要生产环境的 source map（减小dist文件大小，加速构建）
}
