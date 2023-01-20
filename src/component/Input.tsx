import React, { Component } from "react";
import { Context } from "../context/context";

export default class Input extends Component {
  static contextType = Context;
  context!: React.ContextType<typeof Context>;
  componentDidMount(): void {
    this.context.GetStringData();
  }

  render(): JSX.Element {
    return (
      <div>
        <div className="container mt-5">
          <div className="row">
            <div className="col-sm-6 mx-auto d-inline-block">
              {this.context.Data &&
                this.context.Data.map((item, index) => {
                  return (
                    index++,
                    (
                      <p
                        key={index}
                        className={`${
                          this.context.DataQuery[index - 1]
                            ? "text-success"
                            : "text-danger"
                        }`}
                      >
                        {item}
                      </p>
                    )
                  );
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
                onKeyUp={this.context.GetStringQuery}
                onChange={this.context.GetInputData}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
