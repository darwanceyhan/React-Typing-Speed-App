import React, { Component } from "react";
import { Context } from "../context/context";

export default class Input extends Component {
  static contextType = Context;
  context!: React.ContextType<typeof Context>;
  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-sm-3">
              <button
                className="btn btn-primary"
                onClick={this.context.GetStringData}
              ></button>
            </div>
            <div className="col-sm-6">
              {this.context.Data &&
                this.context.Data.map((item, index) => {
                  return (
                    <div key={index}>
                      <p>{item}</p>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
