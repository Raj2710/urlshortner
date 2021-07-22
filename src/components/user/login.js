import "../../styles/login.css"
import {Link} from "react-router-dom";
import { useState,useEffect} from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Loading from "../loading";
export default function Login(props){
    let history = useHistory();
    let [loading,setLoading]=useState(false);
    let [email,setEmail]=useState("");
    let [pwd,setPwd]=useState("");
    let [show,setShow]=useState(true);
    let [res,setRes]=useState("");
    let [ins,setIns]=useState("");
    useEffect(()=>{
        let loginStatus = async()=>{
            if(localStorage.getItem('userData')){
                let userDetails = JSON.parse(localStorage.getItem('userData'));
                    await axios.post("https://urlshortnerbe.herokuapp.com/users/authenticate",{
                    token:userDetails.token
                })
                .then(async(response)=>{
                    console.log(response.data.auth);
                    if(response.data.auth){
                        history.push("/dashboard")
                    }
                })
                .catch(error=>console.log(error))
            }
        }
        loginStatus();
    },[history])
    let handleEvent = async()=>{
        setRes("");
        setLoading(true);
        //console.log(email,pwd);
        if(email && pwd){
            await axios.post("https://urlshortnerbe.herokuapp.com/users/login",{
            email:email,
            password:pwd
        })
        .then(async(response)=>{
            await setRes(response.data.message);
            await setIns(response.data.instruction);
            setTimeout(() => {
                localStorage.setItem('userData',JSON.stringify({email:email,token:response.data.token,firstname:response.data.firstname}));
                let url ="/dashboard";
                if(response.data.token){
                    props.history.push({ 
                        pathname: url,
                        state: {
                            email:email,
                            firstname:response.data.firstname,
                            token:response.data.token
                        }
                       });
                }
              }, 1000);
              setLoading(false);
        }).catch((error)=>{
            console.log(error);
        })
        }
        else{
            setRes("Fields can not be empty")
        }
    }
    return <>
        <div className="login-wrapper">
            <h1>Log in and start sharing</h1>
            <h4>Don't have an account? <Link to="/user/register"  className="link">Sign up</Link></h4>
            <div className="form-wrapper">
                <label>Email address or username</label><br/>
                <input type="email" onChange={(e)=>setEmail(e.target.value)} required={true}></input><br/>
                <div className="pass-wrapper">
                    <label className="pass">Password </label>
                    <button className="showhide" onClick={()=>setShow(!show)}><i className="fas fa-eye"></i> Show</button>
                </div><br/>
                <input type={show?"password":"text"} onChange={(e)=>setPwd(e.target.value)} required={true}></input><br/>
                <Link to="/user/forgot-password" className="link">Forgot your password?</Link><br/>
                <button className="login" onClick={handleEvent}>Login</button>
                <div> {loading?<Loading/>:<></>} </div>
                <div style={{color:"green"}}>{res} {ins}</div>
            </div>
        </div>
    </>
}