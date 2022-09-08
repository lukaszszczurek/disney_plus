import {createSlice} from "@reduxjs/toolkit";
import newdisney from "../Newdisney";


const initialState={
    recommended:null,
    newdisney:null,
    original:null,
    trending:null,



};

const movieSlice=createSlice({
    name:'movie',
    initialState,
    reducers:{
        setMovies:(state,action)=>{
            state.recommended=action.payload.recommended;
            state.newdisney=action.payload.newdisney;
            state.original=action.payload.original;
            state.trending=action.payload.trending;
        },

    },
});

export const {setMovies}=movieSlice.actions;

export const selectRecommend=state=>state.recommended;
export  const selectNewdisney=state=>state.newdisney;
export  const selectOriginals=state=>state.original;
export const selectTrending=state=>state.trending;

export default movieSlice.reducer;
