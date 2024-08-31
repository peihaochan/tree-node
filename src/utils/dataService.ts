import { Application } from "../types";

export const fetchAndParseData = async (
  url: string
): Promise<Application[]> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
};

export const initializeState = (data: Application[]) => {
  const spendValues = data.map((app) => app.spend);
  const minSpendValue = Math.min(...spendValues);
  const maxSpendValue = Math.max(...spendValues);
  return { minSpendValue, maxSpendValue };
};
