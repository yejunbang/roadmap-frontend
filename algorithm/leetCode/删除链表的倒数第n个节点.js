/*
 * @lc app=leetcode.cn id=19 lang=javascript
 *
 * [19] 删除链表的倒数第N个节点
 * 
 * 给定一个链表，删除链表的倒数第 n 个节点，并且返回链表的头结点。
 * 示例：
 * 给定一个链表: 1->2->3->4->5, 和 n = 2.
 * 当删除了倒数第二个节点后，链表变为 1->2->3->5.
 * 说明：
 * 给定的 n 保证是有效的。
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
  let index1 = head
  let index2 = head
  let i = 0;
  while (index1 !== null) {
    if (i >= n) {
      index2 = index2.next
    }
    i++
    index1 = index1.next
  }
  let deleteNode = index2.next
  index2.next = index2.next.next
  deleteNode.next = null;
};

function Node(element) {
  this.element = element
  this.next = null
}

function LinkList() {
  this.head = new Node('head')
  this.insert = function (newElement) {
    let newNode = new Node(newElement)
    let current = this.head
    while (current.next !== null) {
      current = current.next
    }
    current.next = newNode
  }
  this.find = function (value) {
    let currentNode = this.head
    while (currentNode.element !== value) {
      currentNode = currentNode.next
    }
    return currentNode
  }
  this.removeNthFromEnd = removeNthFromEnd
  this.display = function () {
    let current = this.head;
    while (current !== null) {
      console.log('====output====>>>', current.element);
      current = current.next
    }
  }
}

function main() {
  let LLink = new LinkList();
  LLink.insert(1)
  LLink.insert(2)
  LLink.insert(3)
  LLink.insert(4)
  LLink.insert(5)
  LLink.display()
  LLink.removeNthFromEnd(LLink.head, 2)
  LLink.display()
}

main();