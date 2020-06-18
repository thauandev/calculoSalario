import React, { Component } from "react";

export default class Input extends Component {
  render() {
    const { value, id, label } = this.props;

    return (
      <>
        <label for={id}>{label}</label>
        <input id={id} value={value}></input>
      </>
    );
  }
}
