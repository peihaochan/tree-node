import React, { useState } from "react";
import Sidebar from "./components/Sidebar";

const App: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const handleSelectNode = (node: any) => {
    setSelectedNode(node.name);
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar onSelectNode={handleSelectNode} />
      <div style={{ marginLeft: 20 }}>
        {selectedNode ? (
          <h2>Selected: {selectedNode}</h2>
        ) : (
          <h2>Select a business capability</h2>
        )}
        {/* Here you would render the filtered list based on the selected node and slider */}
      </div>
    </div>
  );
};

export default App;
