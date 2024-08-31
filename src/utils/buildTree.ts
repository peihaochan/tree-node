import { Application } from "../types";

// src/utils/buildTree.ts
interface TreeNode {
  name: string;
  children?: TreeNode[];
}

export const buildTree = (applications: Application[]): TreeNode[] => {
  const tree: TreeNode[] = [];

  applications.forEach((app) => {
    console.log("app", app);
    let level1 = tree.find((node) => node.name === app.BCAP1);
    if (!level1) {
      level1 = { name: app.BCAP1, children: [] };
      tree.push(level1);
    }

    let level2 = level1.children?.find((node) => node.name === app.BCAP2);
    if (!level2) {
      level2 = { name: app.BCAP2, children: [] };
      level1.children?.push(level2);
    }

    let level3 = level2.children?.find((node) => node.name === app.BCAP3);
    if (!level3) {
      level3 = { name: app.BCAP3 };
      level2.children?.push(level3);
    }
  });

  return tree;
};
