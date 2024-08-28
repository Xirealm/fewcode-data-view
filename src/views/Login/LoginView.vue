<script setup lang="ts">
import { ref,onMounted,onUnmounted } from "vue";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
const status = ref<"login" | "register">("login");
</script>
<template>
  <div class="view">
    <div class="logo">
      <img class="logo-img" src="../../assets/logo.png">
      <span class="logo-word">FC CODE</span>
    </div>
    <div class="form-container">
      <Login 
        v-if="status === 'login'" 
        v-model:status="status" />
      <Register
        v-else-if="status === 'register'"
        v-model:status="status" />
    </div>
  </div>
</template>
<style scoped>
.view{
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(../../assets/pageBg.png);
}
.logo{
  position: absolute;
  display: flex;
  align-items: center;
  left: 40px;
  top: 40px;
  .logo-img{
    width: 60px;
    height: 60px;
  }
  .logo-word{
    font-size: 24px;
    color: #d3d6dd;
    margin-left: 10px;
  }
}
.form-container{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  background-color: white;
  padding: 20px 30px;
  border-radius: 16px;
  width: 460px;
  height: 300px;
}
</style>
