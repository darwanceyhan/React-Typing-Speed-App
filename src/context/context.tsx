import axios from "axios";
import React, { createContext, Component } from "react";
import { SpeedAppInterface } from "./SpeedAppInterface";
export const Context = createContext<SpeedAppInterface>({
  Data: [],
  GetStringData: () => void 0,
  CheckData: "",
  GetStringChecking: () => void 0,
});

export class SpeedAppProvider extends Component<{
  children: React.ReactNode;
}> {
  state = {
    Data: [],
    CheckData: "",
  };
  GetStringData = () => {
    void axios
      .get("https://random-word-api.herokuapp.com/word?number=12")
      .then((res) => {
        this.setState({ Data: res.data as string[] });
      })
      .then(() => {
        console.log(this.state.Data);
      });
  };
  GetStringChecking = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ CheckData: e.target.value });
    console.log(this.state.CheckData);
  };

  render(): JSX.Element {
    const { Data, CheckData } = this.state;
    const { GetStringData, GetStringChecking } = this;

    return (
      <Context.Provider
        value={{
          Data,
          GetStringData,
          CheckData,
          GetStringChecking,
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}
export default SpeedAppProvider;
