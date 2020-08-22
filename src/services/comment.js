/**
 * @description article相关api请求
 */

import request from "./utils/request";

/**
 * 获取评论列表
 */
export const getList = params => request("/comment/list", { ...params });

/**
 * 修改详情
 */
export const resetStatus = params => {
    const { id } = params;
    return request(`/comment/${id}/resetStatus`, { ...params });
}

/**
 * 删除
 */
export const del = params => request("/comment/del", { ...params });


