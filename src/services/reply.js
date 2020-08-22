/**
 * @description article相关api请求
 */

import request from "./utils/request";

/**
 * 获取列表
 */
export const getList = params => request("/reply/list", { ...params });

/**
 * 修改状态
 */
export const resetStatus = params => {
    const { id } = params;
    return request(`/reply/${id}/resetStatus`, { ...params });
}

/**
 * 删除
 */
export const del = params => request("/reply/del", { ...params });
