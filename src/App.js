import { Routes, Route} from "react-router-dom";
import './App.css';
import Detail from "./pages/Detail";
import Main from "./pages/Main";

function App() {
    return (  
    <>       
      <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/:param" element={<Detail />} />
      </Routes>
    </> 
    )
  }

export default App

//  25/12/2022 done getting name
//  to-do
//  get price
//  button
//  26/12/2022 can get price value but cannot
