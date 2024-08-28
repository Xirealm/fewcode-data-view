<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()

const registerData = ref({
  account: '',
  username:'',
  password: '',
})


const status = defineModel('status')
const register = async () => {
  // const result = await postRegister(
  //   registerData.value.account,
  //   registerData.value.username,
  //   registerData.value.password1,
  //   registerData.value.password2
  // )
  // console.log(result);
  // if (result.code == 200) {
  //   ElMessage({
  //     type: 'success',
  //     message: '注册成功',
  //     duration:1000
  //   })
  //   status.value = 'login'
  // }
}
</script>
<template>
    <span class="link">
      <el-link class="text-xs decoration-slice" @click="status = 'login'" type="primary"> 
        << 返回
      </el-link>
    </span>
    <el-form label-width="auto" label-position="left" class="form">
      <el-form-item label="账号" class="form-item">
      <el-input v-model="registerData.account" placeholder="请输入账号" />
      </el-form-item>
      <el-form-item label="用户名" class="form-item">
        <el-input v-model="registerData.username" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item label="设置密码" class="form-item">
        <el-input v-model="registerData.password" placeholder="请输入登录密码" />
      </el-form-item>
    </el-form>
    <div>
      <el-button 
        :disabled="!registerData.username || !registerData.account || !registerData.password"
        round color="#01358e" size="large" 
        @click="register">
        <span class="px-4">注册</span>
      </el-button>
    </div>
</template>
<style scoped lang="scss">
.link{
  width: 100%;
  display: flex;
  justify-content: flex-start;
}
.form{
    width: 100%;
}
.form-item{
    width: 100%;
}
</style>