/**
 * 加密 (原生BASE64)
 * @param targetStr
 * @returns {string}
 */
export function encrypt(targetStr){
    return window.btoa(window.encodeURIComponent(targetStr));
}

/**
 * 解密 (原生BASE64)
 * @param targetStr
 * @returns {string}
 */
export function decrypt(targetStr){
    return window.decodeURIComponent(window.atob(targetStr));
}