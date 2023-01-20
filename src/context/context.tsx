import axios from "axios";
import React, { createContext, Component } from "react";
import { SpeedAppInterface } from "./SpeedAppInterface";
export const Context = createContext<SpeedAppInterface>({
  Data: [],
  GetStringData: () => void 0,
  InputData: "",
  GetInputData: () => void 0,
  i: 0,
  DataQuery: [],
  GetStringQuery: () => void 0,
});

export class SpeedAppProvider extends Component<{
  children: React.ReactNode;
}> {
  state = {
    Data: [] as string[],
    InputData: "" as string,
    isIncluded: false,
    i: 0,
    DataQuery: [] as boolean[],
  };
  GetStringData = () => {
    axios
      .get("https://random-word-api.herokuapp.com/word?number=12")
      .then((res) => {
        this.setState({ Data: res.data as string[] });
      })
      .then(() => {
        console.log(this.state.Data);
      });
  };
  async DataContinueReset(): Promise<void> {
    await this.setState({ InputData: "" });
    await this.GetStringData();
    this.setState({ i: 0 });
  }
  GetInputData = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ InputData: e.target.value });
  };
  GetStringQuery = (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(this.state.InputData);

    if (e.key === " ") {
      if (
        this.state.Data[this.state.i] === this.state.InputData.replace(" ", "")
      ) {
        console.log("true");
        this.state.DataQuery.push(true);
        this.setState({ i: this.state.i + 1 });
        this.setState({ InputData: "" });
        console.log(this.state.DataQuery);
        if (this.state.i === 11) {
          this.DataContinueReset();
        }
      } else {
        this.state.DataQuery.push(false);
        this.setState({ i: this.state.i + 1 });
        this.setState({ InputData: "" });
        console.log(this.state.DataQuery);
        if (this.state.i === 11) {
          this.DataContinueReset();
        }
      }
    }
  };

  render(): JSX.Element {
    const { Data, InputData, i, DataQuery } = this.state;
    const { GetStringData, GetInputData, GetStringQuery } = this;

    return (
      <Context.Provider
        value={{
          Data,
          GetStringData,
          InputData,
          GetInputData,
          i,
          DataQuery,
          GetStringQuery,
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}
export default SpeedAppProvider;
