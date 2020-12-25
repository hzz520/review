import VueRouter, { Route, RouteConfig } from 'vue-router'

declare module 'vue/types/vue' {
  interface Vue {
      $router: VueRouter // 这表示this下有这个东西
      $route: Route
  }
}
const Demo = (r) => require.ensure([], () => r(require('../pages/demo/index.vue')), () => {}, 'Demo')

interface Config extends RouteConfig {
  meta?: {
    title: string
    keepAlive?: boolean
  }
}

const routeConfig: Config[] = [
  {
    path: '/',
    name: 'Demo',
    component: Demo,
    meta: {
      title: 'demo'
    }
  },
]

export default routeConfig
