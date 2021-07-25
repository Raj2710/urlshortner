import {Link} from "react-router-dom";
import urllogo from "../components/dashboard/urllogo.png"
import "../App.css";
export default function Home(){
    return <>
        <div className="top-wrapper">
        <div className="top-left-wrapper">
            <img className="logo" src={urllogo} alt="URL Shortner logo"></img>
            <p className="brandname">URL Shortner</p>
        </div>
        <div className="top-right-wrapper">
            <div className="top-right-elements">
                <Link to="/user/login"><button className="create-button" style={{color:"white"}}>Login</button></Link>
                <Link to="/user/register"><button className="create-button" style={{color:"white"}}>Sign Up</button></Link>
            </div>
        </div>
     </div>  
        <div style={{textAlign:"center"}}>
            <h1>Short Links, big results</h1>
            <img src="https://miro.medium.com/max/566/1*j3xVt5zsYuAB19-QATkk_w.png" alt="URL shortner" className="homeimage"></img>
            <br></br>
            <h4>A URL shortener built with powerful tools to help you grow and protect your brand.</h4>
            <Link to="/user/register"><button className="create-button" style={{color:"white"}}>Create Free Account Now!</button></Link>
        </div>
    </>
}