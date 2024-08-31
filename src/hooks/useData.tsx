import React, { useContext, useEffect, useState, ReactNode } from "react";
import { REACT_DATA_URL } from "../constants/envVars";
import { Application, RangeValue, TreeNode } from "../types";
import { buildTree } from "../utils/buildTree";

interface IContext {
  tree: TreeNode[];
  range: RangeValue;
  filteredData: Application[] | [];
  error: string | undefined;
  filterInfoFunc: (value: string | undefined) => void;
}

export function useData(): IContext {
  return useContext(DataContext);
}

export const DataContext = React.createContext<IContext>({} as IContext);

export const DataContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [filteredData, setFilteredData] = useState<Application[]>([]);
  const [tree, setTree] = useState<TreeNode[]>([]);
  const [range, setRange] = useState<RangeValue>({ min: null, max: null });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(REACT_DATA_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        const sideBar = buildTree(result);
        const spendValues = result.map((app: Application) => app.spend);

        const minSpendValue = Math.min(...spendValues);
        const maxSpendValue = Math.max(...spendValues);
        setRange({ min: minSpendValue, max: maxSpendValue });
        setTree(sideBar);
        setFilteredData(result);
      } catch (error) {
        setError("Failed to fetch data");
        console.error("Fetch data error:", error);
      }
    };

    fetchData();
  }, []);

  const filterInfoFunc = (value: string | undefined) => {
    if (value) {
      const filteredItems = filteredData.filter((item) => item.BCAP1 === value);
      setFilteredData(filteredItems);
    } else {
      setFilteredData(filteredData); // Reset to original data if no filter
    }
  };

  return (
    <DataContext.Provider
      value={{
        tree,
        range,
        filteredData,
        error,
        filterInfoFunc,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
