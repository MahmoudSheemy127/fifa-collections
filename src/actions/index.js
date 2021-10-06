export const FetchedListInProgress = () => {
    return{type:"FetchedListInProgress"}
}

export const FetchedListSuccesfull = (FutDBList) => {
    return{type:"FetchedListSuccessful",payload:FutDBList}
}

export const FetchedListFailed = (err) => {
    return{type:"FetchedListFailed",payload:err}
}

export const IncrementCounter = () => {
    return {type:"IncrementCounter"}
}

export const ResetCounter = () => {
    return {type:"ResetCounter"}
}

export const constructPlayerCard = (data) => {
    return {type:"construct",payload:data}
}

export const FetchAllData = (dispatch,getState) => {
    // const data = require('../data.json');
    // console.log(data);
    dispatch(ResetCounter());
    dispatch(FetchedListInProgress());
    dispatch(ClearCardList());
    const url = new URL("https://enigmatic-harbor-49145.herokuapp.com/https://futdb.app/api/players");
    const key = "38078f25-8213-4907-9dee-f0a3e5d3791d";
    var params = {page:Math.floor(Math.random() * 200), limit:5};
    url.search = new URLSearchParams(params).toString();
    fetch(url,{
        method:"GET",
        withCredentials: true,
        headers:{
            "X-Auth-Token":key,
            "Content-Type": "application/json"
        }
    }).then((res) => res.json()).then((data) => {
        console.log(data);
        dispatch(FetchedListSuccesfull(data.items))}).
    then(() => dispatch(CreateCardList))
    .catch((err) => {
        console.log(err);
        dispatch(FetchedListFailed(err));
    });
}

const CreateCardList = (dispatch,getState) => {
    // const {}
    const {FutDBList} = getState();
    console.log("List Recieved frum full fetch: ");
    console.log(FutDBList);
    var counter = 0;
    FutDBList.map(async (player) => {
        const firstName = player.name.split(" ")[0];
        const secondName = player.name.split(" ")[1] ? ("%20"+player.name.split(" ")[1]) : "";
        fetch(`https://www.thesportsdb.com/api/v1/json/1/searchplayers.php?p=${firstName+secondName}`).
        then((res) => res.json()).
        then(async (data) => {
            console.log(player.name.split(" ")[0] + " " + player.name.split(" ")[1])
            var PlayerCard = {}
            try {
                PlayerCard = {
                    id:player.id,
                    name: secondName ? player.name.split(" ")[1] : firstName,
                    image: data.player[0].strCutout,
                    rating: player.rating,
                    position: player.position,
                    pace: player.pace,
                    shooting: player.shooting,
                    passing: player.passing,
                    dribbling: player.dribbling,
                    physicality: player.physicality,
                    defending: player.defending,
                    club: data.player[0].strTeam,
                    country: data.player[0].strNationality,
                }
            }
            catch(err){
                console.log("Err "+ err);
                PlayerCard = {
                    id:player.id,
                    name: secondName ? player.name.split(" ")[1] : firstName,
                    image: "",
                    rating: player.rating,
                    position: player.position,
                    pace: player.pace,
                    shooting: player.shooting,
                    passing: player.passing,
                    dribbling: player.dribbling,
                    physicality: player.physicality,
                    defending: player.defending,
                    club: "_",
                    country: "",
                }
            }
            return PlayerCard;
            // dispatch(PushCardItem(PslayerCard))
        }).then(async (data) => {
            // console.log(data);
            const club = data.club;
            if(club[0] === '_')
            {
                console.log("Here");
                data = {...data,clubIcon:""}
                return data;
            }
            else
            {
                const response = await fetch(`https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${club.split(" ")[0]}%20${club.split(" ")[1]}`)
                const clubData = await response.json();
                // console.log(clubData);
                data = {...data,clubIcon:clubData.teams[0].strTeamBadge}
                return data;
            }
        }).then(async (data) => {
            const country = data.country;
            if(country)
            {
                // const url = new URL("https://enigmatic-harbor-49145.herokuapp.com/https://futdb.app/api/players");
                // var params = {country};
                // url.search = new URLSearchParams(params).toString();
                const response2 = await fetch(`https://nameless-plains-99610.herokuapp.com/code?country=${country}`);
                const countryCode = await response2.text();
                const nationalflag = `https://www.countryflags.io/${countryCode}/flat/64.png`
                data = {...data,flag:nationalflag}
            }
            else
            {
                data = {...data,flag:""}
            }
            // console.log("Finaaal: ");
            // console.log(data);
            dispatch(PushCardItem(data));
        }).
        catch(err => console.log(err))
    })
}

export const ClearCardList = () => {
    return {type:"ClearList"}
}

export const PushCardItem = (data) => {
    return {type:"PushItem",payload:data}
}

export const AddToFav = (data) => {
    return {type:"AddToFav",payload:data}
}

export const removeItem = (data) => {
        return {type:'removeItem',payload:data}
}
