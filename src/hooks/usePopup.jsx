import React from "react";
import '../css/Popup.css'

function Popup(props) {

    const handleClose = (e) => {
        e.preventDefault()
        props.setTrigger(false)
        props.cleardata()
    }

    return (props.trigger) ? (
        <div className="popup">
            <div className="popupinner">
                <button className="closepopupbtn" onClick={handleClose}>Close</button>
                { props.children }
            </div>
        </div>
    ) : null;
}

export default Popup