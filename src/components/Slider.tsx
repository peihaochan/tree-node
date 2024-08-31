import React, { useState } from "react";
import { RangeValue } from "../types";

interface Iprops {
  sliderRange: RangeValue;
}

export default function Slider(props: Iprops): JSX.Element {
  const [sliderValue, setSliderValue] = useState<number>(50);

  const minValue = props.sliderRange.min;
  const maxValue = props.sliderRange.max;

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSliderValue(Number(event.target.value));
  };

  return (
    <div className="sliderContainer">
      <input
        type="range"
        min={minValue || 0}
        max={maxValue || 0}
        value={sliderValue}
        onChange={handleSliderChange}
      />
      <div className="sliderNumberWrapper">
        <span>{`$${minValue}`}</span>
        <span>{`$${maxValue}`}</span>
      </div>
    </div>
  );
}
