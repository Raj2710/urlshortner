import "../../styles/mainview.css"
import axios from "axios";
import { useState} from "react";
export default function Mainview(props){
  let [clicked,setClick] = useState(false);
  let handleDelete = async(link)=>{
      if(window.confirm("Are you sure? You requested to delete "+link)){
      axios.delete(`https://urlshortnerbe.herokuapp.com/delete/${link}`)
      .then((res)=>{
        props.setReload(prev=>!prev);
        props.setLink({});
      })
      .then((error)=>console.log(error));
    }
    else{}
  }
  let handleClick = ()=>{
      navigator.clipboard.writeText(`https://urlshortnerbe.herokuapp.com/${props.link.shorturl}`);
      setClick(true);
      setTimeout(()=>{
        setClick(false);
      },1000)
  }
    return<>
      <div className="main-display">
        {!props.link.shorturl?<h3 style={{textAlign:"center", color:"#828387"}}>No link selected</h3>:<>
        <div className="main-top-display">
          <div className="main-time">CREATED {props.link.time}</div>
          <div className="main-title title">{props.link.title}</div>
          <div className="main-longurl">{props.link.longurl}</div><br></br>
          <span className="main-shorturl">{props.link.shorturl}</span>
          <button className="main-btn" onClick={handleClick}>Copy</button>
          <button className="main-btn" onClick={()=>handleDelete(props.link.shorturl)}>Delete</button>
          {clicked?<span className="main-shorturl ">Copied to clipboard!</span>:<></>}
        </div>    
        <hr></hr>
        <span style={{color:"#36383b",lineHeight:"2.4rem",fontSize:"x-large"}}>{props.link.clicks} </span> <i className="fas fa-mouse fa-lg clicks"></i>
        <div className="clicks" style={{fontSize:"1rem"}}>TOTAL CLICKS</div>
        </>}
     </div>  
    </>
}