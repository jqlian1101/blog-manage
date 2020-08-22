export const fetchCfg = {
    baseUrl: "http://localhost:3010"
};

export const getUrl = (url, hostKey = "baseUrl") => {
    return `${fetchCfg[hostKey]}${url}`;
};

export default {
    ...fetchCfg,
    getUrl
};
