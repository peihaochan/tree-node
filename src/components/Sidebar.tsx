// src/components/Sidebar.tsx
import React, { useEffect, useState } from "react";
import { buildTree } from "../utils/buildTree";
import { fetchData } from "../hooks";

interface TreeNode {
  name: string;
  children?: TreeNode[];
}

interface SidebarProps {
  onSelectNode: (node: TreeNode) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onSelectNode }) => {
  const [tree, setTree] = useState<TreeNode[]>([]);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchData().then((data) => {
      const treeData = buildTree(data);
      setTree(treeData);
    });
  }, []);

  const toggleNode = (name: string) => {
    setExpandedNodes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(name)) {
        newSet.delete(name);
      } else {
        newSet.add(name);
      }
      return newSet;
    });
  };

  const renderTree = (nodes: TreeNode[]) => (
    <ul>
      {nodes.map((node) => (
        <li key={node.name}>
          <div onClick={() => toggleNode(node.name)}>{node.name}</div>
          {node.children && expandedNodes.has(node.name) && (
            <div style={{ marginLeft: 20 }}>{renderTree(node.children)}</div>
          )}
        </li>
      ))}
    </ul>
  );

  return <div>{renderTree(tree)}</div>;
};

export default Sidebar;
