import axios from "axios";
import React, { createContext } from "react";

export const Context = createContext({
  Data: [],
  GetStringData: () => {},
});

export class SpeedAppContext extends React.Component<{
  childern: React.ReactNode;
}> {
  state = {
    Data: Array<string>,
    GetStringData: () => {},
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

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}
export default SpeedAppContext;
