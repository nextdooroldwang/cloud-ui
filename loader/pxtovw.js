let defaultsProp = {
  unitToConvert: 'px',
  viewportWidth: 1680,
  unitPrecision: 3,
  viewportUnit: 'vw',
  fontViewportUnit: 'vw',
  minPixelValue: 1
}
const loaderUtils = require('loader-utils')

const opts = loaderUtils.getOptions(this)
const defaults = Object.assign({}, defaultsProp, opts)

function createPxReplace (
  viewportSize,
  minPixelValue,
  unitPrecision,
  viewportUnit
) {
  // 不用好奇$0, $1是怎么来的，他们是replace第二个参数提供的
  return function ($0, $1) {
    if (!$1) return
    var pixels = parseFloat($1)
    if (pixels <= minPixelValue) return
    return toFixed((pixels / viewportSize) * 100, unitPrecision) + viewportUnit
  }
}
function toFixed (number, precision) {
  var multiplier = Math.pow(10, precision + 1),
    wholeNumber = Math.floor(number * multiplier)
  return (Math.round(wholeNumber / 10) * 10) / multiplier
}

module.exports = function (source) {
  const template = /<template>([\s\S]+)<\/template>/gi
  const ZPXRegExp = /(\d+)px/
  let _source = ''
  // 如果当前的source里面存在template
  if (template.test(source)) {
    // 匹配template部分
    _source = source.match(template)[0]
  }
  // 匹配出template里面的px
  let pxGlobalRegExp = new RegExp(ZPXRegExp.source, 'ig')
  if (pxGlobalRegExp.test(_source)) {
    // px转换vw，核心部分
    let $_source = _source.replace(
      pxGlobalRegExp,
      createPxReplace(
        defaults.viewportWidth,
        defaults.minPixelValue,
        defaults.unitPrecision,
        defaults.viewportUnit
      )
    )
    // 转换之后替换回source中，返回函数值
    return source.replace(template, $_source)
  } else {
    // 没有就不转，直接返回
    return source
  }
}
