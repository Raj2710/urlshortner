import "../../App.css"
import { useState } from "react";
import axios from "axios";
export default function CreatePopup(props){
    let [longurl,setLongurl] = useState("");
    let [shorturl,setShorturl] = useState("");
    let handleEvent = async()=>{
        await axios.post("https://urlshortnerbe.herokuapp.com/createurl",{
            email:props.email,
            longurl:longurl
        })
        .then((response)=>{
            setShorturl(response.data.shorturl);
        })
        .catch((error)=>console.log(error))
    }
    return (props.trigger)?<>
        <div className="create-popup-wrapper">
            <div className="popup-elements">
                <h3 style={{color:"white"}}>Enter long URL:</h3>
                <input type="text" className="create-input" onChange={(e)=>setLongurl(e.target.value)}></input>
                <button className="short-url" onClick={handleEvent}>Short</button>
            </div>
            <i className="far fa-window-close fa-2x" id="close-button" onClick={()=>props.setVisibility(false)}></i>
        </div>
        {shorturl?<div className="shorturl">Short Url: <a href={longurl} className="Link" target="_blank" rel="noreferrer">{shorturl}</a></div>:""}
    </>:"";
}