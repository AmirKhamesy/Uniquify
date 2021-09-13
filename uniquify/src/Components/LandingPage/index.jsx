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
@media (max-width: 768px) {
    max-width: 100%;
margin: auto;
}
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
cursor: pointer;
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
font-size: 5vmin;
@media (max-width: 768px) {
    margin: 1rem;
}
`
const StyledDetailText = styled.p`
margin: 1rem 0;
color: #1a1a1a;
font-weight: 300;
font-size: 1.75vmax;
@media (max-width: 768px) {
    margin: 1rem;
}

`

const StyledImageTextContainer = styled.div`
display: flex;
flex-direction: ${props => props.flipped ? "row" : "row-reverse"};
justify-content: space-evenly;
margin: 5vmax;
@media (max-width: 768px) {
    flex-direction: column-reverse;
}
`
const TextComboContainer = styled.div`
display: flex;
flex-direction: column;
text-align: center;
justify-content: center;
background-color: #f7f7f8;
border-radius: 5vw;
padding: 0 10vw;

`
const TextComboDetails = styled.p`
color: #1a1a1a;
font-weight: 300;
font-size: 2vmax;
`
const AuthorCreds = styled.a`
color: #1a1a1a;
font-weight: 300;
font-size: 1vmax;
text-decoration: underline;
display: flex;
justify-content: center;
padding: 0 0 1rem 0;
`

export const LandingPage = ({ show }) => {
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
                                .typeString("Find You're Perfect playlist.")
                                .start();
                        }}
                    />
                </StyledDetailh2>
                <StyledDetailText>Comparing has never been easier.</StyledDetailText>
                <div>
                    <StyledButton onClick={() => show(false)}>Start Comparing</StyledButton>
                </div>
            </DetailsContainer>

            <StyledImageTextContainer >
                <TextComboContainer >
                    <StyledDetailh2>Contribute</StyledDetailh2>
                    <TextComboDetails>Share your public Spotify playlist.</TextComboDetails>
                </TextComboContainer>
                <SytledImage src={require('../../Assets/LandingPagePic.png')} />
            </StyledImageTextContainer>

            <StyledImageTextContainer flipped>
                <TextComboContainer >
                    <StyledDetailh2>Analyze</StyledDetailh2>
                    <TextComboDetails>Compare your playlist with others.</TextComboDetails>
                </TextComboContainer>
                <SytledImage src={require('../../Assets/LandingPagePic3.png')} />
            </StyledImageTextContainer>
            <AuthorCreds>Created By Amir Khamesy</AuthorCreds>
        </StyledHomePage>
    )
}
