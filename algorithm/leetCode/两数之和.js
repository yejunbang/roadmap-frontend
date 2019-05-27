/*
 * @lc app=leetcode.cn id=15 lang=javascript
 * 给定一个包含 n 个整数的数组 nums，判断 nums 中是否存在两个元素 a，b，使得 a + b = 0 ？
 * 例如, 给定数组 nums = [-1, 0, 1, 2, -1, -4]，
 * 满足要求的三元组集合为：
 * [
 *   [-1, 1]
 * ]
 * [15] 三数之和
 */
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var twoSum = function (nums) {
  if (!nums || nums.length === 0) {
    return;
  }
  let hash = {}
  let result = []
  for (let i = 0, len = nums.length; i < len; i++) {
    if (hash[0 - nums[i]] !== undefined) {
      result.push([nums[i], 0 - nums[i]])
    } else {
      hash[nums[i]] = nums[i]
    }
  }
  return result;
};
console.log('====output====>>>', twoSum([-1, 0, 1, 2, -1, -4, -2]).toString());