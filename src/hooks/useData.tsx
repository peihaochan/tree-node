import React, { useContext, useEffect, useState, ReactNode } from "react";
import { REACT_DATA_URL } from "../constants/envVars";
import { Application, RangeValue, TreeNode } from "../types";
import { buildTree } from "../utils/buildTree";
import { fetchAndParseData, initializeState } from "../utils/dataService";

interface IContext {
  tree: TreeNode[];
  range: RangeValue;
  filteredData: Application[] | [];
  filterValue: string;
  error: string | undefined;
  filterInfoFunc: (value: string, level: keyof Application) => void;
  filterSliderValue: (maxValue: number) => void;
  clearFilters: () => void;
}

export function useData(): IContext {
  return useContext(DataContext);
}

export const DataContext = React.createContext<IContext>({} as IContext);

export const DataContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [originalData, setOriginalData] = useState<Application[]>([]);
  const [filteredData, setFilteredData] = useState<Application[]>([]);
  const [tree, setTree] = useState<TreeNode[]>([]);
  const [range, setRange] = useState<RangeValue>({ min: null, max: null });
  const [filterValue, setFilterValue] = useState<string>("");
  const [filterLevel, setFilterLevel] = useState<keyof Application | null>(
    null
  );
  const [sliderMaxValue, setSliderMaxValue] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchAndParseData(REACT_DATA_URL);
        const { minSpendValue, maxSpendValue } = initializeState(result);
        setRange({ min: minSpendValue, max: maxSpendValue });
        setTree(buildTree(result));
        setOriginalData(result);
        setFilteredData(result);
      } catch (err) {
        setError("Failed to fetch data");
        console.error("Fetch data error:", err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filterValue, filterLevel, sliderMaxValue]);

  const applyFilters = () => {
    let filteredItems = originalData;
    if (filterValue && filterLevel) {
      filteredItems = filteredItems.filter((item) =>
        item[filterLevel]
          .toString()
          .toLowerCase()
          .includes(filterValue.toLowerCase())
      );
    }

    if (sliderMaxValue !== null) {
      const minValue = range.min ?? 0;
      filteredItems = filteredItems.filter(
        (item) => item.spend >= minValue && item.spend <= sliderMaxValue
      );
    }

    setFilteredData(filteredItems);
  };

  const filterInfoFunc = (value: string, level: keyof Application) => {
    setFilterValue(value);
    setFilterLevel(level);
  };

  const filterSliderValue = (maxValue: number) => {
    setSliderMaxValue(maxValue);
  };

  const clearFilters = () => {
    setFilterValue("");
    setFilterLevel(null);
    setSliderMaxValue(null);
    setFilteredData(originalData);
  };

  return (
    <DataContext.Provider
      value={{
        tree,
        filterValue,
        range,
        filteredData,
        error,
        filterInfoFunc,
        filterSliderValue,
        clearFilters,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
