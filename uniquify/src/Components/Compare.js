import React, { useEffect, useState } from "react";
import CompareStyles from "../CSS/Compare.module.css";
import Song from "./Song";
import AOS from 'aos';
import 'aos/dist/aos.css';


export default function Compare() {
    // const [state, setState] = useState({
    //     // list1: "3wgGItoJDDLMDUBCdYBQ2d",
    //     list1: "37i9dQZF1DWXT8uSSn6PRy",
    //     list2: "37i9dQZF1DXcBWIGoYBM5M",
    //     // list2: "2uwblsTCKkwr4fyTMh2qeI",
    //     songs1: [],
    //     songs2: [],
    //     // showRepeated: true,
    //     showRepeated: "all",
    //     playlistName1: "",
    //     playlistName2: "",
    // })
    const [list1, setList1] = useState("3wgGItoJDDLMDUBCdYBQ2d")
    const [list2, setList2] = useState("37i9dQZF1DXcBWIGoYBM5M")
    const [songs1, setSongs1] = useState([])
    const [songs2, setSongs2] = useState([])
    const [showRepeated, setShowRepeated] = useState("all")
    const [playlistName1, setPlaylistName1] = useState("")
    const [playlistName2, setPlaylistName2] = useState("")
    useEffect(() => {
        AOS.init()
    }, [])

    const addPlaylistName = (p1, p2) => {
        if (p1, p2) {
            // setState({
            //     playlistName1: p1,
            //     playlistName2: p2
            // });
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
        // setState(({
        //     songs1: array1,
        //     songs2: array2
        // }));
        setSongs1(array1)
        setSongs2(array2)
    }
    //Starts the comparison 
    const handleButtonClick = () => {
        const req = new URL("https://uniquify.herokuapp.com/compare/");
        document.getElementById('loader').style.display = 'block';
        req.searchParams.append("song1", list1);
        req.searchParams.append("song2", list2);
        try {
            fetch(req)
                .then(res => res.json())
                .then(res => {
                    console.log(res);

                    comparePlaylist(res.songs1, res.songs2);
                    addPlaylistName(res.playlistName1, res.playlistName2);
                    document.getElementById('loader').style.display = 'none';
                })
        } catch {
            console.log("failed to fetch");
        }
    }

    const hideNonUnique = () => {
        // if (state.repeated === "all") {
        if (showRepeated === "all") {
            // setState({
            //     repeated: "unique"
            // })
            setShowRepeated("unique")
            // } else if (state.repeated === "unique") {
        } else if (showRepeated === "unique") {
            // setState({
            //     repeated: "repeated"
            // })
            setShowRepeated("repeated")
        } else {
            // setState({
            //     repeated: "all"
            // })
            setShowRepeated("all")
        }
    }

    const changeInput1 = (event) => {
        //Change playlist ID URI
        if (event.target.value.includes("spotify:playlist:")) {
            var pID = event.target.value.replace("spotify:playlist:", "");
            // setState({ list1: pID });
            setList1(pID)
            //Chance playlist ID link
        } else if (event.target.value.includes("https://open.spotify.com/playlist/")) {
            var pID = event.target.value.substr(34, 22);
            // setState({ list1: pID });
            setList1(pID)
            //Assume its raw playlist ID
        } else {
            // setState({ list1: event.target.value });
            setList1(event.target.value)
        }
    }
    const changeInput2 = (event) => {
        //Change playlist ID URI
        if (event.target.value.includes("spotify:playlist:")) {
            var pID = event.target.value.replace("spotify:playlist:", "");
            // setState({ list2: pID });
            setList2(pID)
            //Chance playlist ID link
        } else if (event.target.value.includes("https://open.spotify.com/playlist/")) {
            var pID = event.target.value.substr(34, 22);
            // setState({ list2: pID });
            setList2(pID)
            //Assume its raw playlist ID
        } else {
            // setState({ list2: event.target.value });
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
        <div className={CompareStyles.wrapper} id={CompareStyles.wrapper} >

            {/* 
                <h3>Welcome to Uniquify!</h3><br></br>
                <p>To get started simply put two <i>public</i> Spotify playlists links which can be located under "share"</p>
                <p>Once playlists are loaded, clicking on either playlist the will cycle from: all songs, <b>Unique songs</b> and repeated songs</p>
                <p>PS. You can click Get list without inserting any playlists to compare two sample playlists!</p> */}
            <input type="text" id='playList1' onChange={event => changeInput1(event)}></input>
            <input type="text" id='playList2' onChange={event => changeInput2(event)}></input><br></br>

            <button onClick={handleButtonClick}>Get list</button><br></br>
            <div id="loader"></div>
            <ol title={playlistName1} onClick={hideNonUnique}>
                {songs1 && songs1.length > 0 &&
                    filterSongs(songs1).map((song, idx) => <div key={"SongDiv" + idx + + Math.random()} data-aos="fade-down"><Song name={song["name"]} repeated={song["repeated"]} key={song["name"] + Math.random()} /></div>)}
            </ol>
            <ol title={playlistName2} onClick={hideNonUnique}>
                {songs2 && songs2.length > 0 &&
                    filterSongs(songs2).map((song, idx) =>
                        <div key={"SongDiv" + idx + Math.random() + 1.1} data-aos="fade-down">
                            <Song name={song["name"]} repeated={song["repeated"]} key={song["name"] + Math.random() + 1.1} />
                        </div>
                    )}
            </ol>
        </div>
    )
}


