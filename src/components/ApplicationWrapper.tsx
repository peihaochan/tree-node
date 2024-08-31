import { Application } from "../types";
import "../App.css";

interface Iprops {
  dataObj: Application;
}

export default function ApplicationWrapper(props: Iprops): JSX.Element {
  return (
    <div className="applicationWrapper">
      <div>{props.dataObj.name}</div>
      <div>{`Total Spend: $${props.dataObj.spend}`}</div>
    </div>
  );
}
