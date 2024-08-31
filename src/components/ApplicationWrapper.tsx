import { Application } from "../types";
import "../App.css";

interface Iprops {
  dataObj: Application;
}

export default function ApplicationWrapper(props: Iprops): JSX.Element {
  return (
    <div className="applicationWrapper">
      <b>{props.dataObj.name}</b>
      <div>{`Total spend: $${props.dataObj.spend}`}</div>
    </div>
  );
}
