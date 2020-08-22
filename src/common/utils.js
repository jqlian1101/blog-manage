import { TOKEN_LOCATIONSTORAGE } from 'src/common/constant'

export const getUserToken = () => window.localStorage.getItem(TOKEN_LOCATIONSTORAGE);

export const isLogin = () => !!getUserToken();

export const clearUserToken = () => window.localStorage.removeItem(TOKEN_LOCATIONSTORAGE);
