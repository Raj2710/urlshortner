import "../../styles/sidebar.css";
import "../../styles/mainview.css";
import Mainview from "./mainview"
import {useEffect, useState} from "react";
import axios from "axios";
import Loading from "../loading";
export default function Sidebar(props){
    let [data,setData]=useState([]);
    let [userData]=useState(JSON.parse(localStorage.getItem('userData')))
    let [link,setLink]=useState({});
    useEffect(()=>{
      async function getAllData()
      {
          await axios.get(`https://urlshortnerbe.herokuapp.com/getall/${userData.email}`)
          .then((res)=>setData(res.data))
          .catch((error)=>console.log(error))
      }
      if(userData)
        getAllData();
    },[userData,props.reload]);
    return<>
    <div className="main-wrapper">
      <div className="sidebar-wrapper">
        <div className="side-titlebar">  
          <span>{data.length} Resluts</span>
          <span>Clicks all time</span>
        </div>
          {
            data[0]?data.map((e,i)=>{
                let date = new Date(e.time).toDateString();
              return <div key={i} className="side-card-wrapper" onClick={()=>setLink(e)}>
                  <div className="card-time">{date}</div>
                  <div className="card-title title">{e.title}</div>
                  <div className="third-row-wrapper">
                    <div className="card-shorturl"><a href={`https://urlshortnerbe.herokuapp.com/${e.shorturl}`} className="side-link" target="_blank" rel="noreferrer">{e.shorturl}</a></div>
                    <div className="card-clicks">{e.clicks} <i className="fas fa-mouse fa-xl clicks"></i></div>
                  </div>
              </div>
            }):<div className="loader"><Loading/></div>
          }
      </div>
      <div className="mainview-wrapper">
        <Mainview link={link}/>
      </div>
    </div>
    </>
}