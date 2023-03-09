
import './App.css';
import Header from "./components/Header"
import Login from "./components/Login"
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from "./components/Home";
import Detail from "./components/Detail";
import Search from "./components/Search";

import {useEffect} from "react";


import {useSelector} from "react-redux";
import {selectUserPhoto} from "./components/user/userSlice";
import Video from "./components/Video";
import EditUser from "./menagement/EditUser";
import WatchList from "./components/WatchList";


function App() {
    let Loggin;
    const userPhoto = useSelector(selectUserPhoto);
    useEffect(()=>{
       Loggin = true;
    },[userPhoto])
  return (

    <div className="App">
      <BrowserRouter>
          <Header/>

        <Routes>
          <Route exact path="/" element={<Login/>}/>
            <Route path="/search" element={<Search/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/e4e5" element={<EditUser/>}/>
             <Route path="/detail/:id" element={<Detail/>}/>
                <Route path="/video/:id" element={<Video/>}/>
                <Route path="/watchlist" element={<WatchList/>}/>

        </Routes>

      </BrowserRouter>

    </div>
  );
}

export default App;
