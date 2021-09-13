import React from "react";


export default function Songs(props) {


    return (
        <li id={props.name} style={{ fontWeight: props.repeated ? 500 : 800, margin: "1%" }}>
            {props.name.split('\n\n')[0]}<br></br>
            <p>{props.name.split('\n\n')[1]}</p>
        </li>
    )
}