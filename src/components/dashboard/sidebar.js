import "../../styles/sidebar.css";
import Mainview from "./mainview"
import {useEffect, useState} from "react";
import axios from "axios";
export default function Sidebar(props){
    let [data,setData]=useState([]);
    useEffect(()=>{
      async function getAllData(){
        await axios.get(`https://urlshortnerbe.herokuapp.com/getall/${props.email}`)
        .then((res)=>setData(res.data))
        .catch((error)=>console.log(error))
       }
        getAllData();
    },[]);
    
    return<>
    <div className="main-body-wrapper">
      <div className="sidebar-wrapper">
          {
            data.map((e,i)=>{
                let date = new Date(e.time).toDateString();
              return <div key={i} className="side-card-wrapper">
                  <div className="card-time">{date}</div>
                  <div className="card-title">{e.title}</div>
                  <div className="third-row-wrapper">
                    <div className="card-shorturl">{e.shorturl}</div>
                    <div className="card-clicks">{e.clicks}</div>
                  </div>
              </div>
            })
          }
      </div>
      <Mainview/>
    </div>
    </>
}