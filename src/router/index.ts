import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import pinia from "@/stores/index";
import { useUserStore } from "@/stores/user";
const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login/LoginView.vue'),
  },
  {
    path: '/',
    name: 'root',
    component: () => import('../layout/Layout.vue'),
    redirect: '/index',
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('../views/index/IndexView.vue')
      },
      {
        path: 'information',
        name: 'information',
        component: () => import('../views/information/info/index.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

//路由守卫
router.beforeEach(async (to, from) => {
  const userStore = useUserStore(pinia);
  if (userStore.user.token === "" && to.name !== "login") {
    return "/login";
  }
});

export default router
