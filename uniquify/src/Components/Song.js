import React from "react";
import styled from "styled-components";
const media = {
    mobile: '@media (max-width: 768px)'
}

const StyledSmallLabel = styled.p`
/* border: 2px solid red; */
margin: 0;
padding:0 0 0 2vw;
color: #1a1a1a;
font-weight: 300;
font-size: 0.866vmax;
${media.mobile} {
    font-size: 1.66vmax;
}
`

export default function Songs(props) {


    return (
        <li id={props.name} style={{ fontWeight: props.repeated ? 500 : 700 }}>
            {props.name.split('\n\n')[0]}<br></br>
            <StyledSmallLabel>{props.name.split('\n\n')[1]}</StyledSmallLabel>
        </li>
    )
}