import React,{useState} from 'react'
import Fifacard from './fifacard'
import { Link } from 'react-router-dom';
import { TextField, Autocomplete, Box, Button } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import {countries} from '../country'
// import ht from 'html2canvas'
import html2canvas from 'html2canvas';
// import { Autocomplete, TextField } from '@mui/material';
const Form = () => {
    const [PlayerObject,setPlayerObject] = useState({name:"",rating:0,position:"",country:"",club:"",flag:"",clubIcon:"",image:"",pace:0,shooting:0,passing:0,dribbling:0,defending:0,physicality:0,id:0});
    const clubs = require('../clubs.json');    
    const positions = ['CB','RB','LB','RW','LW','LM','RM','CM','AM','CAM','CDM','CF','RF','LF']
    const getClubIcon = async (data) => {
            if(data)
            {
                const team = data.label
                const teamSecondName = (data.label.split(" ")[1] === "FC") ? "" : data.label.split(" ")[1];
                const response = await fetch(`https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${team.split(" ")[0]}%20${teamSecondName}`)
                const teamData = await response.json();
                setPlayerObject({...PlayerObject,club:team,clubIcon:teamData.teams[0].strTeamBadge})               
            }
    }
    const Uploadimage = () => {
        var fileElem = document.getElementById("inputFile");
        fileElem.click();
    }
    const EnterInput = (e) => {
        console.log(e.target.files[0]);
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.addEventListener("load",(e) => {
            console.log(e.srcElement.result);
            setPlayerObject({...PlayerObject,image: e.srcElement.result});
        })
        reader.readAsDataURL(file);
    }
    const download = () => {
        html2canvas(document.querySelector(".newCard")).then(canvas => {
            console.log("Hello");
            // const form = document.querySelector(".formInterface");
            // form.appendChild(canvas);
            // window.open('',canvas.toDataURL("image/png",0.9));
            var link = canvas.toDataURL("image/jpg",0.9);
            var newTab = window.open();
            newTab.document.body.innerHTML = `<img src=${link} >`;

            // var win = window.open()
            // win.document.write("<iframe"+link+"><\iframe>")
            // win.document.write("<iframe+ _base64Url + '"><\/iframe>");
            // if(window.navigator.msSaveBlob)
            // {
            //     window.navigator.msSaveBlob(canvas.msToBlob(),"canvas-image.png");
            // }
            // else
            // {
                // const a = document.createElement('a');
                // a.donwload = "card-image.png";
                // a.href= canvas.toDataURL("image/png",0.9)
                // a.click();
            // }
        })
    }
    const saveCard = async () => {
        //push card to Server
        setPlayerObject({...PlayerObject,id:Math.floor(Math.random() * 2500)})
        console.log(PlayerObject.id);        
        await fetch("https://nameless-plains-99610.herokuapp.com/record/save",{
            method:'POST',
            credentials: 'same-origin',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(PlayerObject)
        }).then((res) => console.log(res.text())).catch((err) => console.log("err"))

    }
    console.log(countries);
    return (
        <div className="formInterface">
            <div>Custom Card Create</div>
            {/* <div id="ahmed" style={{background:'red'}}>
                <p>
                 Heey
                </p>
            </div> */}
            <Fifacard id="card" {...PlayerObject} />
            <div className="Form">
                <div className="sections">
                    <div className="Section">
                        {/* <label>Name </label> */}
                        <TextField className="inputSection" style={{background:'oldlace'}} id="outlined-basic" value={PlayerObject.name} onChange={(e) => setPlayerObject({...PlayerObject,name:e.target.value})} label="Name" variant="outlined" />
                        {/* <input /> */}
                        <Autocomplete
                            className="inputSection"
                            disablePortal
                            id="combo-box-demo"
                            onChange={(event,newValue) => {
                                getClubIcon(newValue);
                            }}
                            options={clubs}
                            renderInput={(params) => <TextField {...params} label="Club" />}
                        />
                        <TextField
                        id="outlined-number"
                        className="inputSection"
                        label="Overall"
                        type="number"
                        value={PlayerObject.rating}
                        onChange={(e) => setPlayerObject({...PlayerObject,rating:e.target.value})}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        />
                        <TextField
                        className="inputSection"
                        id="outlined-number"
                        label="Shooting"
                        value={PlayerObject.shooting}
                        onChange={(e) => setPlayerObject({...PlayerObject,shooting:e.target.value})}
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        />
                        <TextField
                        className="inputSection"
                        id="outlined-number"
                        label="Passing"
                        value={PlayerObject.passing}
                        onChange={(e) => setPlayerObject({...PlayerObject,passing:e.target.value})}
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        />
                    </div>
                    <div className="Section">
                        <Autocomplete
                        className="inputSection"
                        id="country-select-demo"
                        options = {countries}
                        autoHighlight
                        onChange={(event,newValue) => {
                            if(newValue)
                            {
                                setPlayerObject({...PlayerObject,country:newValue.label,flag: `https://www.countryflags.io/${newValue.code}/flat/64.png`})
                            }
                            else
                            {
                                setPlayerObject({...PlayerObject, country:"", flag:""})
                            }
                        }}
                        getOptionLabel={(option) => option.label}
                        renderOption={(props,option) => (
                            <Box component="li" sx={{'& > img': { mr: 2, flexShrink: 0 } }} {...props} >
                                <img
                                loading="lazy"
                                width="20"
                                src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                                srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                                alt=""                                />
                                {option.label} ({option.code}) 
                            </Box>
                        )}
                        renderInput={(params) => (
                            <TextField 
                            {...params}
                            label="Choose a country"
                            inputProps={{
                                ...params.inputProps,
                                autoComplete: 'new-password'
                            }}
                            />
                        )}
                        />
                        <Autocomplete
                        className="inputSection"
                        options={positions}
                        autoHighlight
                        onChange = {(event,newValue) =>{
                          setPlayerObject({...PlayerObject,position:newValue});  
                        }}
                        renderInput = {(params) => <TextField {...params} label="Position" /> }
                        />
                        <TextField
                        className="inputSection"
                        id="outlined-number"
                        label="Pace"
                        value={PlayerObject.pace}
                        onChange={(e) => setPlayerObject({...PlayerObject,pace:e.target.value})}
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        />
                        <TextField
                        className="inputSection"
                        id="outlined-number"
                        label="Defending"
                        type="number"
                        value={PlayerObject.defending}
                        onChange={(e) => setPlayerObject({...PlayerObject,defending:e.target.value})}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        />
                        <TextField
                        className="inputSection"
                        id="outlined-number"
                        label="Physical"
                        type="number"
                        value={PlayerObject.physicality}
                        onChange={(e) => setPlayerObject({...PlayerObject,physicality:e.target.value})}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        />
                    </div>
                </div>
                        <TextField
                        className="inputSection"
                        id="outlined-number"
                        label="Dribbling"
                        type="number"
                        value={PlayerObject.dribbling}
                        onChange={(e) => setPlayerObject({...PlayerObject,dribbling:e.target.value})}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        />
                    <input type="file" onChange={EnterInput} hidden id="inputFile" />
                    <Button onClick={Uploadimage} id="fileButton" variant="contained">
                        <ImageIcon />
                        Insert Image
                    </Button>
            </div>
            <Link to="/">
                <Button>
                        Back
                </Button>
                {/* <button to="/">Back</button> */}
            </Link>
            <Button onClick={saveCard}>Save Card</Button>
            <Button onClick={download}>Download Card</Button>
            
            
        </div>
    )
}

export default Form
