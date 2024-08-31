import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import { useData } from "./hooks/useData";
import ApplicationWrapper from "./components/ApplicationWrapper";
import "./App.css";

const App: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const { tree, filteredData } = useData();

  const handleSelectNode = (node: any) => {
    setSelectedNode(node.name);
  };

  console.log("selectedNode", selectedNode);

  return (
    <div className="appContainer">
      {tree && <Sidebar onSelectNode={handleSelectNode} tree={tree} />}
      <div>
        {filteredData.map((item) => (
          <ApplicationWrapper dataObj={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default App;
