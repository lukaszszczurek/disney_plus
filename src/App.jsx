
import './App.css';
import Header from "./components/Header"
import Login from "./components/Login"
import {BrowserRouter,Routes,Route} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Header/>
        <Routes>
          <Route exact path="/" element={<Login/>}/>







        </Routes>

      </BrowserRouter>

    </div>
  );
}

export default App;
