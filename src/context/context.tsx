import axios from "axios";
import React, { createContext, Component } from "react";
import { SpeedAppInterface } from "./SpeedAppInterface";
export const Context = createContext<SpeedAppInterface>({
  Data: [],
  GetStringData: () => void 0,
  InputData: "",
  GetStringChecking: () => void 0,
  isİncluded: false,
  i: 0,
  DataQuery: [],
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
    await this.setState({ InputData: [] });
    await this.GetStringData();
    this.setState({ i: 0 });
  }
  GetStringChecking = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ InputData: e.target.value });

    if (this.state.InputData.includes(" ")) {
      if (
        this.state.Data[this.state.i].includes(
          this.state.InputData.replace(" ", "")
        )
      ) {
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
    const { GetStringData, GetStringChecking } = this;

    return (
      <Context.Provider
        value={{
          Data,
          GetStringData,
          InputData,
          GetStringChecking,
          isİncluded: this.state.isIncluded,
          i,
          DataQuery,
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}
export default SpeedAppProvider;
