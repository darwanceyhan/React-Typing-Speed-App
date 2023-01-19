import React, { Component } from "react";
import { Context } from "../context/context";

export default class Input extends Component {
  static contextType = Context;
  context!: React.ContextType<typeof Context>;
  componentDidMount(): void {
    if (this.context.i === 0 || this.context.i === 12) {
      this.context.GetStringData();
    }
  }

  render(): JSX.Element {
    return (
      <div>
        <div className="container mt-5">
          <div className="row">
            <div className="col-sm-6 mx-auto" style={{ userSelect: "none" }}>
              {this.context.Data &&
                this.context.Data.map((item) => {
                  return <>{item + " "}</>;
                })}
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6 mx-auto mt-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter String"
                value={this.context.InputData}
                onChange={this.context.GetStringChecking}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
