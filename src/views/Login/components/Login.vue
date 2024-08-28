<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/stores/user';
const userStore = useUserStore();
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()
const status = defineModel('status')

const loginData = ref({
    account: '',
    password: ''
})

console.log(process.env);

const login = async () => {
    userStore.login({
        account:loginData.value.account,
        username:"123456",
        token:"123456"
    })
    ElMessage({
        type: 'success',
        message: '登录成功',
        duration: 1000
    })
    setTimeout(() => {
        router.push('/index')
    }, 1000)
    // const result = await postLogin(loginData.value.account,loginData.value.password)
    // // console.log(result);
    // if (result.code === 200) {
    //     userStore.setUser(
    //         result.account,
    //         result.username,
    //         result.type
    //     )
    //     // console.log(userStore.user);
    //     ElMessage({
    //         type: 'success',
    //         message: '登录成功',
    //         duration: 1000
    //     })
    //     setTimeout(() => {
    //         router.push('/index')
    //     }, 1000)
    // } else {
    //     ElMessage({
    //         type: 'error',
    //         message: '账号或密码错误，请重新输入！'
    //     })
    // }
}
</script>
<template>
    <h2 class="title">欢迎使用fewcode-data-view!</h2>
    <el-form class="form">
        <el-form-item label="账号" class="form-item">
        <el-input v-model="loginData.account" placeholder="请输入账号" />
        </el-form-item>
        <el-form-item label="密码" class="w-full">
        <el-input v-model="loginData.password" type="password" placeholder="请输入登录密码" />
        </el-form-item>
    </el-form>
    <div class="link">
        <el-link class="text-xs" @click="status = 'register'">注册账号</el-link>
        <el-link class="text-xs">忘记密码？</el-link>
    </div>
    <el-button 
        :disabled="!loginData.account || !loginData.password" round color="#01358e" size="large" @click="login">
        <span class="px-4">登录</span>
    </el-button>
</template>

<style scoped lang='scss'>
.title{
    font-size: 26px;
    font-weight: 500;
    margin-bottom: 10px;
    letter-spacing: 2px;
    color: rgb(67, 67, 67)
}
.form{
    width: 100%;
}
.form-item{
    width: 100%;
}
.el-form-item__label{
    font-size: 30px;
}
.link{
    width: 100%;
    display: flex;
    justify-content: space-between;
}
</style>