

import request from "./utils/request";

/**
 * 登录
 */
export const userLogin = params => request("/user/login", { ...params });
