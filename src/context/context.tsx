import axios from "axios";
import React, { createContext, Component } from "react";
import { SpeedAppInterface } from "./SpeedAppInterface";
export const Context = createContext<SpeedAppInterface>({
  Data: [],
  GetStringData: () => void 0,
  InputData: "",
  GetInputData: () => void 0,
  i: 1,
  key: 0,
  DataQuery: [],
  GetStringQuery: () => void 0,
  time: 60,
  DataContinueReset: () => Promise.resolve(),
  SavedData: [],
  ResetAllData: () => void 0,
});

export class SpeedAppProvider extends Component<{
  children: React.ReactNode;
}> {
  state = {
    Data: [] as string[],
    SavedData: [] as boolean[],
    InputData: "" as string,
    i: 1,
    key: 0,
    DataQuery: [] as boolean[],
    time: 60,
  };
  ResetAllData = () => {
    this.setState({ Data: [] });
    this.setState({ SavedData: [] });
    this.setState({ InputData: "" });
    this.setState({ i: 1 });
    this.setState({ key: 0 });
    this.setState({ DataQuery: [] });
    this.setState({ time: 60 });
  };
  async TrueInput(): Promise<void> {
    await this.state.DataQuery.push(true);
    await this.state.SavedData.push(true);
    await this.setState({ i: this.state.i + 1 });
    await this.setState({ InputData: "" });
  }
  async FalseIput(): Promise<void> {
    await this.state.DataQuery.push(false);
    await this.state.SavedData.push(false);
    await this.setState({ i: this.state.i + 1 });
    await this.setState({ InputData: "" });
  }
  GetStringData = () => {
    axios
      .get("https://random-word-api.herokuapp.com/word?number=12&lang=en")
      .then((res) => {
        this.setState({ Data: res.data });
      });
  };

  async DataContinueReset(): Promise<void> {
    await this.setState({ DataQuery: [] });
    await this.setState({ InputData: "" });
    await this.GetStringData();
    await this.setState({ i: 1 });
  }
  GetInputData = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ InputData: e.target.value });
  };
  GetStringQuery = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Spacebar") {
      if (
        this.state.Data[this.state.i - 1] ===
        this.state.InputData.replace(" ", "")
      ) {
        this.TrueInput();

        if (this.state.i % 12 === 0) {
          this.DataContinueReset();
        }
      } else {
        this.FalseIput();
        if (this.state.i % 12 === 0) {
          this.DataContinueReset();
        }
      }
    }
  };

  render(): JSX.Element {
    const { Data, InputData, i, DataQuery, key, time, SavedData } = this.state;
    const { GetStringData, GetInputData, GetStringQuery, ResetAllData } = this;

    return (
      <Context.Provider
        value={{
          Data,
          GetStringData,
          InputData,
          GetInputData,
          i,
          key,
          DataQuery,
          GetStringQuery,
          time,
          DataContinueReset: this.DataContinueReset,
          SavedData,
          ResetAllData,
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}
export default SpeedAppProvider;
