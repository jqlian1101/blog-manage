export const searchParse = (search = "") => {
    const resultObj = {};
    if (search && search.length > 1) {
        search = search.substring(1);
        let items = search.split("&");
        for (let index = 0; index < items.length; index++) {
            if (!items[index]) {
                continue;
            }
            let kv = items[index].split("=");
            resultObj[kv[0]] = typeof kv[1] === "undefined" ? "" : kv[1];
        }
    }
    return resultObj;
};

export const isNil = x => x === null || x === undefined;

export default {
    searchParse,
    isNil
};
