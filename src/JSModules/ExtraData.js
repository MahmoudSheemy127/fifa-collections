import React from 'react'
import { useFetch } from './useFetch';

export const ExtraData = async (player) => {
    // console.log(player.first_name);
    const params = {firstName:player.name.split(" ")[0],lastName:player.name.split(" ")[1],url:"https://www.thesportsdb.com/api/v1/json/1/searchplayers.php?p=",type:2}
    const playerExtraData = await useFetch(params);
    //console.log("Player Extra Data: "+ playerExtraData.player[0].strPlayer);
    // console.log("After Fetch");
    return playerExtraData;
}
