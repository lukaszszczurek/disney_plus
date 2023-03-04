import {createSlice} from "@reduxjs/toolkit";



const initialState={
    recommended:null,
    newdisney:null,
    original:null,
    trending:null,
    allMovies:null,

};

const movieSlice=createSlice({
    name:'movie',
    initialState,
    reducers:{
        setMovies:(state,action)=>{
            state.recommended=action.payload.recommend;
            state.newdisney=action.payload.newDisney;
            state.original=action.payload.original;
            state.trending=action.payload.trending;
            state.allMovies=action.payload.allMovies;
        },

    },
});

export const {setMovies}=movieSlice.actions;

export const selectRecommend=state=>state.movie.recommended;
export  const selectNewdisney=state=>state.movie.newdisney;
export  const selectOriginals=state=>state.movie.original;
export const selectTrending=state=>state.movie.trending;
export const selectAllMovies=state=>state.movie.allMovies;

export default movieSlice.reducer;
