/**
 * @description tag相关api请求
 */

import request from "./utils/request";

/**
 * 获取文章 分类 列表
 */
export const getList = params => request("/category/list", { ...params });

/**
 * 新建分类
 * @param {Object} params { name }
 */
export const create = params => request("/category/create", { ...params });

/**
 * 删除分类
 * @param {Object} params { id }
 */
export const del = params => request("/category/del", { ...params });
