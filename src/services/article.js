import request from "./utils/request";

/**
 * 获取文章标签列表
 */
export const getTagList = params => request("/article/tag-list", { ...params });

export default {
    getTagList
};
