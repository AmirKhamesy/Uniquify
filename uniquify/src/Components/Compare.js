import React, { Component } from "react";
import CompareStyles from "../CSS/Compare.module.css";
import Song from "./Song";
import AOS from 'aos';
import 'aos/dist/aos.css';

export default class Compare extends Component {
    constructor() {
        super();
        this.state = {
            // list1: "3wgGItoJDDLMDUBCdYBQ2d",
            list1: "37i9dQZF1DWXT8uSSn6PRy",
            list2: "37i9dQZF1DXcBWIGoYBM5M",
            // list2: "2uwblsTCKkwr4fyTMh2qeI",
            songs1: [],
            songs2: [],
            // showRepeated: true,
            showRepeated: "all",
            playlistName1: "",
            playlistName2: ""
        }
    }

    componentDidMount() {
        AOS.init()
    }

    addPlaylistName(p1, p2) {
        if (p1, p2) {
            this.setState({
                playlistName1: p1,
                playlistName2: p2
            });
        }
    }

    comparePlaylist(s1, s2) {
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
        this.setState({
            songs1: array1,
            songs2: array2
        })
    }
    //Starts the comparison 
    handleButtonClick = () => {
        const req = new URL("https://uniquify.herokuapp.com/compare/");
        document.getElementById('loader').style.display = 'block';
        req.searchParams.append("song1", this.state.list1);
        req.searchParams.append("song2", this.state.list2);
        try {
            fetch(req)
                .then(res => res.json())
                .then(res => {
                    console.log(res);
                    this.comparePlaylist(res.songs1, res.songs2);
                    this.addPlaylistName(res.playlistName1, res.playlistName2);
                    document.getElementById('loader').style.display = 'none';
                })
        } catch {
            console.log("failed to fetch");
        }
    }

    hideNonUnique() {
        if (this.state.repeated === "all") {
            this.setState({
                repeated: "unique"
            })
        } else if (this.state.repeated === "unique") {
            this.setState({
                repeated: "repeated"
            })
        } else {
            this.setState({
                repeated: "all"
            })
        }
    }

    changeInput1(event) {
        //Change playlist ID URI
        if (event.target.value.includes("spotify:playlist:")) {
            var pID = event.target.value.replace("spotify:playlist:", "");
            this.setState({ list1: pID });
            //Chance playlist ID link
        } else if (event.target.value.includes("https://open.spotify.com/playlist/")) {
            var pID = event.target.value.substr(34, 22);
            this.setState({ list1: pID });
            //Assume its raw playlist ID
        } else {
            this.setState({ list1: event.target.value });
        }
    }
    changeInput2(event) {
        //Change playlist ID URI
        if (event.target.value.includes("spotify:playlist:")) {
            var pID = event.target.value.replace("spotify:playlist:", "");
            this.setState({ list2: pID });
            //Chance playlist ID link
        } else if (event.target.value.includes("https://open.spotify.com/playlist/")) {
            var pID = event.target.value.substr(34, 22);
            this.setState({ list2: pID });
            //Assume its raw playlist ID
        } else {
            this.setState({ list2: event.target.value });
        }
    }
    filterSongs(songs) {
        if (this.state.repeated === "all") {
            return songs.filter(song => !song.repeated)
        } else if (this.state.repeated === "unique") {
            return songs.filter(song => song.repeated)
        } else {
            return songs
        }
    }

    render() {
        return (
            <div className={CompareStyles.wrapper} id={CompareStyles.wrapper} >
                <h3>Welcome to Uniquify!</h3><br></br>
                <p>To get started simply put two <i>public</i> Spotify playlists links which can be located under "share"</p>
                <p>Once playlists are loaded, clicking on either playlist the will cycle from: all songs, <b>Unique songs</b> and repeated songs</p>
                <p>PS. You can click Get list without inserting any playlists to compare two sample playlists!</p>
                <input type="text" id='playList1' onChange={event => this.changeInput1(event)}></input>
                <input type="text" id='playList2' onChange={event => this.changeInput2(event)}></input><br></br>

                <button onClick={this.handleButtonClick}>Get list</button><br></br>
                <div id="loader"></div>
                <ol title={this.state.playlistName1} onClick={this.hideNonUnique.bind(this)}>
                    {this.filterSongs(this.state.songs1).map(song => <div data-aos="fade-down"><Song name={song["name"]} repeated={song["repeated"]} key={song["name"] + Math.random()} /></div>)}
                </ol>
                <ol title={this.state.playlistName2} onClick={this.hideNonUnique.bind(this)}>
                    {this.filterSongs(this.state.songs2).map(song => <div data-aos="fade-down"><Song name={song["name"]} repeated={song["repeated"]} key={song["name"] + Math.random() + 1.1} /></div>)}
                </ol>
            </div>
        )
    }
}


