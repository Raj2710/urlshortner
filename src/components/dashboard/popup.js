import "../../App.css"
export default function CreatePopup(props){
    return (props.trigger)?<>
        <div className="create-popup-wrapper">
            <div className="popup-elements">
                <h3 style={{color:"white"}}>Enter long URL:</h3>
                <input type="text" className="create-input"></input>
                <button className="short-url">Short</button>
            </div>
            <i className="far fa-window-close fa-2x" id="close-button" onClick={()=>props.setVisibility(false)}></i>
        </div>
    </>:"";
}