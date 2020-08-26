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
            songs2: []
        }
    }

    comparePlaylist(s1,s2){
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
        const req = new URL("http://localhost:5000/compare/");
        req.searchParams.append("song1", this.state.list1);
        req.searchParams.append("song2", this.state.list2);

        try{
            fetch(req)
                .then(res => res.json())
                .then(res => {
                    console.log(res);
                    this.comparePlaylist(res.songs1,res.songs2)
                })
        }catch{
            console.log("failed to fetch");
        }
    }

    
    render() {
        return (
            <div className={CompareStyles.wrapper} id={CompareStyles.wrapper} >
            
                <input type="text" id='playList1' onChange={event => this.state.list1 = event.target.value}></input>
                <input type="text" id='playList2' onChange={event => this.state.list2 = event.target.value}></input><br></br>
                <button onClick={this.handleButtonClick}>Get list</button><br></br>
                <ol id="list1">
                    {this.state.songs1.map(song => <Song name={song["name"]} repeated={song["repeated"]} key={song["name"]+Math.random()}/>)}
                </ol>
                <ol id="list2">
                    {this.state.songs2.map(song => <Song name={song["name"]} repeated={song["repeated"]} key={song["name"]+Math.random()+1.1}/>)}
                </ol>
            </div>
        )
    }
}