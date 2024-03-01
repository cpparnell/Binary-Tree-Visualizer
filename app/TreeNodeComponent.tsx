// TreeNodeComponent.tsx
'use client';
import React, { useEffect, useState } from 'react';
import { TreeNode } from './TreeNode';

interface TreeNodeProps {
  node: TreeNode | null;
  depth: number;
  parentOffset?: { x: number; y: number }; // Optional prop to track parent node's position
}

const TreeNodeComponent: React.FC<TreeNodeProps> = ({ node, depth, parentOffset }) => {
  const [nodeOffset, setNodeOffset] = useState({ x: 0, y: 0 });
  const nodeRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (nodeRef.current) {
      const rect = nodeRef.current.getBoundingClientRect();
      // Calculate center of the node for line drawing
      const offsetX = rect.left + rect.width / 2;
      const offsetY = rect.top;
      setNodeOffset({ x: offsetX, y: offsetY });
    }
  }, [nodeRef]);

  if (!node) {
    return <div className="w-20 h-0"></div>; // Invisible placeholder for null nodes
  }

  const containerWidthClass = "w-20"; // Adjust width as needed for your design

  // Adjust these values based on your layout and spacing
  const childYOffset = 100; // Vertical distance from parent to child
  const childXOffset = depth * 20; // Horizontal distance change based on depth

  return (
    <div className="flex flex-col items-center relative" ref={nodeRef}>
      {/* SVG for drawing lines to children */}
      {parentOffset && (
        <svg
          style={{ position: 'absolute', top: 0, left: -parentOffset.x, width: '100%', height: '100%' }}
          className="pointer-events-none z-0"
        >
          <line
            x1={parentOffset.x}
            y1={parentOffset.y}
            x2={nodeOffset.x}
            y2={nodeOffset.y - childYOffset / 2} // Adjust based on your actual node/connector sizes
            stroke="black"
          />
        </svg>
      )}
      <div className="bg-blue-500 text-white p-2 rounded mb-2 z-10">{node.value}</div>
      <div className="flex justify-center gap-4">
        <div className={containerWidthClass}>
          <TreeNodeComponent node={node.left} depth={depth + 1} parentOffset={nodeOffset} />
        </div>
        <div className={containerWidthClass}>
          <TreeNodeComponent node={node.right} depth={depth + 1} parentOffset={nodeOffset} />
        </div>
      </div>
    </div>
  );
};

export default TreeNodeComponent;
