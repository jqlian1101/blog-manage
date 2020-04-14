/**
 * @description article相关api请求
 */

import request from "./utils/request";

/**
 * 创建文章
 */
export const getList = params =>
    request("/comment/list", { ...params });
