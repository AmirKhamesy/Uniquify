// var request = require('request'); // "Request" library
const express = require('express')
const app = express()
var SpotifyWebApi = require('spotify-web-api-node');
const port = process.env.PORT || 5000;
const path = require('path');
const { response } = require('express');
const { log } = require('console');
arrayLength1 = 0;
arrayLength2 = 0;


const publicPath = path.join(__dirname, 'build');
app.use(express.static(publicPath));


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())
app.use(require("body-parser").json())




const clientId = '5e93e86ebd0240ad82397fb370e29a52',
clientSecret = 'f4dad63343d149adbe219220c81624e6';

const spotifyApi = new SpotifyWebApi({
clientId: clientId,
clientSecret: clientSecret
});

let token = {
    expire: 0
};

const getNewToken = async () => {
    let data = await spotifyApi.clientCredentialsGrant()
    if(!data){
        console.log("failed to get token from spotify");
    }
    token.token = data.body['access_token'];
    token.expire = Math.round(Date.now()/1000) + data.body['expires_in'] - 5;
    spotifyApi.setAccessToken(data.body['access_token']);
}

getNewToken();


const getSongs = async (playlistID) => {
    let songs = [];
    let response;
    try{
        response = await spotifyApi.getPlaylistTracks(playlistID, { offset: 0, limit: 100 });
        songs = songs.concat(response.body.items);
    }catch{
        console.log("failed to get some songs");
        return {error: "playlist not found"}
    }
    arrayLength1 = response.body.total;

    for(let i = songs.length; i < arrayLength1; i += 100){
        try{
            response = await spotifyApi.getPlaylistTracks(playlistID, { offset: i, limit: 100 })
            songs = songs.concat(response.body.items);
        }catch{
            console.log("filed to get some songs");
            return {error: "failed to get all songs from playlist"}
        }
    }
    console.log(songs)

    return songs.map(song =>  `${song.track.name} \n ${song.track.album.artists[0]["name"]}`);
}

const getPlaylistName = async (playlistID) => {
    let playlistName = "";
    let response;
    try{
        response = await spotifyApi.getPlaylist(playlistID);
        playlistName = response.body["name"];
    }catch{
        return {error: "failed to get playlist name"}
    }
    return playlistName;
}



app.get("/compare", async (req, res) => {
    // console.log(req.query.song1);
    // console.log(req.query.song2);

    if(Date.now()/1000 > token.expire) await getNewToken();

    if(!req.query.song1 || !req.query.song2) {
        res.send("improper usage of API");
        return;
    };

    var error = undefined;
    // console.log('The access token expires in ' + data.body['expires_in']);
    // console.log('The access token is ' + data.body['access_token']);
    
    let playlistName1 = await getPlaylistName(req.query.song1);
    let playlistName2 = await getPlaylistName(req.query.song2);

    let songs1 = await getSongs(req.query.song1);

    if(songs1.error){
        res.json(songs1.error);
        return;
    }

    let songs2 = await getSongs(req.query.song2);

    if(songs2.error){
        res.json(songs2.error);
        return;
    }

    

    // console.log(playlistName1)
    // console.log(playlistName2)

    console.log(songs1.length);
    console.log(songs2.length);
    
    res.json({
        songs1,
        songs2,
        playlistName1,
        playlistName2
    });
})

app.listen(port, () => console.log(`Example app listening on port ${port}! (server)` ))






// app.post("*", (req,res) => {
//     console.log(req.body);
//     res.json('["test"]');
// })

// https://api.spotify.com/v1/playlists/2uwblsTCKkwr4fyTMh2qeI/tracks

// var clientId = '5e93e86ebd0240ad82397fb370e29a52',
// clientSecret = 'f4dad63343d149adbe219220c81624e6';

//       var spotifyApi = new SpotifyWebApi({
//         clientId: clientId,
//         clientSecret: clientSecret
//       });


//   spotifyApi.clientCredentialsGrant().then(
//     function(data) {
//       console.log('The access token expires in ' + data.body['expires_in']);
//       console.log('The access token is ' + data.body['access_token']);

//       // Save the access token so that it's used in future calls
//       spotifyApi.setAccessToken(data.body['access_token']);
//       spotifyApi.getPlaylistTracks("2uwblsTCKkwr4fyTMh2qeI", {offset: 0, limit: 5}).then((response) => console.log(response.body.items.forEach((thing)=> console.log(thing.track.name))))
//     //   spotifyApi.getPlaylistTracks("2uwblsTCKkwr4fyTMh2qeI", {offset: 0, limit: 10}).then((response) => console.log(response))
//     },
//     function(err) {
//       console.log('Something went wrong when retrieving an access token', err);
//     }
//   );

// //   var spotifyApi = new SpotifyWebApi({
// //     accessToken: 'njd9wng4d0ycwnn3g4d1jm30yig4d27iom5lg4d3'
// //   });

// //   Get tracks in a playlist


// // your application requests authorization
// // var authOptions = {
// //   url: 'https://accounts.spotify.com/api/token',
// //   headers: {
// //     'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
// //   },
// //   form: {
// //     grant_type: 'client_credentials'
// //   },
// //   json: true
// // };

// // request.post(authOptions, function(error, response, body) {
// //   if (!error && response.statusCode === 200) {

// //     // use the access token to access the Spotify Web API
// //     var token = body.access_token;
// //     var options = {
// //       url: 'https://api.spotify.com/v1/users/jmperezperez',
// //       headers: {
// //         'Authorization': 'Bearer ' + token
// //       },
// //       json: true
// //     };
// //     request.get(options, function(error, response, body) {
// //       console.log(body);
// //     });
// //   }
// // });
