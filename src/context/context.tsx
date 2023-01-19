import axios from "axios";
import React, { createContext } from "react";
import { SpeedAppInterface } from "./SpeedAppInterface";
import { Component } from "react";
export const Context = createContext<SpeedAppInterface>({
  Data: [],
  GetStringData: () => void 0,
});

export class SpeedAppProvider extends Component<{
  children: React.ReactNode;
}> {
  state = {
    Data: [],
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

  render(): JSX.Element {
    const { Data } = this.state;
    const { GetStringData } = this;

    return (
      <Context.Provider
        value={{
          Data,
          GetStringData,
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}
export default SpeedAppProvider;
