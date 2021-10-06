const Initialstate = {
    FutDBList:[],
    CardList:[],
    FavList:[],
    currentPlayer:{},
    Loading:true,
    Counter:0,
    error:""
}


export const reducer = (state = Initialstate,action) => {
    if(action.type == 'FetchedListInProgress')
    {
        return {...state,Loading:true}
    }
    else if(action.type == "FetchedListSuccessful")
    {
        return {...state,Loading:false,FutDBList:action.payload}
    }
    else if(action.type == "FetchedListFailed")
    {
        console.log(action.payload);
        return {...state,error:action.payload}
    }
    else if(action.type === "IncrementCounter")
    {
        return {...state, Counter: state.Counter+1}
    }
    else if(action.type === "ResetCounter")
    {
        return {...state,Counter:0}
    }
    else if(action.type === "PushItem")
    {
        return {...state,CardList:[...state.CardList,action.payload]}
    }
    else if(action.type === "AddToFav")
    {
        return {...state,FavList:[...state.FavList,action.payload]}
    }
    else if(action.type === "ClearList")
    {
        return {...state,CardList:[]}
    }
    else if(action.type === "construct")
    {
        return {...state,currentPlayer:{...state.currentPlayer}}
    }
    else if(action.type === "removeItem")
    {
        return {...state,FavList: state.FavList.filter((item) => item.id != action.payload)}
    }
    else{
        return state;
    }
}

// export default reducer;