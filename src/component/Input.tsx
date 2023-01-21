import React, { Component } from "react";
import { Context } from "../context/context";

export default class Input extends Component {
  static contextType = Context;
  context!: React.ContextType<typeof Context>;
  interval!: NodeJS.Timer;
  state = {
    time: 60,
    timeWork: false,
  };

  setTime = () => {
    this.interval = setInterval(() => {
      this.setState({ time: this.state.time - 1 });
      if (this.state.time <= 0) {
        clearInterval(this.interval);
        this.context.DataContinueReset();
        this.setState({ time: 0 });
      }
    }, 1000);
  };

  componentDidMount(): void {
    this.context.GetStringData();
  }

  setStringStyle = (index: number): string => {
    if (this.context.DataQuery[index - 1]) {
      return "text-success text-decoration-line-through";
    } else if (this.context.DataQuery[index - 1] === false) {
      return "text-danger text-decoration-line-through";
    } else {
      return "text-dark ";
    }
  };

  render(): JSX.Element {
    return (
      <div>
        <div className="container mt-5">
          <div className="row">
            <div
              className="col-sm-6 mx-auto"
              style={{
                fontSize: "26px",
                userSelect: "none",
                backgroundColor: "#f8c291",
                borderRadius: "10px",
              }}
            >
              <pre>
                {this.state.time >= 0 &&
                  this.context.Data.map((item, index) => {
                    return (
                      index++,
                      (
                        <b
                          key={index}
                          className={`${this.setStringStyle(index)}
                        ${
                          this.context.i - 1 === index - 1
                            ? "text-decoration-underline"
                            : ""
                        }`}
                        >
                          {item}
                          {index % 3 === 0 ? <br /> : " "}
                        </b>
                      )
                    );
                  })}
              </pre>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6 mx-auto mt-3">
              <div className="input-group mt-3">
                <input
                  type="text"
                  className="form-control text-center text-dark"
                  placeholder="Enter String"
                  value={this.context.InputData}
                  onKeyUp={this.context.GetStringQuery}
                  onChange={this.context.GetInputData}
                  onKeyDown={() => {
                    if (this.state.time === 60 && !this.state.timeWork) {
                      this.setTime();
                      this.setState({ timeWork: true });
                    }
                  }}
                />
                <span className="input-group-text">{this.state.time}</span>
                <button
                  className="input-group-text"
                  style={{ backgroundColor: "GrayText" }}
                  onClick={() => {
                    this.context.ResetAllData();
                    this.setState({ time: 60 });
                    clearInterval(this.interval);
                    this.setState({ timeWork: false });
                    this.context.GetStringData();
                  }}
                >
                  <img
                    src="https://img.icons8.com/ios/50/000000/refresh.png"
                    alt="refresh"
                    width="20px"
                  />
                </button>
              </div>
            </div>
          </div>

          {this.state.time <= 0 && (
            <div className="row">
              <div className="col-sm-6 mx-auto mt-3">
                <div className="card">
                  <div className="card-body w-25">
                    <h5 className="card-title">Result</h5>
                    <p className="card-text">
                      True :{" "}
                      {
                        this.context.SavedData.filter((item) => item === true)
                          .length
                      }
                      <br />
                      False :{" "}
                      {
                        this.context.SavedData.filter((item) => item === false)
                          .length
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
