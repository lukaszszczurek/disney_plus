
import './App.css';
import Header from "./components/Header"
import Login from "./components/Login"
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Home from "./components/Home";
import Detail from "./components/Detail";
import Search from "./components/Search";

import {useEffect, useState} from "react";


import {useSelector} from "react-redux";
import {selectUsername, selectUserPhoto} from "./components/user/userSlice";
import Video from "./components/Video";
import EditUser from "./menagement/EditUser";
import WatchList from "./components/WatchList";
import {wait} from "@testing-library/user-event/dist/utils";
import Ratings from "./components/Ratings";


function App() {

    const userPhoto = useSelector(selectUserPhoto);
    const userName= useSelector(selectUsername);

    let  Loggin ;
    const [Logged,setLogged] = useState(true);
    useEffect(()=>{

        //
        // if(userPhoto){
        //     setLogged(true);
        // }
        // else if(!userPhoto){
        //
        //     setLogged(true)
        // }
        //
        // console.log("XQQ" + Logged)
        // console.log("XQ" + userPhoto)

    },)


  return (

    <div className="App">
      <BrowserRouter>
          <Header/>

        <Routes>

          <Route exact path="/" element={<Login/>}/>


            <Route path="/search" element={/*Logged ?*/ <Search/> /*: <Navigate replace to={"/"}/>*/}/>
            <Route path="/home" element={ <Home/>}/>
            <Route path="/e4e5" element={<EditUser/>}/>
             <Route path="/detail/:id" element={ <Detail/> }/>
                <Route path="/video/:id" element={ <Video/>} />
                <Route path="/watchlist" element={ <WatchList/> }/>
            <Route path="/ratings" element={<Ratings/>}/>

        </Routes>

      </BrowserRouter>

    </div>
  );
}

export default App;
