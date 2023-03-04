import {configureStore,getDefaultMiddleware} from "@reduxjs/toolkit";

import userReducer from "../components/user/userSlice"
import movieReducer from '../components/moviestowatch/movieSlice'
import userDataReducer from "../components/user/UserDataAccess";





export default configureStore({
    reducer:{
        user:userReducer,
        movie:movieReducer,
        userData:userDataReducer,
    },
    middleware:getDefaultMiddleware({
        serializableCheck:false,
    }),
});