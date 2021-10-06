import React,{useEffect, useState} from 'react'
import { useSelector} from 'react-redux'
import Card from './Card'
import Fifacard from './fifacard'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {removeItem} from '../actions/index'
import { Button } from '@mui/material'

const MyList = () => {
    // const {FavList} = useSelector((state) => state)
    const [FavList,setFavList] = useState([]);
    const dispatch = useDispatch();    
    const removeitem = async (id) => {
        await fetch(`https://nameless-plains-99610.herokuapp.com/record/remove?id=${id}`).then((res) => res.json()).then((data) => {
             setFavList(data) 
            }).catch((err) => console.log(err));
    }
    const fetchFavPlayers = () => {
        fetch("https://nameless-plains-99610.herokuapp.com/record/get").then((res) => res.json()).then((data) => setFavList(data)).catch((err) => console.log(err))
    }
    useEffect(() => {
        fetchFavPlayers();
    },[])
    console.log(FavList);
    return (
        <div class="list">
        <h3>My Favourite Pick up</h3>
        <div className="Grid">
            {FavList.map((item) => {
                return ( 
                <div className="cardList">
                    <Fifacard key={item.id}  {...item} />
                    <Button onClick={() => removeitem(item.id)}>Remove from team</Button> 
                </div>
                )
            })}
        </div>
        <Link to="/">
            <button>Back</button>
        </Link>

        </div>
    )
}

export default MyList
