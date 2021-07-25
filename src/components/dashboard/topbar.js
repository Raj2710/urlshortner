import urllogo from "./urllogo.png";
import "../../styles/topbar.css";
import { useHistory } from "react-router-dom";
import axios from "axios";
export default function Topbar(props){
    let history = useHistory();
    let handleEvent = ()=>{
        props.setVisibility(true)
    }
    let handleLogout = async()=>{
        await axios.post("https://urlshortnerbe.herokuapp.com/users/logout",{
            email:props.email
        }).then(async()=>{
            localStorage.removeItem('userData');
            history.push("/home");
        })
    }
    return<>
      <div className="top-wrapper">
        <div className="top-left-wrapper">
            <img className="logo" src={urllogo} alt="URL Shortner logo"></img>
            <p className="brandname">URL Shortner</p>
        </div>
        <div className="top-right-wrapper">
            <div className="top-right-elements">
                <button className="create-button" onClick={handleEvent}>Create</button>
                <i className="fas fa-user fa-2x" style={{color:"white"}}></i><h4 style={{color:"white"}}>{props.firstname}</h4>
                <button className="btn btn-danger" onClick={handleLogout}><i className="fas fa-sign-out-alt"></i> Logout</button>
            </div>
        </div>
     </div>  
    </>
}