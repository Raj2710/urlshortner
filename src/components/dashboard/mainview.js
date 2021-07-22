import "../../styles/mainview.css"
import axios from "axios";
export default function Mainview(props){
  let handleDelete = async(link)=>{
      axios.delete(`https://urlshortnerbe.herokuapp.com/delete/${link}`)
      .then((res)=>{
        console.log(res.data.message);
        window.location.reload();
      })
      .then((error)=>console.log(error));
  }
    return<>
      <div className="">
        {!props.link.shorturl?<p>No link selected</p>:<>
        <div>{props.link.time}</div>
        <div>{props.link.title}</div>
        <div>{props.link.longurl}</div>
        <div>{props.link.shorturl}</div>
        <button onClick={()=>{navigator.clipboard.writeText(`https://urlshortnerbe.herokuapp.com/${props.link.shorturl}`)}}>Copy</button>
        <button onClick={()=>handleDelete(props.link.shorturl)}>Delete</button>
        <div>{props.link.clicks}</div>
        </>}
     </div>  
    </>
}