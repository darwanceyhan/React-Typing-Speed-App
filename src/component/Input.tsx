import React, { Component } from "react";
import { Context } from "../context/context";

export default class Input extends Component {
  static contextType = Context;
  context!: React.ContextType<typeof Context>;
  componentDidMount(): void {
    this.context.GetStringData();
  }
  setStringStyle = (index: number): string => {
    if (this.context.DataQuery[index - 1]) {
      return "text-success text-decoration-line-through";
    } else if (this.context.DataQuery[index - 1] === false) {
      return "text-danger text-decoration-line-through";
    } else {
      return "text-primary";
    }
  };

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
                      <h5
                        key={index}
                        className={`${this.setStringStyle(index)}
                        ${
                          this.context.i - 1 === index - 1
                            ? "text-decoration-underline"
                            : ""
                        }`}
                      >
                        {item}
                      </h5>
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
