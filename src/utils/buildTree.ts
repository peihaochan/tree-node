import { Application, TreeNode } from "../types";

export const buildTree = (applications: Application[]): TreeNode[] => {
  const tree: TreeNode[] = [];

  applications.forEach((app) => {
    let level1 = tree.find((node) => node.name === app.BCAP1);
    if (!level1) {
      level1 = { name: app.BCAP1, children: [] };
      tree.push(level1);
    }

    if (app.BCAP2) {
      let level2 = level1.children?.find((node) => node.name === app.BCAP2);
      if (!level2) {
        level2 = { name: app.BCAP2, children: [] };
        level1.children?.push(level2);
      }

      if (app.BCAP3) {
        let level3 = level2.children?.find((node) => node.name === app.BCAP3);
        if (!level3) {
          level3 = { name: app.BCAP3 };
          level2.children?.push(level3);
        }
      }

      // Sort BCAP3
      level2.children?.sort((a, b) =>
        compareHierarchicalStrings(a.name, b.name)
      );
    }

    // Sort BCAP2
    level1.children?.sort((a, b) => compareHierarchicalStrings(a.name, b.name));
  });

  // Sort BCAP1
  tree.sort((a, b) => compareHierarchicalStrings(a.name, b.name));

  return tree;
};

const extractNumericPart = (str: string): string => {
  const match = str.match(/\d+(\.\d+)*/);
  return match ? match[0] : "";
};

const compareHierarchicalStrings = (a: string, b: string): number => {
  const numA = extractNumericPart(a);
  const numB = extractNumericPart(b);

  const partsA = numA.split(".").map(Number);
  const partsB = numB.split(".").map(Number);

  for (let i = 0; i < Math.max(partsA.length, partsB.length); i++) {
    const partA = partsA[i];
    const partB = partsB[i];

    if (partA < partB) return -1;
    if (partA > partB) return 1;
  }

  return 0;
};
