import React, { Component } from "react";
import CompareStyles from "./Compare.module.css";
import Song from "./Song";
import axios from "axios";

export default class Compare extends Component {
    constructor() {
        super();
        this.state = {
            list1: "3wgGItoJDDLMDUBCdYBQ2d",
            list2: "2uwblsTCKkwr4fyTMh2qeI",
            songs1: [],
            songs2: [],
            showRepeated: true,
            playlistName1: "",
            playlistName2: ""
        }
    }

    addPlaylistName(p1,p2){
        if(p1,p2){
            this.setState({
                playlistName1: p1,
                playlistName2: p2
            });
        }
    }

    comparePlaylist(s1,s2){
        if(s1 === undefined || s2 === undefined){
            alert("Invalid playlist ID, please try again!");
            return;
        }
        let array1 = s1.map(songItem => {
            let dup=false;
            if(s2.includes(songItem)) dup=true
            return {
                name: songItem,
                repeated: dup
            }
        })
        let array2 = s2.map(songItem => {
            let dup=false;
            if(s1.includes(songItem)) dup=true
            return {
                name: songItem,
                repeated: dup
            }
        })
        this.setState({
            songs1 : array1,
            songs2 : array2
        })
    }
    //Starts the comparison 
    handleButtonClick = () => {
        const req = new URL("https://uniquify.herokuapp.com/compare/");
        document.getElementById('loader').style.display = 'block';
        req.searchParams.append("song1", this.state.list1);
        req.searchParams.append("song2", this.state.list2);
        try{
            fetch(req)
                .then(res => res.json())
                .then(res => {
                    console.log(res);
                    this.comparePlaylist(res.songs1,res.songs2);
                    this.addPlaylistName(res.playlistName1, res.playlistName2);
                    document.getElementById('loader').style.display = 'none';
                })
        }catch{
            console.log("failed to fetch");
        }
    }

    hideNonUnique() {
        this.setState({showRepeated: !this.state.showRepeated})
    }
    changeInput1(event) {
        //Change playlist ID URI
        if(event.target.value.includes("spotify:playlist:")){
            var pID = event.target.value.replace("spotify:playlist:", "");
            this.setState({list1: pID});
        //Chance playlist ID link
        }else if (event.target.value.includes("https://open.spotify.com/playlist/")) {
            var pID = event.target.value.substr(34,22);
            this.setState({list1: pID});
        //Assume its raw playlist ID
        }else {
            this.setState({list1: event.target.value});
        }
    }
    changeInput2(event) {
        //Change playlist ID URI
        if(event.target.value.includes("spotify:playlist:")){
            var pID = event.target.value.replace("spotify:playlist:", "");
            this.setState({list2: pID});
        //Chance playlist ID link
        }else if (event.target.value.includes("https://open.spotify.com/playlist/")) {
            var pID = event.target.value.substr(34,22);
            this.setState({list2: pID});
        //Assume its raw playlist ID
        }else {
            this.setState({list2: event.target.value});
        }
    }
    //https://open.spotify.com/playlist/3wgGItoJDDLMDUBCdYBQ2d?si=Bw0DiT0bQR6EZEF96GEO6w
    //https://open.spotify.com/playlist/2uwblsTCKkwr4fyTMh2qeI?si=zKs-_abBQDuDXb8X2jXzyQ

    
    render() {
        return (
            <div className={CompareStyles.wrapper} id={CompareStyles.wrapper} >
                <h3>Welcome to Uniquify!</h3><br></br> 
                <p>To get started simply put two <i>public</i> Spotify playlists links which can be located under "share"</p>
                <p>Once the two playlists are loaded click on any item to sort by unique songs</p>
                <input type="text" id='playList1' onChange={event => this.changeInput1(event)}></input>
                <input type="text" id='playList2' onChange={event => this.changeInput2(event)}></input><br></br>
            
                <button onClick={this.handleButtonClick}>Get list</button><br></br>
                <div id="loader"></div>
                <ol id="list1" title={this.state.playlistName1} onClick={this.hideNonUnique.bind(this)}>
                    {this.state.songs1.filter(song => this.state.showRepeated || !song["repeated"]).map(song => <Song name={song["name"]} repeated={song["repeated"]} key={song["name"]+Math.random()}/>)}
                </ol>
                <ol id="list2" title={this.state.playlistName2} onClick={this.hideNonUnique.bind(this)}>
                    {this.state.songs2.filter(song => this.state.showRepeated || !song["repeated"]).map(song => <Song name={song["name"]} repeated={song["repeated"]} key={song["name"]+Math.random()+1.1}/>)}
                </ol>
            </div>
        )
    }
}