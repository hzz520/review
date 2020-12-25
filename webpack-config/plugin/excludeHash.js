/*
 * @Author: huangzz 
 * @Date: 2019-09-05 10:38:34 
 * @Last Modified by: huangzz
 * @Last Modified time: 2019-09-05 14:37:46
 */
const _ = require('lodash')

function ChunkHashExclude (options) {
    this.options = _.assign({
        excludeJs: [],
        excludeCss: [],
        publicCssPath: '',
        cancelHtmlHash: true
    }, options)
}
ChunkHashExclude.prototype.cancelAssetsHash =  function(compilation, callback) {
    compilation.chunks.forEach((chunk, i) => {
        chunk.files.forEach((filename, j) => {
          if (this.options.excludeJs.indexOf(chunk.name) > -1 && filename.indexOf('js') > -1) {
            let reg = new RegExp(`(.*)(${chunk.name})(.*)(.js|.js.map)`)
            if (filename.replace(reg, '$1$2$4') !== filename) {
              compilation.chunks[i].files.splice(j, 1, filename.replace(reg, '$1$2$4'))
              compilation.assets[filename.replace(reg, '$1$2$4')] = compilation.assets[filename]
              delete compilation.assets[filename]
            }
          }
          if (filename.indexOf('css') > -1) {
            let reg = new RegExp(`(.*)(${chunk.name})(.*)(.css|.css.map)`)
            let newFilename = filename.replace(reg, '$1$2$4')
            if (this.options.excludeCss.indexOf(chunk.name) > -1) {
              if (newFilename !== filename) {
                compilation.chunks[i].files.splice(j, 1, newFilename)
                compilation.assets[newFilename] = compilation.assets[filename]
                delete compilation.assets[filename]
              }
            }
          }
        })
      })
      callback()
}

ChunkHashExclude.prototype.cancelHtmlHash = function (compilation, callback, compiler) {
    compilation.chunks.map(chunk => {
      if (this.options.excludeJs.indexOf(chunk.names[0]) > -1) {
        let reg = new RegExp(`(.*)(${chunk.names[0]})(.*)(.js)`)
        let index = -1
        compilation.body.some((item, i) => {
          if (item.attributes.src.indexOf(chunk.names[0]) > -1) {
            index = i
            return true
          }
          return false
        })
        if (index > -1) compilation.body[index].attributes.src = compilation.body[index].attributes.src.replace(reg, '$1$2$4')
      }
      if (this.options.excludeCss.indexOf(chunk.names[0]) > -1) {
        let reg = new RegExp(`(.*)(${chunk.names[0]})(.*)(.css)`)
        let index = -1
        compilation.head.some((item, i) => {
          if (item.attributes.href.indexOf(chunk.names[0]) > -1) {
            index = i
            return true
          }
          return false
        })
        if (index > -1) compilation.head[index].attributes.href = compilation.head[index].attributes.href.replace(reg, '$1$2$4')
        if (this.options.publicCssPath) {
          compilation.head[index].attributes.href = compilation.head[index].attributes.href.replace(compiler.options.output.publicPath, this.options.publicCssPath)
        }
      } 
    })
    callback()
}
// 去掉html模版里面对应chunk资源文件的hash值
ChunkHashExclude.prototype.apply = function (compiler) {
    if (compiler.hooks) {
        compiler.hooks.emit.tapAsync('emit', (compilation, callback) => {
            this.cancelAssetsHash(compilation, callback)
        })
        //  替换html静态资源的hash值
        
        compiler.hooks.compilation.tap('compilation', (compilation) => {
          if (this.options.cancelHtmlHash) {
            compilation.hooks.htmlWebpackPluginAlterAssetTags.tapAsync('compilation', (compilation, callback) => {
              this.cancelHtmlHash(compilation, callback, compiler)
            })
          }
          if (this.options.publicCssPath) {
            compilation.mainTemplate.hooks.requireEnsure.tap('requireEnsure', (source, chunk, hash) => {
              return source.replace(/(__webpack_require__|c).p/, "'" + this.options.publicCssPath + "'")
            })
          }
        })
    } else {
       compiler.plugin('emit', (compilation, callback) => {
           cancelAssetsHash(compilation, callback)
       })
       compiler.plugin('compilation', compilation => {
        if (this.options.cancelHtmlHash) {
          compilation.plugin('html-webpack-plugin-alter-asset-tags', (compilation, callback) => {
            cancelHtmlHash(compilation, callback)
          })
        } 
        if (this.options.publicCssPath) {
          compiler.plugin('this-compilation', compilation => {
            compilation.mainTemplate.plugin('require-ensure', (source, chunk, hash) => {
              return source.replace(/(__webpack_require__|c).p/, "'" + this.options.publicCssPath + "'")
            })
          })
        }
      })
    }
  }
  
  module.exports = ChunkHashExclude
  