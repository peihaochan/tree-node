import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import { useData } from "./hooks/useData";
import ApplicationWrapper from "./components/ApplicationWrapper";
import "./App.css";
import Slider from "./components/Slider";
import ClearFilterBtn from "./components/ClearFilterBtn";
import { TreeNode } from "./types";

const App: React.FC = () => {
  const { tree, filteredData, range } = useData();
  const [sliderValue, setSliderValue] = useState<number>(range.max || 0);
  const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  return (
    <div className="appContainer">
      <div className="leftPanel">
        {tree && (
          <Sidebar
            tree={tree}
            selectedNode={selectedNode}
            setSelectedNode={setSelectedNode}
            expandedNodes={expandedNodes}
            setExpandedNodes={setExpandedNodes}
          />
        )}
        <div className="filterClass">
          <Slider
            sliderValue={sliderValue}
            setSliderValue={setSliderValue}
            range={range}
          />
          <ClearFilterBtn
            range={range}
            sliderValue={sliderValue}
            setSliderValue={setSliderValue}
            setSelectedNode={setSelectedNode}
            setExpandedNodes={setExpandedNodes}
          />
        </div>
      </div>
      {filteredData.length === 0 && (
        <div className="noAppClass">
          <span> No Applications with existing filters</span>
        </div>
      )}

      <div className="applicationContainer">
        {filteredData.map((item) => (
          <ApplicationWrapper dataObj={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default App;
