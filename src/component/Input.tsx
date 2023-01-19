import React, { Component } from "react";
import { Context } from "../context/context";

export default class Input extends Component {
  static contextType = Context;
  context!: React.ContextType<typeof Context>;
  componetDidMount() {
    this.context.GetStringData();
  }
  render() {
    return (
      <div>
        <div className="container mt-5">
          <div className="row">
            <div className="col-sm-3">
              <button
                className="btn btn-primary"
                onClick={this.context.GetStringData}
              ></button>
            </div>
            <div className="col-sm-6">
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
                value={this.context.CheckData}
                onChange={this.context.GetStringChecking}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
