import { useNavigate } from "react-router-dom";
import '../css/Unauthorized.css'

export const Unauthorized = () => {
    const navigate = useNavigate();

    const goback = () => navigate(-1);

    return (
        <section>
            <div className="unauthorized">
                <h1>Unauthorized</h1>
                <br/>
                <p>You do not have access to the requested page.</p>
                <button className="gobackbtn" onClick={goback}>Go Back</button>
            </div>
        </section>
    )
}