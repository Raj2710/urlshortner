import "../App.css";
import axios from "axios";
import { useState,useEffect } from "react";
import Sidebar from "./dashboard/sidebar";
import Topbar from "./dashboard/topbar";
import CreatePopup from "./dashboard/popup";
export default function Dashboard(props){
    let [userData,setUserData]=useState({});
    let [createVisibility,setCreateVisibility]=useState(false);
    let[reload,setReload]=useState(false);
    useEffect(()=>{
        async function setData(){
            await setUserData(JSON.parse(localStorage.getItem('userData')));
        }
        async function Auth(){
            if(localStorage.getItem('userData')){
                let userDetails = JSON.parse(localStorage.getItem('userData'));
                await axios.post("https://urlshortnerbe.herokuapp.com/users/authenticate",{
                token:userDetails.token
            })
            .then(async(response)=>{
                //console.log(response.data.auth);
                if(!response.data.auth){
                    alert("Session Expired Login Again?");
                    props.history.push("/user/login")
                }
            })
            .catch(error=>console.log("Hi",error))
            }
            else{
                alert("Session Expired Login Again?");
                props.history.push("/user/login");
            }
        }
        setData();
        Auth();
    },[props.history])
    return <>
        <Topbar email={userData.email} firstname={userData.firstname} setVisibility={setCreateVisibility}/>
        {createVisibility?<CreatePopup trigger="true" email={userData.email} setVisibility={setCreateVisibility} setReload={setReload}/>:""}
        <Sidebar email={userData.email} reload={reload} setReload={setReload}/>
        </>
}