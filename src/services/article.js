/**
 * @description article相关api请求
 */

import request from "./utils/request";

/**
 * 获取文章标签列表
 */
export const getTagList = params => request("/article/tag-list", { ...params });

/**
 * 创建文章文章
 */
export const createArticle = params =>
    request("/article/create", { ...params });

export default {
    getTagList,
    createArticle
};
