/**
 * @description article相关api请求
 */

import request from "./utils/request";

/**
 * 创建文章
 */
export const createArticle = params =>
    request("/article/create", { ...params });

/**
 * 获取文章列表
 */
export const getArticleList = params => request("/article/list", { ...params });

/**
 * 获取文章详情
 * @param {id}
 */
export const getArticleDetail = params =>
    request("/article/detail", { ...params });

/**
 * 删除文章
 * @param {id}
 */
export const deleteArticle = params => request("/article/del", { ...params });

/**
 * 修改发布状态
 * @param {object}  { id: article.id, status: 0 | 1 }  0：草稿，1：发布
 */

export const setArticleStatus = params =>
    request("/article/change-status", { ...params });
