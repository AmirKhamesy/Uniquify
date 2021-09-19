import React from 'react'
import styled from "styled-components";
const media = {
    mobile: '@media (max-width: 768px)'
}

const StyledHeaderText = styled.h1`
margin: 1.5rem;
font-size: 5vh;
color: #a0d195;
font-weight: 700;
${media.mobile} {
    font-size: 4vh;
}
`
export const Header = () => {
    return (
        <>
            <StyledHeaderText>Uniquify</StyledHeaderText>
        </>
    )
}

