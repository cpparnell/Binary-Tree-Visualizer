'use client';
import React from 'react';
import TreeNodeComponent from './TreeNodeComponent';
import { createTree } from './TreeNode';

const IndexPage: React.FC = () => {
  const tree = createTree([1, 2, 2, 3, null, 4, 5, 6, 8, 9, null]);

  return (
    <main>
      <div className="flex justify-center items-center h-screen">
        <TreeNodeComponent node={tree} depth={0}/>
      </div>
    </main>
  );
};

export default IndexPage;
