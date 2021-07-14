import "../App.css";
import axios from "axios";
import { useState,useEffect } from "react";
import Sidebar from "./dashboard/sidebar";
import Topbar from "./dashboard/topbar";
import Mainview from "./dashboard/mainview";
import CreatePopup from "./dashboard/popup";
export default function Dashboard(props){
    let [email,setEmail]=useState("");
    let [createVisibility,setCreateVisibility]=useState(false);
    useEffect(()=>{
        async function Auth(){
            if(props.location.state){
                setEmail(props.location.state.email);
                localStorage.setItem('userData',JSON.stringify({email:props.location.state.email,token:props.location.state.token}));
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
                let userData = JSON.parse(localStorage.getItem('userData'));
                setEmail(userData.email);
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
    },[props.location.state,props.history,email])
    return<>
        <Topbar email={email} setVisibility={setCreateVisibility}/>
        {createVisibility?<CreatePopup trigger="true" setVisibility={setCreateVisibility}/>:""}
        <div className="main-wrapper">
            <Sidebar/>
            <Mainview/>
        </div>
    </>
}
