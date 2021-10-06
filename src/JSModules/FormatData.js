import { ExtraData } from './ExtraData';
import { useFetch } from './useFetch';

export const FormatData = async () => {
    const playersData1 = await useFetch({type:1,page:5});
    //console.log(playersData1);
    var players = []
    for (let i = 0; i < playersData1.length; i++) {
        var playerData = {};
        const playerExtraData = await ExtraData(playersData1[i]);
        playerData = {
            name: playersData1[i].name.split(" ")[1],
            image: playerExtraData.player[0].strCutout || "https://freepikpsd.com/media/2019/10/default-user-profile-image-png-6-Transparent-Images.png",
            rating: playersData1[i].rating,
            position: playersData1[i].position,
            pace: playersData1[i].pace,
            shooting: playersData1[i].shooting,
            passing: playersData1[i].passing,
            dribbling: playersData1[i].dribbling,
            physicality: playersData1[i].physicality,
            defending: playersData1[i].defending,
            club: playerExtraData.player[0].strTeam,
            country: playerExtraData.player[0].strTeam2
        }
        players.push(playerData);        
    }
    // players = playersData1.map(async (player) => {
    //     var playerData = {};
    //     const playerExtraData = await ExtraData(player);
    //     return playerData = {
    //         name: player.name.split(" ")[1],
    //         image: playerExtraData.player[0].strCutout || "https://freepikpsd.com/media/2019/10/default-user-profile-image-png-6-Transparent-Images.png",
    //         rating: player.rating,
    //         position: player.position,
    //         pace: player.pace,
    //         shooting: player.shooting,
    //         passing: player.passing,
    //         dribbling: player.dribbling,
    //         physicality: player.physicality,
    //         defending: player.defending,
    //         club: playerExtraData.player[0].strTeam,
    //         country: playerExtraData.player[0].strTeam2
    //     }
    //     // players.push(playerData);
    // });
    console.log("Here from extract: "+ players);
    return players;  

}
