<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import useDraw from '@/utils/useDraw'
import Header from './header/Header.vue'
import Main from "./main/Main.vue"
// * 适配处理
const { appRef, calcRate, windowDraw, unWindowDraw } = useDraw()
// 生命周期
onMounted(() => {
    // 屏幕适应
    windowDraw()
    calcRate()
    //取消加载状态
    cancelLoading()
})
onUnmounted(() => {
  unWindowDraw()
})
// 加载标识
const loading = ref<boolean>(true)
// 处理loading
const cancelLoading = () => {
  setTimeout(() => {
    loading.value = false
  }, 500)
}
</script>
<template>
    <div ref="appRef" id="index">
        <div class="bg">
            <dv-loading v-if="loading">Loading...</dv-loading>
            <div v-else class="host-body">
                <Header />
                <Main />
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
#index {
  color: #d3d6dd;
  width: 1920px;
  height: 1080px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transform-origin: left top;
  .bg {
    width: 100%;
    height: 100%;
    padding: 16px 16px 0 16px;
    background-image: url('@/assets/pageBg.png');
    background-size: cover;
    background-position: center center;
  }
}
</style>