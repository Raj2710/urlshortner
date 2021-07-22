import "../../styles/sidebar.css";
import "../../styles/mainview.css";
import Mainview from "./mainview"
import {useEffect, useState} from "react";
import axios from "axios";
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
    },[userData]);
    return<>
    <div className="main-wrapper">
      <div className="sidebar-wrapper">
        <span>{data.length} Resluts</span>
        <span>Clicks all time</span>
          {
            data.map((e,i)=>{
                let date = new Date(e.time).toDateString();
              return <div key={i} className="side-card-wrapper" onClick={()=>setLink(e)}>
                  <div className="card-time">{date}</div>
                  <div className="card-title">{e.title}</div>
                  <div className="third-row-wrapper">
                    <div className="card-shorturl"><a href={`https://urlshortnerbe.herokuapp.com/${e.shorturl}`} className="side-link" target="_blank" rel="noreferrer">{e.shorturl}</a></div>
                    <div className="card-clicks">{e.clicks}</div>
                  </div>
              </div>
            })
          }
      </div>
      <div className="mainview-wrapper">
        <Mainview link={link}/>
      </div>
    </div>
    </>
}