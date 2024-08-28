import axios, { AxiosInstance } from "axios";
import { ElMessage, ElMessageBox } from "element-plus";
import qs from "qs";
import { useUserStore } from "../stores/user";
const userStore = useUserStore();

// 配置新建一个 axios 实例
const service: AxiosInstance = axios.create({
  // baseURL: process.env.VUE_API_URL,
  baseURL: "http://47.100.198.147:20101/",
  timeout: 50000,
  headers: { "Content-Type": "application/json" },
  paramsSerializer: {
    serialize(params) {
      return qs.stringify(params, { allowDots: true });
    },
  },
});

// 添加请求拦截器
service.interceptors.request.use(
  (config) => {
    const user_token = userStore.user.token;
    console.log("Token:", user_token); // 打印 token
    // 在发送请求之前做些什么 token
    if (user_token !== "") {
      config.headers["Authorization"] = `${user_token}`;
    }
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
service.interceptors.response.use(
  (res) => {
    // 文件下载
    if (res.headers["content-disposition"]) {
      const downLoadMark = res.headers["content-disposition"].split(";");
      if (downLoadMark[0] === "attachment") {
        // 执行下载
        let fileName = downLoadMark[1].split("filename=")[1];
        if (fileName) {
          fileName = decodeURI(fileName);
          const url = window.URL.createObjectURL(new Blob([res.data]));
          const link = document.createElement("a");
          link.style.display = "none";
          link.href = url;
          link.setAttribute("download", fileName);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          return;
        } else {
          return res;
        }
      }
    }

    // 处理下载时，发生错误的情况
    if (res.data.type === "application/json") {
      const reader = new FileReader();
      reader.readAsText(res.data);
      reader.onload = function (result) {
        return handleResult(JSON.parse(result.target.result as string));
      };
    } else {
      return handleResult(res.data);
    }
  },
  (error) => {
    // 对响应错误做点什么
    if (error.message.indexOf("timeout") != -1) {
      ElMessage.error("网络超时");
    } else if (error.message == "Network Error") {
      ElMessage.error("网络连接错误");
    } else {
      handleResult(error.response.data);
    }
    return Promise.reject(error);
  }
);

function handleResult(data: any) {
  // 未设置状态码则默认成功状态
  const code = data.code || "0000";
  // 获取错误信息
  const msg = data.msg || "系统未知错误，请反馈给管理员";

  if (code === "1001" || code === "1002" || code === "1003") {
    if (document.getElementsByClassName("el-overlay-message-box").length > 0)
      return false;
    ElMessageBox.confirm(
      "当前未登录账号，您可以继续留在该页面，或者前往登录",
      "系统提示",
      {
        confirmButtonText: "前往登录",
        cancelButtonText: "暂不登录",
        type: "warning",
      }
    )
      .then(() => {
        userStore.logout(); // 退出登录
        window.location.href = "/"; // 去登录页
      })
      .catch(() => {
        userStore.logout(); // 清除浏览器全部临时缓存
      });
  } else if (code !== "0000") {
    ElMessage.error(msg);
  } else {
    return data.data === undefined ? data : data.data;
  }
}

// 导出 axios 实例
export default service;
