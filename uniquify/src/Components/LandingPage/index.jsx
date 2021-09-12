import React from 'react'
import styled from "styled-components";
import Typewriter from 'typewriter-effect';

const StyledHomePage = styled.div`
background-color: white;
width: 100%;
position: absolute;
`
const SytledImage = styled.img`
max-width: 60%;
border: 2px solid red;
`

const StyledButton = styled.button`
/* transition: all .25s; 
background-color: #a0d195;
color: white;
padding: 1rem;
border-style: none;
border-radius: 1.125rem;
box-shadow: 0 0.5rem 0.5rem rgb(0 0 0 / 40%);
width: 10rem; */
    border-radius: 20px;
    width: 15vmax;
    height: 4vmax;
    background-color: #a0d195;
    box-shadow: 0 20px 20px rgb(0 0 0 / 40%);
    color: #fff;
    border: none;   
    outline: none;
    font-size: 1.6vmax;
    transition: .3s;
    margin-top: 2vh;
    &:hover{
        width: 20vmax;
    }
`
const StyledHeaderText = styled.h1`
margin: 1.5rem;
font-size: 5vh;
color: #a0d195;
font-weight: 700;
@media (max-width: 768px) {
    font-size: 4vh;
}
`
const DetailsContainer = styled.div`
display: grid;
justify-content: center;
text-align:center;
padding-bottom: 5vh;
`
const StyledDetailh2 = styled.h2`
margin: 1rem 0;
color: #a0d195;
/* color: #1a1a1a; */
font-weight: 600;
font-size: 4.5vmin;
@media (max-width: 768px) {
    margin: 1rem;
    font-size: 5vmin;
}
`
const StyledDetailText = styled.p`
margin: 1rem 0;
color: #1a1a1a;
font-weight: 300;
font-size: 1.5vmax;
@media (max-width: 768px) {
    margin: 1rem;
    font-size: 1.33vmax;
}
`

const StyledImageTextContainer = styled.div`
border: 2px solid red;
display: flex;
justify-content: space-evenly;
`
const TextComboContainer = styled.div`
border: 2px solid red;

`
const TextComboHeader = styled.h2`

`
const TextComboDetails = styled.p`

`


export const LandingPage = () => {
    return (
        <StyledHomePage>
            <StyledHeaderText>Uniquify</StyledHeaderText>
            <DetailsContainer>

                <StyledDetailh2>
                    <Typewriter
                        onInit={(typewriter) => {
                            typewriter
                                .typeString('Find Similar songs...')
                                .pauseFor(500)
                                .deleteAll()
                                .typeString('Find Unique songs...')
                                .pauseFor(500)
                                .deleteAll()
                                .typeString('Find the Perfect playlist.')
                                .start();
                        }}
                    />
                </StyledDetailh2>
                <StyledDetailText>Comparing has never been easier.</StyledDetailText>
                <div>
                    <StyledButton>Start Comparing</StyledButton>
                </div>
            </DetailsContainer>
            <StyledImageTextContainer>
                <TextComboContainer>
                    <TextComboHeader>Help your friends</TextComboHeader>
                    <TextComboDetails>Share your public spotify playlist using Uniquify </TextComboDetails>
                </TextComboContainer>
                <SytledImage src={require('../../Assets/LandingPagePic.png')} />
            </StyledImageTextContainer>
            <StyledImageTextContainer>
                <TextComboContainer>
                    <TextComboHeader>Help your friends</TextComboHeader>
                    <TextComboDetails>Share your public spotify playlist using Uniquify </TextComboDetails>
                </TextComboContainer>
                <SytledImage src={require('../../Assets/LandingPagePic.png')} />
            </StyledImageTextContainer>
        </StyledHomePage>
    )
}
