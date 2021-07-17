import "../App.css";
import axios from "axios";
import { useState,useEffect } from "react";
import Sidebar from "./dashboard/sidebar";
import Topbar from "./dashboard/topbar";
import CreatePopup from "./dashboard/popup"; 
export default function Dashboard(props){
    let userData;
    let [createVisibility,setCreateVisibility]=useState(false);
    useEffect(()=>{
        async function Auth(){
            if(props.location.state){
                localStorage.setItem('userData',JSON.stringify({email:props.location.state.email,token:props.location.state.token,firstname:props.location.state.firstname}));
                await axios.post("https://urlshortnerbe.herokuapp.com/users/authenticate",{
                token:props.location.state.token
            })
            .then(async(response)=>{
                //console.log(response.data.auth);
                if(!response.data.auth){
                    alert("Session Expired Login Again?");
                    props.history.push("/user/login")
                }
            })
            .catch(error=>console.log(error))
            }
            else if(localStorage.getItem('userData')){
                userData = JSON.parse(localStorage.getItem('userData'));
                await axios.post("https://urlshortnerbe.herokuapp.com/users/authenticate",{
                token:userData.token
            })
            .then(async(response)=>{
                console.log(response.data.auth);
                if(!response.data.auth){
                    alert("Session Expired Login Again?");
                    props.history.push("/user/login")
                }
            })
            .catch(error=>console.log(error))
            }
            else{
                alert("Session Expired Login Again?");
                props.history.push("/user/login");
            }
        }
        Auth();
    },[])
    return<>
        <Topbar email={props.location.state.email?props.location.state.email:userData.email} firstname={props.location.state.firstname?props.location.state.firstname:userData.firstname} setVisibility={setCreateVisibility}/>
        {createVisibility?<CreatePopup trigger="true" email={props.location.state.email?props.location.state.email:userData.email} setVisibility={setCreateVisibility}/>:""}
        <div className="main-wrapper">
            <Sidebar email={props.location.state.email?props.location.state.email:userData.email}/>
        </div>
    </>
}