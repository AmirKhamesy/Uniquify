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

    handleButtonClick = () => {
        const req = new URL("https://uniquify.herokuapp.com/compare/");
        req.searchParams.append("song1", this.state.list1);
        req.searchParams.append("song2", this.state.list2);

        try{
            fetch(req)
                .then(res => res.json())
                .then(res => {
                    console.log(res);
                    this.comparePlaylist(res.songs1,res.songs2);
                    this.addPlaylistName(res.playlistName1, res.playlistName2);
                })
        }catch{
            console.log("failed to fetch");
        }
    }

    hideNonUnique() {
        this.setState({showRepeated: !this.state.showRepeated})
    }
    
    render() {
        return (
            <div className={CompareStyles.wrapper} id={CompareStyles.wrapper} >
                <h3>Welcome to Uniquify!</h3><br></br>
                <p>To get started simply put two Spotify playlists IDs which can be located under "share" then click "Copy Spotify URI"</p>
                <p>Keep in mind both playlist that you want to compare have to be PUBLIC!</p>
                <input type="text" id='playList1' onChange={event => {if(event.target.value.includes("spotify:playlist:")){var pID = event.target.value.replace("spotify:playlist:", ""); this.setState({list1: pID})}else{this.setState({list1: event.target.value})}}}></input>
                <input type="text" id='playList2' onChange={event => {if(event.target.value.includes("spotify:playlist:")){var pID = event.target.value.replace("spotify:playlist:", ""); this.setState({list2: pID})}else{this.setState({list2: event.target.value})}}}></input><br></br>
                <button onClick={this.handleButtonClick}>Get list</button><br></br>
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