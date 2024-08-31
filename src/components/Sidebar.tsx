import { useEffect, useState } from "react";
import { Application, TreeNode } from "../types";
import { useData } from "../hooks/useData";

interface Iprops {
  tree: TreeNode[];
  selectedNode: TreeNode | null;
  setSelectedNode: React.Dispatch<React.SetStateAction<TreeNode | null>>;
  expandedNodes: Set<string>;
  setExpandedNodes: React.Dispatch<React.SetStateAction<Set<string>>>;
}

export default function Sidebar(props: Iprops): JSX.Element {
  const { filterInfoFunc, filterValue } = useData();

  useEffect(() => {
    if (props.selectedNode) {
      filterInfoFunc(
        props.selectedNode.name,
        props.selectedNode.level as keyof Application
      );
    }
  }, [props.selectedNode, filterInfoFunc]);

  const toggleNode = (node: TreeNode) => {
    props.setSelectedNode(node);
    props.setExpandedNodes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(node.name)) {
        newSet.delete(node.name);
      } else {
        newSet.add(node.name);
      }
      return newSet;
    });
  };

  const renderTree = (nodes: TreeNode[]) => (
    <ul>
      {nodes.map((node) => (
        <li key={node.name}>
          <div
            className={`nodeClass ${
              filterValue === node.name ? "onFilter" : ""
            }`}
            onClick={() => toggleNode(node)}
          >
            {node.name}
          </div>
          {node.children && props.expandedNodes.has(node.name) && (
            <div className="">{renderTree(node.children)}</div>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <div className="sideBarContainer">
      <b>Navigation</b>
      <div>{renderTree(props.tree)}</div>
    </div>
  );
}
