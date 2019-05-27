/*
 * @lc app=leetcode.cn id=15 lang=javascript
 * 给定一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？找出所有满足条件且不重复的三元组。
 * 注意：答案中不可以包含重复的三元组。
 * 例如, 给定数组 nums = [-1, 0, 1, 2, -1, -4]，
 * 满足要求的三元组集合为：
 * [
 *   [-1, 0, 1],
 *   [-1, -1, 2]
 * ]
 * [15] 三数之和
 */
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  if (!nums || nums.length === 0) {
    return;
  }
  let result = []
  let hash = {}
  let len = nums.length
  for (let i = 0; i < len - 2; i++) {
    for (let j = i + 1; j < len - 1; j++) {
      if (hash[nums[j]] !== undefined) {
        result.push(hash[nums[j]].concat(nums[j]))
        hash[nums[j]] = undefined;
      } else {
        let mark = 0 - nums[i] - nums[j]
        hash[mark] = [nums[i], nums[j]]
      }
    }
  }
  return result;
};
console.log('====output====>>>', threeSum([-1, 0, 1, 2, -1, -4]).toString());