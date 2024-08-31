import React from "react";
import Sidebar from "./components/Sidebar";
import { useData } from "./hooks/useData";
import ApplicationWrapper from "./components/ApplicationWrapper";
import "./App.css";
import Slider from "./components/Slider";

const App: React.FC = () => {
  const { tree, filteredData, range } = useData();

  return (
    <div className="appContainer">
      <div className="leftPanel">
        {tree && <Sidebar tree={tree} />}
        {range.min && range.max && <Slider sliderRange={range} />}
      </div>
      <div className="applicationContainer">
        {filteredData.map((item) => (
          <ApplicationWrapper dataObj={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default App;
