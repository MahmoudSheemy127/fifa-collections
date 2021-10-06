import React,{useState,useEffect} from 'react'
import Card from './Card';
import Fifacard from './fifacard';
import { useDispatch, useSelector } from 'react-redux';
import { FetchAllData, IncrementCounter, AddToFav} from '../actions';
import { Link } from 'react-router-dom';
const RandomGenerate = () => {
    console.log("Rerender");
    const {CardList,Counter, Loading} = useSelector((state) => state);
    const dispatch = useDispatch();
    const Random = () => {
        if(Counter >= CardList.length - 1)
        {
            dispatch(FetchAllData)
        }
        else
        {
            dispatch(IncrementCounter())
        }
    }
    // const saveRecord = (rec) => {
    //     //Save Record to mongo
    //     fetch("http://localhost:5000/record/add",{
    //         method: 'POST',
    //         credentials: 'same-origin',
    //         headers:{
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(rec)
    //     }).then((res) => console.log(res.text())).catch((err) => console.log("Error posting: "+ err))
    // }
    const saveCard = async () => {
        //push card to Server
        await fetch("https://nameless-plains-99610.herokuapp.com/record/save",{
            method:'POST',
            credentials: 'same-origin',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(CardList[Counter])
        }).then((res) => console.log(res.text())).catch((err) => console.log("err"))

    }

    useEffect(() => {
        dispatch(FetchAllData)
    },[])
    return (
        <div className="container">
            {/* <div>{playersData[0].name}</div> */}
           {Loading ? <div>Loading</div> : <Fifacard {...CardList[Counter]}></Fifacard>}
            <div class="Buttons">
           <button onClick={Random}>New Card</button> 
           <button onClick={saveCard}>Add to Fav</button> 
           <Link to="/">
                <button style={{width:"100%"}}>Back</button>            
           </Link>
           </div>
        </div>
    )
}

export default RandomGenerate
