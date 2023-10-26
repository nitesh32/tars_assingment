import './App.css';
// import Navbarmain from './components/Navbarmain';
import Main from './components/Main';
import React, { useState ,useEffect} from 'react';



const style_dark={
    backgroundColor:"rgb(35,35,35)",
    color:"white"
}
const style_light={
    backgroundColor:"rgb(255,255,255)",
    color:"black"
}
const style_bar_dark={
    backgroundColor:"rgb(79,79,79)",
    color:"rgb(196,196,196)",
}
const style_bar_light={
    backgroundColor:"rgb(249,249,249)",
}

function App() {
  const [mode,setmode]=useState("Dark");
  const [Data,setData]=useState("");
  const [hello,sethello]=useState("");

  function handlemode(){
    if(mode==="Dark"){
      setmode("Light");
    }
    else{
      setmode("Dark");
    }
  }
  // api call
  const [apiUrl,setapiUrl ]=useState("https://api.unsplash.com/search/photos?query={}&per_page=10&client_id=tmdUnO9SEc6CqG5vHJIQbYSv5EqsTXwzJ9O8TylSwrM");
    
  useEffect(() => {
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setData(data.results);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [hello]);

  const handleenter= event => {
    if(event.key==="Enter"){
      sethello(event.target.value);

      setapiUrl(`https://api.unsplash.com/search/photos?query=${event.target.value}&per_page=10&client_id=tmdUnO9SEc6CqG5vHJIQbYSv5EqsTXwzJ9O8TylSwrM`)
      setData("");
      event.target.value="";
    }
  };


  return (
    
    <div className="App" style={mode==="Dark"?{backgroundColor:"white"}:{backgroundColor:"rgb(35,35,35)"}}>
      
      <div id="navbar" style={mode==="Dark"?style_light:style_dark}>
      <strong >Image Gallery</strong>
      <div id="search_bar" style={mode==="Dark"?style_bar_light:style_bar_dark}>
        <div  id="search_icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
</svg>
        </div>
        <input type="text" placeholder="Search Images here" style={mode==="Dark"?style_bar_light:style_bar_dark} id="search_text" onKeyDown={handleenter} autoComplete="off"></input>
      </div>
      <div id="buttons_action">
      <h3>Explore</h3>
        <h3>Collection</h3>
        <h3>Community</h3>
      </div>

      <div id="mode_change">
        <h3>{mode} Mode</h3>
        <div id="mode_outer"  onClick={()=>handlemode()} style={mode==="Dark"?{justifyContent:"flex-start",backgroundColor:"rgb(133,132,132)"}:{justifyContent:"flex-end",backgroundColor:"white"}}>
          <div id="mode_inner" style={mode==="Dark"?{backgroundColor:"white"}:{backgroundColor:"rgb(133,132,132)"}}></div>
        </div>
      </div>
        
    </div>
      <Main mode={mode} data={Data} mean={hello}/>
    </div>
  );

}

export default App;
