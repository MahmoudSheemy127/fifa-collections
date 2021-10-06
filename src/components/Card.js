import React from 'react'
import moh from "../assets/icon.png"
const Card = (props) => {
    // console.log("Hey: "+name);
    return (
        // <div>Hello</div>
        <div className="card">
            <section className="One">
               <div className="summary">
                   <h1>{props.rating}</h1>
                   <p>{props.position}</p>
                   <img src={props.flag} />
                   <img src={props.clubIcon || moh} />
               </div> 
                <div className="frame">
                    <img src={props.image || "https://freepikpsd.com/media/2019/10/default-user-profile-image-png-6-Transparent-Images.png"}></img>
                </div>
            </section>
            <section className="Two">
                <h3>{props.name}</h3>
            </section>
            <section className="Three">
                <div className="rating1">
                    <p>{props.pace} PAC</p>
                    <p>{props.shooting} SHO</p>
                    <p>{props.passing} PAS</p>
                </div>
                <div className="rating2">
                    <p>{props.dribbling} DRI</p>
                    <p>{props.defending} DEF</p>
                    <p>{props.physicality} PHY</p>
                </div>
            </section>
        </div>
    )
}

export default Card
