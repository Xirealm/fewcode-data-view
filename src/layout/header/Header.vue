<script lang="ts" setup>
import { title } from '@/constant/index'
// * 颜色
const decorationColors = ['#568aea', '#000000']
</script>
<template>
    <div class="d-flex jc-center">
        <dv-decoration-10 class="dv-dec-10" />
        <div class="d-flex jc-center">
        <dv-decoration-8 class="dv-dec-8" :color="decorationColors" />
        <div class="title">
            <span class="title-text">{{ title }}</span>
        </div>
        <dv-decoration-8
            class="dv-dec-8"
            :reverse="true"
            :color="decorationColors"
        />
        </div>
        <dv-decoration-10 class="dv-dec-10-s" />
    </div>
</template>
<style lang="scss" scoped>
.dv-dec-10,
.dv-dec-10-s {
    width: 1/3;
    height: 5px;
}
.dv-dec-10-s {
    transform: rotateY(180deg);
}
.dv-dec-8 {
    width: 200px;
    height: 50px;
}
.title {
    position: relative;
    width: 500px;
    text-align: center;
    background-size: cover;
    background-repeat: no-repeat;

    .title-text {
        font-size: 24px;
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translate(-50%);
    }
    .dv-dec-6 {
        position: absolute;
        bottom: -30px;
        left: 50%;
        width: 250px;
        height: 8px;
        transform: translate(-50%);
    }
}
</style>
