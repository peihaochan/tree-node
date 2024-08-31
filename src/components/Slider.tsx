import React, { useEffect } from "react";
import { useData } from "../hooks/useData";
import { RangeValue } from "../types";

interface Iprops {
  setSliderValue: React.Dispatch<React.SetStateAction<number>>;
  sliderValue: number;
  range: RangeValue;
}

export default function Slider(props: Iprops): JSX.Element {
  const { filterSliderValue } = useData(); // Extract necessary data from context
  const minValue = props.range.min || 0;
  const maxValue = props.range.max || 0;

  // Sync slider value with maxValue when it changes (for when the data is first fetched)
  useEffect(() => {
    props.setSliderValue(maxValue);
  }, [maxValue]);

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    props.setSliderValue(value);
    filterSliderValue(value);
  };

  return (
    <div className="sliderContainer">
      <b>Filters</b>
      <input
        className="sliderClass"
        type="range"
        min={minValue}
        max={maxValue}
        value={props.sliderValue}
        onChange={handleSliderChange}
      />
      <div className="sliderNumberWrapper">
        <span>{`$${minValue}`}</span>
        <span>{`$${maxValue}`}</span>
      </div>
      <div className="rangeClass">{`Current Range: $${minValue} to $${props.sliderValue}`}</div>
    </div>
  );
}
