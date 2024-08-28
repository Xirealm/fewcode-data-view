<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>
<template>
    <div class="react-left">
        <RouterLink to="/index" class="text" style="color: #d3d6dd">返回上级</RouterLink>
    </div>
</template>
<style lang="scss" scoped>
.react-left {
    margin-left: 20px;
    font-size: 18px;
    width: 300px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    transform: skewX(45deg);
    background-color: #0f1325;
    cursor: pointer;
    .text {
        display: block;
        transform: skewX(-45deg);
    }
    margin-bottom: 30px;
}
</style>