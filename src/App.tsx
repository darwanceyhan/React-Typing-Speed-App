import React from "react";
import Input from "./component/Input";
import { SpeedAppProvider } from "./context/context";
export class App extends React.Component {
  render() {
    return (
      <div>
        <SpeedAppProvider>
          <Input />
        </SpeedAppProvider>
      </div>
    );
  }
}
