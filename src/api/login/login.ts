import request from "@/utils/request";

/**
 * post 注册
 * @param account 账号
 * @param username 用户名
 * @param password 密码
 */
export const postRegister = (account:string,username:string,password:string): any => {
  return request.post("", {
    account: account,
    username: username,
    password: password,
  });
};
/**
 * post 登录
 * @param account 账号
 * @param password 密码
 */
export const postLogin = (account: string,password: string): any => {
  return request.post("", {
    account: account,
    password: password,
  });
};
