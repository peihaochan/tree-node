import { useData } from "../hooks/useData";
import { RangeValue, TreeNode } from "../types";

interface Iprops {
  setSliderValue: React.Dispatch<React.SetStateAction<number>>;
  sliderValue: number;
  range: RangeValue;
  setSelectedNode: React.Dispatch<React.SetStateAction<TreeNode | null>>;
  setExpandedNodes: React.Dispatch<React.SetStateAction<Set<string>>>;
}

export default function ClearFilterBtn(props: Iprops) {
  const { clearFilters, range } = useData();

  const onClear = () => {
    clearFilters();
    props.setSelectedNode(null);
    props.setExpandedNodes(new Set());
    if (range.max) props.setSliderValue(range.max);
  };

  return (
    <button className="clearFilterBtn" onClick={() => onClear()}>
      Clear Filters
    </button>
  );
}
