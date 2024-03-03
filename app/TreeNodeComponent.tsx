// TreeNodeComponent.tsx
'use client';
import { TreeNode } from './TreeNode';
import React from 'react';

interface TreeNodeProps {
  node: TreeNode | null;
  depth: number;
}

const TreeNodeComponent: React.FC<TreeNodeProps> = ({ node, depth }) => {
  const nodeRef = React.useRef<HTMLDivElement>(null);

  // const containerWidthClass = `"w-${(1000 / Math.pow(2, depth))}"`;
  const containerWidthClass = "w-20";

  if (!node) {
    return <div className={containerWidthClass}></div>
  }

  const gapWidthClass = depth > 0 ? `flex justify-center  gap-${Math.max(20 / Math.pow(2, depth), 2)}` : `flex justify-center gap-40`; // need MUCH more intuitive gap spacing
   // Adjust width as needed for your design

  return (
    <div className="flex flex-col items-center relative" ref={nodeRef}>
      <div className="bg-blue-500 text-white p-2 rounded my-2 z-10">{node.value}</div>
      <div className={gapWidthClass}>
        <div className={containerWidthClass}>
          <TreeNodeComponent node={node.left} depth={depth + 1} />
        </div>
        <div className={containerWidthClass}>
          <TreeNodeComponent node={node.right} depth={depth + 1} />
        </div>
      </div>
    </div>
  );
};

export default TreeNodeComponent;
