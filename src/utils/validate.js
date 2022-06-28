/**
 * Created by Moyv on 2021/08/09
 */

/**
 * @description: 是否外部链接
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
    return /^(https?:|mailto:|tel:)/.test(path)
}