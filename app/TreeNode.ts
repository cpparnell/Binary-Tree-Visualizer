
export interface TreeNode {
  value: number | null;
  left: TreeNode | null;
  right: TreeNode | null;
}

export const createTree = (values: (number | null)[]): TreeNode | null => {
  if (values.length === 0) return null;

  const root: TreeNode = { value: values[0], left: null, right: null };
  const queue: (TreeNode | null)[] = [root];

  let i = 1;
  while (i < values.length) {
    const current = queue.shift();

    if (current !== null) {
      const leftValue = values[i];
      const rightValue = values[i + 1];

      if (leftValue !== null) {
        const leftNode: TreeNode = { value: leftValue, left: null, right: null };
        (current as TreeNode).left = leftNode;
        queue.push(leftNode);
      } else {
        queue.push(null);
      }

      if (rightValue !== null) {
        const rightNode: TreeNode = { value: rightValue, left: null, right: null };
        (current as TreeNode).right = rightNode;
        queue.push(rightNode);
      } else {
        queue.push(null);
      }

      i += 2;
    }
  }

  return root;
};