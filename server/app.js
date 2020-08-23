/**
 * This is an example of a basic node.js script that performs
 * the Client Credentials oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#client_credentials_flow
 */

var request = require('request'); // "Request" library

// var client_id = '5e93e86ebd0240ad82397fb370e29a52'; // Your client id
// var client_secret = 'f4dad63343d149adbe219220c81624e6'; // Your secret
// https://api.spotify.com/v1/playlists/2uwblsTCKkwr4fyTMh2qeI/tracks
var SpotifyWebApi = require('spotify-web-api-node');
const { response } = require('express');

var clientId = '5e93e86ebd0240ad82397fb370e29a52',
  clientSecret = 'f4dad63343d149adbe219220c81624e6';

  var spotifyApi = new SpotifyWebApi({
    clientId: clientId,
    clientSecret: clientSecret
  }); 

  spotifyApi.clientCredentialsGrant().then(
    function(data) {
      console.log('The access token expires in ' + data.body['expires_in']);
      console.log('The access token is ' + data.body['access_token']);
  
      // Save the access token so that it's used in future calls
      spotifyApi.setAccessToken(data.body['access_token']);
      // spotifyApi.getPlaylistTracks("2uwblsTCKkwr4fyTMh2qeI", {offset: 0, limit: 100}).then((response) => console.log(response.body.items.forEach((thing)=> console.log(thing.track.name))))
      spotifyApi.getPlaylistTracks("2uwblsTCKkwr4fyTMh2qeI", {offset: 0, limit: 10}).then((response) => console.log(response))
    },
    function(err) {
      console.log('Something went wrong when retrieving an access token', err);
    }
  );

  var spotifyApi = new SpotifyWebApi({
    accessToken: 'njd9wng4d0ycwnn3g4d1jm30yig4d27iom5lg4d3'
  });
  
  // Get tracks in a playlist
  

// your application requests authorization
// var authOptions = {
//   url: 'https://accounts.spotify.com/api/token',
//   headers: {
//     'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
//   },
//   form: {
//     grant_type: 'client_credentials'
//   },
//   json: true
// };

// request.post(authOptions, function(error, response, body) {
//   if (!error && response.statusCode === 200) {

//     // use the access token to access the Spotify Web API
//     var token = body.access_token;
//     var options = {
//       url: 'https://api.spotify.com/v1/users/jmperezperez',
//       headers: {
//         'Authorization': 'Bearer ' + token
//       },
//       json: true
//     };
//     request.get(options, function(error, response, body) {
//       console.log(body);
//     });
//   }
// });
