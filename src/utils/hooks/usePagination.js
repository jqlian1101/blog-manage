import { useState, useMemo, useCallback } from "react";

const defaultPageSize = 10;
export const usePagination = (options = {}) => {
    const [total, setTotal] = useState(options.total || 0);
    const [current, setCurrent] = useState(options.current || 1);
    const [pageSize, setPageSize] = useState(
        options.pageSize || defaultPageSize
    );

    const totalPage = useMemo(() => Math.ceil(total / pageSize), [
        pageSize,
        total
    ]);

    const onChange = useCallback(
        (c, p, t) => {
            if (c === current && t === total && p === pageSize) return;
            let toCurrent = c <= 0 ? 1 : c;
            const toPageSize = p <= 0 ? 1 : p;

            const tempTotalPage = Math.ceil(t / toPageSize);

            if (toCurrent > tempTotalPage) {
                toCurrent = tempTotalPage;
            }

            setCurrent(toCurrent);
            setPageSize(toPageSize);
            setTotal(t);
        },
        [current, total, pageSize]
    );

    // const changeCurrent = useCallback(
    //     c => {
    //         onChange(c, pageSize, total);
    //     },
    //     [onChange, pageSize, total]
    // );

    // const changePageSize = useCallback(
    //     p => {
    //         onChange(current, p, total);
    //     },
    //     [onChange, current, total]
    // );

    // const changeTotal = total => {
    //     console.log("changetotal : ", total);
    //     // setTotal(total);
    // };

    // const changeTotal = useCallback(
    //     t => {
    //         console.log("changeTotal : ", t);
    //         onChange(current, pageSize, t);
    //     },
    //     [onChange, current, pageSize]
    // );

    return {
        pagination: {
            current,
            pageSize,
            total,
            totalPage,
            onChange
            // changeCurrent,
            // changePageSize
            // changeTotal
        }
    };
};

export default {
    usePagination
};
