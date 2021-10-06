import React from 'react'
import moh from "../assets/icon.png"
import def from "../assets/default.png"
import flag from "../assets/Flag.png"

const Fifacard = (props) => {
    
    return (
        <div className="newCard">
            <div className="Summarypart">
                <div className="overviewData">
                    <h2 id="rating">{props.rating}</h2>
                    <h2>{props.position}</h2>
                    <img id="flag" src={props.flag || flag} />
                    <img id="club" src={props.clubIcon || moh} />
                </div>
                <div className="Image">
                    <img id="cutout" src={props.image || def} />
                </div>
            </div>
            <div className="playerName">
                <h2>{props.name}</h2>
            </div>
            <div className="ratings">
                <div class="left">
                    <p>{props.pace} PAC</p>
                    <p>{props.shooting} SHO</p>
                    <p>{props.passing} PAS</p>
                </div>
                <div class="right">
                    <p>{props.dribbling} DRI</p>
                    <p> {props.defending} DEF</p>
                    <p>{props.physicality} PHY</p>
                </div>
            </div>
        </div>
    )
}

export default Fifacard
