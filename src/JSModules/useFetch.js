export const useFetch = async (props) => {
    if(props.type == 1)
    {
        const page = props.page;
        // const url = new URL("https://enigmatic-harbor-49145.herokuapp.com/https://futdb.app/api/players");
        // const key = "38078f25-8213-4907-9dee-f0a3e5d3791d";
        // var params = {page:11, limit:5};
        // url.search = new URLSearchParams(params).toString();
        // try{
        //     const response = await fetch(url,{
        //         method:"GET",
        //         withCredentials: true,
        //         headers:{
        //             "X-Auth-Token":key,
        //             "Content-Type": "application/json"
        //         }
        //     })
        //     const data = await response.json();
        //     console.log(data);
        // }
        // catch(error)
        // {
        //     console.log("Error: "+error);
        // }
            // return data.items; 
        const data = require('../data.json');
        // console.log("Page is "+ page);
        // console.log("Dataa: "+ data);
        return data;
    }
    else if(props.type == 2)
    {
        const {url,firstName,lastName} = props;
       try{
           const urlTofetch = url+firstName+"%20"+lastName;
           console.log(urlTofetch);
           const response = await fetch(urlTofetch);
           const Data = await response.json();
           //console.log(Data);
           return Data; 
       }
       catch(error){
           console.log("Error: "+error);
       }
    }    
}
