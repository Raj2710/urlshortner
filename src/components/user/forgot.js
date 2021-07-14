import "../../styles/forgot.css";
import { useState } from "react";
import axios from "axios";
import Loading from "../loading";
export default function Forgot(){
    let [loading,setLoading]=useState(false);
    let [email,setEmail]=useState("");
    let [res,setRes]=useState("");
    let handleEvent =async()=>{
        setRes("");
        setLoading(true);
        await axios.post("https://urlshortnerbe.herokuapp.com/users/reset-password",{
            email:email
        })
        .then((response)=>{
            setLoading(false);
            setRes(response.data.message);
        })
        .catch(error=>console.log(error))
    }
    return <>
    <div className="wrapper">
        <div className="forgot-wrapper">
            <h3>FORGOT YOUR PASSWORD?</h3>
            <p>Just enter the email or username you signed up with and we'll let you reset it.</p>
            <label>Email address or username</label><br/>
            <input type="text" onChange={(e)=>setEmail(e.target.value)}></input><br/>
            <button className="login" onClick={handleEvent}>Reset</button>
            <div> {loading?<Loading/>:<></>} </div>
        <div style={{color:"green"}}>{res}</div>
        </div>
    </div>
    </>
}