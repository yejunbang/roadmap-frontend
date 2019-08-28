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
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
  if (!strs || strs.length <= 0) {
    return ''
  }
  let i = 0;
  let firstChild = strs[0];
  let longestStr = '';
  let a = firstChild.split('');
  for (let b of a) {
    if (isAllHaveStr(b, strs.slice(1))) {
      longestStr += b
    } else {
      break;
    }
  }
  return longestStr;
};

function isAllHaveStr(b, strs) {
  for (let str of strs) {
    if (str.indexOf(b) < 0) {
      return false;
    }
  }
  return true;
}

// console.log('====output====>>>', longestCommonPrefix(["flower", "flow", "flight"]));
console.log('====output====>>>', longestCommonPrefix(["dog","racecar","car"]));