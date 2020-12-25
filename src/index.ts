/*
 * @Author: huangzz 
 * @Date: 2019-09-18 00:22:39 
 * @Last Modified by: huangzz
 * @Last Modified time: 2020-12-25 16:16:13
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

import IndexView from './index.vue'
import routes from './router/index'
import fastClick from 'fastclick'

import '@/assets/css/base.less'

import 'intersection-observer'

Vue.config.productionTip = false

Vue.use(VueRouter)


export const router = new VueRouter({
    mode: 'history',
    base: `/${process.env.BASE}/`,
    scrollBehavior (to, from, savedPosition) {
        return !to.params.name || !from.params.name ? { x: 0, y: 0 } : savedPosition
    },
    routes
})

// 调试开关
if (process.env.V_CONSOLE) {
  let Vconsole = require('vconsole')
  // eslint-disable-next-line no-new
  new Vconsole()
}


fastClick.prototype.focus = function(targetElement) {
    var length;
    let deviceIsIOS = window.navigator.userAgent.toLowerCase().indexOf('iphone') > -1
    if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {

        length = targetElement.value.length;

        targetElement.focus();

        targetElement.setSelectionRange(length, length)

    } else {
        targetElement.focus()
    }
}
    

// 实例化
new Vue({
    el: '#app',
    router,
    mounted () {
        fastClick['attach'](document.body)
        window['vue'] = this
    },
    render: h => h(IndexView)
})