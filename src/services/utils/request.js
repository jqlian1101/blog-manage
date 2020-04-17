import axios from "axios";
import { message } from "antd";

import { getUserToken } from 'src/common/utils';
import { getUrl } from "./config";

const axiosInstance = axios.create({
    timeout: 0,
    headers: {
        // "Content-Type": "application/x-www-form-urlencoded"
    }
});

// 添加请求拦截器
axiosInstance.interceptors.request.use(
    config => {
        // 在发送请求之前做些什么
        return config;
    },
    error => {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

// 响应拦截器
axiosInstance.interceptors.response.use(
    response => {
        const { data = {} } = response;
        if (response.status !== 200) {
            message.error(response.statusText || "数据请求失败");
        }
        if (data.code !== 0) {
            message.error(data.message || "系统异常");
            return Promise.reject(data);
        }
        return data;
    },
    error => {
        // 响应错误
        return Promise.reject(error);
    }
);

export function request (
    url,
    data = {},
    {
        method = "post",
        showLoading = true,
        hostKey = "baseUrl",
        ...otherCfg
    } = {}
) {
    // 通用参数
    let common = {};

    const headers = {
        'Authorization': `Bearer ${getUserToken()}aa`
    }

    // 生成请求数据
    let requestData = { ...common, ...data };

    // axios配置
    const config = {
        ...otherCfg,
        method,
        headers,
        url: getUrl(url, hostKey),
        data: requestData
    };

    return axiosInstance.request(config).then(data => {
        if (data.code !== 0) {
            return Promise.reject(data);
        }
        return data;
    }).catch(data => {
        // 暂未登录
        if (data.code === 11005 || data.code === 11007) {
            window.location.href = '/'
        }
        return data;
    });
}

export default request;
