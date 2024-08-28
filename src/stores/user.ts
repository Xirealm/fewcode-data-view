import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { User } from "@/types/user"

export const useUserStore = defineStore(
  "user",
  () => {
    const user = ref<User>({
      account: "",
      username: "",
      token: "",
    });
    const isLogin = computed(() => {
        return user.value.token !== "";
    });
    const login = (data:User) => {
        user.value = data;
    };
    const logout = () => {
      user.value = {
        account: "",
        username: "",
        token: ""
      };
    };
    return {
      user,
      isLogin,
      login,
      logout,
    };
},
  //开启持久化存储（存储至localstorage中）
  {
    persist: true,
  }
);
