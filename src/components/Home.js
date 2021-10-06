import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import Random  from '../assets/Random.png'
import { useSelector,useDispatch } from 'react-redux'
import { IncrementCounter, ResetCounter, FetchAllData } from '../actions'
import store from '..'
import Fifacard from './fifacard'
import hello from '../assets/hello.png'
import github from '../assets/github.svg'

const Home = () => {
    const counter = useSelector((state) => state.Counter)  
    const dispatch = useDispatch();
    const [countryName,setCountryName] = useState("");
    const [countryCode,setCountryCode] = useState("");

    const country = "United States";
    const getCode = () => {
        fetch(`http://localhost:5000/code?country=${countryName}`,{
            method:'GET',
        }).then((res) => res.text()).then((data) => setCountryCode(data)).catch((err) => console.log("Err: "+err));
    }
    const club = "https://sportteamslogo.com/api?key=f91e29b0ee914b1a94e4b4d8e56fc88c&size=big&tid=2677"

    const flag = "https://www.countryflags.io/US/flat/64.png"
    return (
        <div className="HomePage">
            <div className="title">
                <h2>My Fifa Collections</h2>
            </div>
            <div className="description">
                <div>Welcome to fifa card collections. A simple web app where you can auto generate random players and add them to your squad
as well as create your own custom card</div>
                <img src={hello}></img>
                <div>Enjoy!</div>
            </div>
            <h3>Collect your team</h3>
            <div className="Images">
               <div className="wrapper">
                    <div className="CardHome" id="one">
                            <img src={"https://www.thesportsdb.com/images/media/player/cutout/v298851606327825.png"} />
                    </div> 
                    <h3>Legends</h3>
               </div>
               <div className="wrapper">
                    <div className="CardHome" id="two">
                        <img src={"https://www.thesportsdb.com/images/media/player/cutout/b6nlsl1631448462.png"} />
                    </div> 
                    <h3>Active Players</h3>
               </div>
                <div className="wrapper">
                    <div className="CardHome" id="three">
                        <img src={Random} />
                    </div>
                    <h3>Custom Made</h3>
                </div>
            </div>
            <div className="Buttons">
                <Link to="/Generate">
                    <button>Random Card</button>                
                </Link>
                <Link to="/Form">
                    <button>Custom Card</button>                
                </Link>
                <Link to="/List">
                    <button>My Team</button>                
                </Link>
            </div>
            <div className="description">
                <div>This simple project is a basic application for the use of (MongoDB, Reactjs, Expressjs and NodeJs) MERN stack </div>
                <div>You are more than welcome to contribute to my Github public <a href="" style={{color:'white'}}>repo</a></div>
            </div>

            {/* <Fifacard /> */}
            {/* <div>Image</div>
            <Link to="/Generate">
                <button style={{width:"100%"}}>Generate Card</button>
            </Link>
            <button>Custom Card</button>
            <Link to="/List">
                <button style={{width:"100%"}}>My List</button>            
            </Link>
            <img src={flag}></img>
            <img src={club}></img>
            <input 
            type="text"
            value={countryName}
            onChange={(e) => {setCountryName(e.target.value)}}
            ></input>
            <button onClick={getCode}>Get Country Flag</button>
            <img src={`https://www.countryflags.io/${countryCode}/flat/64.png`}></img> */}
            {/* <div>{counter}</div>
            <button onClick={() => dispatch(IncrementCounter())}>increment</button>
            <button onClick={() => dispatch(ResetCounter())}>Reset Counter</button>
            <button onClick={() => dispatch(FetchAllData)}>Fetch Test</button>         */}
        </div>
    )
    
}

export default Home
