(this.webpackJsonpuniquify=this.webpackJsonpuniquify||[]).push([[0],{14:function(e,t,a){},22:function(e,t,a){e.exports=a(36)},27:function(e,t,a){},28:function(e,t,a){},30:function(e,t,a){},36:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),i=a(19),s=a.n(i),r=(a(27),a(28),a(9)),o=a(10),c=a(12),u=a(11),p=a(14),m=a.n(p),d=function(e){Object(c.a)(a,e);var t=Object(u.a)(a);function a(e){return Object(r.a)(this,a),t.call(this,e)}return Object(o.a)(a,[{key:"render",value:function(){return l.a.createElement("li",{id:this.props.name,style:{fontWeight:this.props.repeated?500:800,margin:"1%"}},this.props.name.split("\n\n")[0],l.a.createElement("br",null),l.a.createElement("text",null,this.props.name.split("\n\n")[1]))}}]),a}(n.Component),h=a(20),y=a.n(h),f=(a(29),function(e){Object(c.a)(a,e);var t=Object(u.a)(a);function a(){var e;return Object(r.a)(this,a),(e=t.call(this)).handleButtonClick=function(){var t=new URL("https://uniquify.herokuapp.com/compare/");document.getElementById("loader").style.display="block",t.searchParams.append("song1",e.state.list1),t.searchParams.append("song2",e.state.list2);try{fetch(t).then((function(e){return e.json()})).then((function(t){console.log(t),e.comparePlaylist(t.songs1,t.songs2),e.addPlaylistName(t.playlistName1,t.playlistName2),document.getElementById("loader").style.display="none"}))}catch(a){console.log("failed to fetch")}},e.state={list1:"37i9dQZF1DWXT8uSSn6PRy",list2:"37i9dQZF1DXcBWIGoYBM5M",songs1:[],songs2:[],showRepeated:"all",playlistName1:"",playlistName2:""},e}return Object(o.a)(a,[{key:"componentDidMount",value:function(){y.a.init()}},{key:"addPlaylistName",value:function(e,t){t&&this.setState({playlistName1:e,playlistName2:t})}},{key:"comparePlaylist",value:function(e,t){if(void 0!==e&&void 0!==t){var a=e.map((function(e){var a=!1;return t.includes(e)&&(a=!0),{name:e,repeated:a}})),n=t.map((function(t){var a=!1;return e.includes(t)&&(a=!0),{name:t,repeated:a}}));this.setState({songs1:a,songs2:n})}else alert("Invalid playlist ID, please try again!")}},{key:"hideNonUnique",value:function(){"all"===this.state.repeated?this.setState({repeated:"unique"}):"unique"===this.state.repeated?this.setState({repeated:"repeated"}):this.setState({repeated:"all"})}},{key:"changeInput1",value:function(e){if(e.target.value.includes("spotify:playlist:")){var t=e.target.value.replace("spotify:playlist:","");this.setState({list1:t})}else if(e.target.value.includes("https://open.spotify.com/playlist/")){t=e.target.value.substr(34,22);this.setState({list1:t})}else this.setState({list1:e.target.value})}},{key:"changeInput2",value:function(e){if(e.target.value.includes("spotify:playlist:")){var t=e.target.value.replace("spotify:playlist:","");this.setState({list2:t})}else if(e.target.value.includes("https://open.spotify.com/playlist/")){t=e.target.value.substr(34,22);this.setState({list2:t})}else this.setState({list2:e.target.value})}},{key:"filterSongs",value:function(e){return"all"===this.state.repeated?e.filter((function(e){return!e.repeated})):"unique"===this.state.repeated?e.filter((function(e){return e.repeated})):e}},{key:"render",value:function(){var e=this;return l.a.createElement("div",{className:m.a.wrapper,id:m.a.wrapper},l.a.createElement("h3",null,"Welcome to Uniquify!"),l.a.createElement("br",null),l.a.createElement("p",null,"To get started simply put two ",l.a.createElement("i",null,"public"),' Spotify playlists links which can be located under "share"'),l.a.createElement("p",null,"Once playlists are loaded, clicking on either playlist the will cycle from: all songs, ",l.a.createElement("b",null,"Unique songs")," and repeated songs"),l.a.createElement("p",null,"PS. You can click Get list without inserting any playlists to compare two sample playlists!"),l.a.createElement("input",{type:"text",id:"playList1",onChange:function(t){return e.changeInput1(t)}}),l.a.createElement("input",{type:"text",id:"playList2",onChange:function(t){return e.changeInput2(t)}}),l.a.createElement("br",null),l.a.createElement("button",{onClick:this.handleButtonClick},"Get list"),l.a.createElement("br",null),l.a.createElement("div",{id:"loader"}),l.a.createElement("ol",{title:this.state.playlistName1,onClick:this.hideNonUnique.bind(this)},this.filterSongs(this.state.songs1).map((function(e){return l.a.createElement("div",{"data-aos":"fade-down"},l.a.createElement(d,{name:e.name,repeated:e.repeated,key:e.name+Math.random()}))}))),l.a.createElement("ol",{title:this.state.playlistName2,onClick:this.hideNonUnique.bind(this)},this.filterSongs(this.state.songs2).map((function(e){return l.a.createElement("div",{"data-aos":"fade-down"},l.a.createElement(d,{name:e.name,repeated:e.repeated,key:e.name+Math.random()+1.1}))}))))}}]),a}(n.Component));var g=function(){return l.a.createElement("div",{className:"App"},l.a.createElement(f,null))};a(30);var v=function(){return l.a.createElement("div",{className:"hi"},l.a.createElement("p",{style:{color:"white"}},"  landing page"))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var E=a(8),b=a(1);s.a.render(l.a.createElement(l.a.StrictMode,null,l.a.createElement(E.a,null,l.a.createElement("nav",null,l.a.createElement("ul",null,l.a.createElement("li",null,l.a.createElement(E.b,{to:"/"},"home")),l.a.createElement("li",null,l.a.createElement(E.b,{to:"/compare"},"Compare")))),l.a.createElement(b.a,{path:"/",exact:!0,component:v}),l.a.createElement(b.a,{path:"/compare",exact:!0,component:g}))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[22,1,2]]]);
//# sourceMappingURL=main.3de334df.chunk.js.map