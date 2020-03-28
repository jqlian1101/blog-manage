/**
 * @description tag相关api请求
 */

import request from "./utils/request";

/**
 * 获取文章 标签 列表
 */
export const getTagList = params => request("/tag/list", { ...params });

/**
 * 新建标签
 * @param {Object} params { name }
 */
export const createTag = params => request("/tag/create", { ...params });

/**
 * 删除标签
 * @param {Object} params { id }
 */
export const deleteTag = params => request("/tag/del", { ...params });
