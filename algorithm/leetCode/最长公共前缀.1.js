/*
 * @lc app=leetcode.cn id=14 lang=javascript
 *
 * [14] 最长公共前缀
 * 输入: ["flower","flow","flight"]
 * 输出: "fl"
 * 输入: ["dog","racecar","car"]
 * 输出: ""
 * 解释: 输入不存在公共前缀。
 */
/**
 * 考察indexOf的用法，'flower.indexOf(ow) === 2'
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
  if (!Array.isArray(strs)) {
    return ''
  }
  let prefix = strs[0]
  for (let i = 1, len = strs.length; i < len; i++) {
    while (strs[i].indexOf(prefix) != 0) {
      prefix = prefix.slice(0, -1)
    }
  }
  return prefix
};

console.log('====output====>>>', longestCommonPrefix(["flower", "flow", "flight"]));
console.log('====output====>>>', longestCommonPrefix(["dog", "racecar", "car"]));