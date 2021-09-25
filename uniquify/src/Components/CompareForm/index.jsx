import React, { useEffect, useState } from 'react'
import styled, { keyframes } from "styled-components";
import Song from "../Song";
import repeated from "../../Assets/InnerJoin.png"
import unique from "../../Assets/OutterJoin.png"
import all from "../../Assets/FullJoin.png"

const media = {
    mobile: '@media (max-width: 768px)'
}

const StyledInput = styled.input`
background-color: rgba(160,209,149, 0.4);
width: 40vw;
height: 5vh;
outline: none;
border: none;
border-radius: 2vmin;
padding: 0 1rem;
${media.mobile} {
    width: 91.5%;
    height: 6vmax;
}
`
const StyledInputContainer = styled.div`
/* border: 2px solid black; */
display: flex;
justify-content: space-evenly;
${media.mobile} {
    flex-direction: column;
    margin: 0  1rem;
}
`
const StyledLabelComboContainer = styled.div`
/* border: 2px solid blue; */
display: flex;
flex-flow: column;
margin-bottom: 1rem;
`
const StyledLabel = styled.p`
/* border: 2px solid red; */
margin: 0;
padding:0 0 0 2vw;
color: #1a1a1a;
font-weight: 300;
font-size: 1.75vmax;
${media.mobile} {
    font-size: 3vmax;
}
`


const StyledButton = styled.button`
cursor: pointer;
border-radius: 20px;
width: 12vmax;
height: 4vmax;
background-color: #a0d195;
color: #fff;
border: none;   
outline: none;
font-size: 1.6vmax;
transition: .3s;
//center
position: relative;
margin-top: 3vmin;
left: 50%;
-ms-transform: translate(-50%, -50%);
transform: translate(-50%, -50%);
&:hover{
    width: 15vmax;
}
${media.mobile} {
    &:hover{
        width: 95%;
    }
    width: 95%;
    height: 6vmax;
}
`
const spin = keyframes`
 0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const StyledLoader = styled.div`
position: relative;
    left: 45%;
z-index: 1000;
display: block;
border: 16px solid #f3f3f3;
border-radius: 50%;
border-top: 16px solid #a0d195;
width:  8vmin;
height:  8vmin;
-webkit-animation: ${spin} 2s linear infinite; /* Safari */
animation: ${spin} 2s linear infinite;
background: rgba(255, 255, 255, 0.8) 50% 50% no-repeat;
`
const StyledSongsContainer = styled.div`
background-image: url(${props => props.showRepeated === "unique" ? repeated : props.showRepeated === "repeated" ? all : unique});
background-repeat: no-repeat;
background-size: contain;
background-attachment: fixed;
background-position: bottom 10px right 50%;
position: relative;
width: 100vw;
display: flex;
justify-content:space-around ;
overflow:  hidden;

`

const StyledOL = styled.ol`
display: flex;
flex-direction: column;
align-items: flex-start;
list-style-type: none;
li {

  background: #dcdcdc;
  padding: 1rem;
  border-radius: 10px;
  color: #1a1a1a;
  padding:  1vmax;
  margin:  0.66vmax;
}
`


export const CompareForm = () => {

    const [list1, setList1] = useState("37i9dQZF1DWXT8uSSn6PRy")
    const [list2, setList2] = useState("37i9dQZF1DXcBWIGoYBM5M")
    const [songs1, setSongs1] = useState([])
    const [songs2, setSongs2] = useState([])
    const [showRepeated, setShowRepeated] = useState("repeated")
    const [playlistName1, setPlaylistName1] = useState("")
    const [playlistName2, setPlaylistName2] = useState("")
    const [loading, setLoading] = useState(false)


    const addPlaylistName = (p1, p2) => {
        if (p1, p2) {

            setPlaylistName1(p1)
            setPlaylistName2(p2)
        }
    }

    const comparePlaylist = (s1, s2) => {
        if (s1 === undefined || s2 === undefined) {
            alert("Invalid playlist ID, please try again!");
            return;
        }
        let array1 = s1.map(songItem => {
            let dup = false;
            if (s2.includes(songItem)) dup = true
            return {
                name: songItem,
                repeated: dup
            }
        })
        let array2 = s2.map(songItem => {
            let dup = false;
            if (s1.includes(songItem)) dup = true
            return {
                name: songItem,
                repeated: dup
            }
        })

        setSongs1(array1)
        setSongs2(array2)
    }
    //Starts the comparison 
    const handleButtonClick = () => {
        const req = new URL("https://uniquify.herokuapp.com/compare/");
        //show loading
        setLoading(true)
        req.searchParams.append("song1", list1);
        req.searchParams.append("song2", list2);
        try {
            fetch(req)
                .then(res => res.json())
                .then(res => {
                    console.log(res);

                    comparePlaylist(res.songs1, res.songs2);
                    addPlaylistName(res.playlistName1, res.playlistName2);
                    setLoading(false)
                    //HIDE loading
                })
        } catch {
            console.log("failed to fetch");
        }
    }

    const hideNonUnique = () => {
        if (showRepeated === "all") {
            setShowRepeated("unique")
        } else if (showRepeated === "unique") {
            setShowRepeated("repeated")
        } else {
            setShowRepeated("all")
        }
    }

    const changeInput1 = (event) => {
        //Change playlist ID URI
        if (event.target.value.includes("spotify:playlist:")) {
            var pID = event.target.value.replace("spotify:playlist:", "");
            setList1(pID)
            //Chance playlist ID link
        } else if (event.target.value.includes("https://open.spotify.com/playlist/")) {
            var pID = event.target.value.substr(34, 22);
            setList1(pID)
            //Assume its raw playlist ID
        } else {
            setList1(event.target.value)
        }
    }
    const changeInput2 = (event) => {
        //Change playlist ID URI
        if (event.target.value.includes("spotify:playlist:")) {
            var pID = event.target.value.replace("spotify:playlist:", "");
            setList2(pID)
            //Chance playlist ID link
        } else if (event.target.value.includes("https://open.spotify.com/playlist/")) {
            var pID = event.target.value.substr(34, 22);
            setList2(pID)
            //Assume its raw playlist ID
        } else {
            setList2(event.target.value)
        }
    }
    const filterSongs = (songs) => {
        if (showRepeated === "all") {
            return songs.filter(song => !song.repeated)
        } else if (showRepeated === "unique") {
            return songs.filter(song => song.repeated)
        } else {
            return songs
        }
    }
    return (
        <>
            <StyledInputContainer>
                <StyledLabelComboContainer>
                    <StyledLabel>Playlist 1</StyledLabel>
                    <StyledInput
                        value={list1}
                        onChange={event => changeInput1(event)}
                        html="test"
                    />
                </StyledLabelComboContainer>
                <StyledLabelComboContainer>
                    <StyledLabel>Playlist 2</StyledLabel>
                    <StyledInput
                        value={list2}
                        onChange={event => changeInput2(event)}
                    />
                </StyledLabelComboContainer>
            </StyledInputContainer>
            {
                loading ?
                    <StyledLoader />
                    :
                    <StyledButton onClick={handleButtonClick}>Get list</StyledButton>
            }

            {songs1.length > 0 && songs2.length > 0 &&
                <StyledSongsContainer showRepeated={showRepeated} onClick={hideNonUnique}>
                    <StyledOL title={playlistName1} >
                        <StyledLabel>{playlistName1}</StyledLabel>
                        {
                            filterSongs(songs1).map((song, idx) =>
                                <div key={"SongDiv" + idx + + Math.random()} data-aos="fade-down"><Song name={song["name"]} repeated={song["repeated"]} key={song["name"] + Math.random()} />
                                </div>
                            )
                        }
                    </StyledOL>
                    <StyledOL title={playlistName2} >
                        <StyledLabel>{playlistName2}</StyledLabel>
                        {
                            filterSongs(songs2).map((song, idx) =>
                                <div key={"SongDiv" + idx + Math.random() + 1.1} data-aos="fade-down">
                                    <Song name={song["name"]} repeated={song["repeated"]} key={song["name"] + Math.random() + 1.1} />
                                </div>
                            )
                        }
                    </StyledOL>
                </StyledSongsContainer>
            }

        </>
    )
}
