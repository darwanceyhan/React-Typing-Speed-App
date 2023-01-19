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
});

export class SpeedAppProvider extends Component<{
  children: React.ReactNode;
}> {
  state = {
    Data: [] as string[],
    InputData: "" as string,
    isIncluded: false,
    i: 0,
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
  GetStringChecking = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ InputData: e.target.value });
    if (this.state.Data[this.state.i].includes(this.state.InputData)) {
      this.setState({ isIncluded: true });
      if (e.target.value === this.state.Data[this.state.i]) {
        this.setState({ i: this.state.i + 1 });
        this.setState({ InputData: "" });
        console.log("doğru");
      }
    } else {
      this.setState({ isIncluded: false });
    }
  };

  render(): JSX.Element {
    const { Data, InputData, i } = this.state;
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
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}
export default SpeedAppProvider;
