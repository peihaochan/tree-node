// src/components/Sidebar.tsx
import { useState } from "react";

interface TreeNode {
  name: string;
  children?: TreeNode[];
}

interface Iprops {
  onSelectNode: (node: TreeNode) => void;
  tree: TreeNode[];
}

export default function Sidebar(props: Iprops): JSX.Element {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());

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

  return <div className="sideBarContainer">{renderTree(props.tree)}</div>;
}
