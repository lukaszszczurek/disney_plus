
import './App.css';
import Header from "./components/Header"
import Login from "./components/Login"
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from "./components/Home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Header/>
        <Routes>
          <Route exact path="/" element={<Login/>}/>
            <Route path="/home" element={<Home/>}/>







        </Routes>

      </BrowserRouter>

    </div>
  );
}

export default App;
