

<!-- 
    待优化：1. 路由状态保持(应用场景：列表页进入详情页再回到列表页记录滚动条和页面状态) 坑没趟明白，慎用！！！
           2. 骨架屏的接入
 -->
<template>
    <transition :name="transitionName">
        <router-view :key="$route.name" class="page-view"></router-view>
    </transition>
</template>

<script lang='ts'> 
import { 
    Component,
    Vue,
    Watch
} from 'vue-property-decorator'

import {
    namespace
} from 'vuex-class'

@Component
export default class Entry extends Vue {

    @Watch('$route')
    async watchRoute (to, from) {
     
    }
}
</script>

<style lang="less">
    .page-view {
        width: 750px;
        overflow-x: hidden;
    }
    .slide-right-enter-active,
    .slide-right-leave-active,
    .slide-left-enter-active,
    .slide-left-leave-active {
        will-change: transform;
        transition: all 500ms;
        position: absolute;
    }

    .slide-right-enter {
        opacity: 0;
        transform: translate3d(-100%, 0, 0);
    }

    .slide-right-leave-active {
        opacity: 0;
        transform: translate3d(100%, 0, 0);
    }

    .slide-left-enter {
        opacity: 0;
        transform: translate3d(100%, 0, 0);
    }

    .slide-left-leave-active {
        opacity: 0;
        transform: translate3d(-100%, 0, 0);
    }
</style>
