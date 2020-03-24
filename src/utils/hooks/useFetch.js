import { useState, useEffect } from "react";

/**
 * 1. 解决每个函数都要统一写try/catch的流程
 * 2. 解决发送请求需要手动加锁防止多次重复请求的痛点
 * 3. 不需要在手动useState loading了～，直接获取fetching值
 * 4. （甚至在参数发生变化时只需要传入更改的参数就OK）已删除
 * @param getFunction 发送请求的函数
 * @param params 参数
 * @param execute 是否立即执行请求函数
 */

export const useFetch = (getFunction, params, execute = true) => {
    const [res, setRes] = useState(null);
    const [fetching, setFetch] = useState(false);
    const [failed, setFailed] = useState(null);

    const fetchData = async par => {
        if (fetching) return;
        setFetch(true);
        try {
            const result = await getFunction(par);
            setRes(result);
            setFetch(false);
            return result;
        } catch (err) {
            console.error(err);
            setFetch(false);
            failed && failed(err);
        }
    };

    const setError = fn => fn && setFailed(fn);

    // 首次执行只请求一次
    useEffect(() => {
        execute && fetchData(params);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /**
     * res 返回的数据
     * fetching 是否在请求中
     * fetchData 手动再次触发请求
     * setError 当发生请求错误时，需要执行的回掉函数
     */
    return { res, fetching, fetchData, setError };
};

export default {
    useFetch
};
