import React, { Component } from "react";

export default class Song extends Component {
    constructor() {
        super();
    }


    render() {
        return (
            <li id={this.props.name} style={{ fontWeight: this.props.repeated ? 500 : 800 }}>{this.props.name}</li>
        )
    }
}