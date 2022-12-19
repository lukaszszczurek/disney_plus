
import './App.css';
import Header from "./components/Header"
import Login from "./components/Login"
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from "./components/Home";
import Detail from "./components/Detail";
import {USER_ACCESS,setUSER_ACCESS} from "./components/user/UserDataAccess";

function App(props) {

  return (
    <div className="App">
      <BrowserRouter>
          <Header />
        <Routes>


                <Route exact path="/"  element={<Login/>}/>
            <Route path="/home" element={<Home/>}/>
             <Route path="/detail/:id" element={<Detail/>}/>







        </Routes>

      </BrowserRouter>

    </div>
  );
}

export default App;
