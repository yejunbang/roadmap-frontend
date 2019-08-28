/*
 * @lc app=leetcode.cn id=5 lang=javascript
 * 给定一个字符串 s，找到 s 中最长的回文子串。
 * 你可以假设 s 的最大长度为 1000。
 * 输入: "babad"
 * 输出: "bab"
 * 注意: "aba" 也是一个有效答案。
 * [5] 最长回文子串
 */
/**
 * 暴力
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
  if (!s || s.length > 1000) {
    return
  }
  let longestStr = ''
  for (let i = 0; i < s.length; i++) {
    for (let j = i + 1; j < s.length; j++) {
      let s1 = s.slice(i, j);
      if (isResverse(s1) && s1.length > longestStr.length) {
        longestStr = s1;
      }
    }
  }
  return longestStr;
};

function isResverse(str) {
  let re = str.split('').reverse().join('')
  return re === str
}

console.log('====output====>>>', longestPalindrome('babad'));
console.log('====output====>>>', longestPalindrome('cbbd'));