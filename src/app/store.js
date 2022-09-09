import {configureStore,getDefaultMiddleware} from "@reduxjs/toolkit";

import userReducer from "../components/user/userSlice"
import movieReducer from '../components/moviestowatch/movieSlice'



export default configureStore({
    reducer:{
        user:userReducer,
        movie:movieReducer,
    },
    middleware:getDefaultMiddleware({
        serializableCheck:false,
    }),
});