import React, { Component } from "react";


export default class Song extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <li id={this.props.name} style={{ fontWeight: this.props.repeated ? 500 : 800, margin: "1%" }}>{this.props.name}</li>
        )
    }
}