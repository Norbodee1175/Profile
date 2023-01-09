import React from "react";
import '../css/Popup.css'

function PopupLarge(props) {

    const handleClose = (e) => {
        e.preventDefault()
        props.setTrigger(false)
        props.cleardata()
    }

    return (props.trigger) ? (
        <div className="popup">
            <div className="popuplarge">
                <button className="closepopupbtn" onClick={handleClose}>Close</button>
                {/* <button className="closepopupbtn" onClick={() => props.setTrigger(false)}>Close</button> */}
                { props.children }
            </div>
        </div>
    ) : null;
}

export default PopupLarge