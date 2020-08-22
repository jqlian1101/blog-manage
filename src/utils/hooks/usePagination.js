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

    return {
        pagination: {
            current,
            pageSize,
            total,
            totalPage,
            onChange
        }
    };
};

export default {
    usePagination
};
