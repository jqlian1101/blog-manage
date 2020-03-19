/**
 * @description article相关api请求
 */

import request from "./utils/request";

/**
 * 获取文章 标签 列表
 */
export const getTagList = params => request("/article/tag-list", { ...params });

/**
 * 获取文章 分类 列表
 */
export const getCategoryList = params =>
    request("/article/category-list", { ...params });

/**
 * 创建文章
 */
export const createArticle = params =>
    request("/article/create", { ...params });

/**
 * 获取文章列表
 */
export const getArticleList = params => request("/article/list", { ...params });

export default {
    getTagList,
    createArticle,
    getArticleList,
    getCategoryList
};
