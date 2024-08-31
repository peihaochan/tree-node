// src/services/dataService.ts
export interface Application {
  id: string;
  name: string;
  spend: number;
  BCAP1: string;
  BCAP2: string;
  BCAP3: string;
}

export interface TreeNode {
  name: string;
  children?: TreeNode[];
}

export interface RangeValue {
  min: number | null;
  max: number | null;
}
