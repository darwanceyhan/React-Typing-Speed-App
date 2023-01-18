import axios from "axios";
import React, { createContext } from "react";

export interface SpeedAppInterface {
  Data: Array<string>;
  GetStringData: () => void;
}
export const Context = createContext<SpeedAppInterface>({
  Data: [],
  GetStringData: () => {},
});

export class SpeedAppContext extends React.Component<{
  children: React.ReactNode;
}> {
  state = {
    Data: Array<string>,
  };
  GetStringData() {
    axios
      .get("https://random-word-api.herokuapp.com/word?number=12")
      .then((res) => {
        this.setState({ Data: res.data });
      })
      .then(() => {
        console.log(this.state.Data);
      });
  }

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
export default SpeedAppContext;
