import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {Main} from './skin/page/main'
import {Navbar} from './skin/header'
function App() {

    return (
        <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Main/>}/>
          <Route path="/" element={<Main/>}/>
          <Route path="/" element={<Main/>}/>
        </Routes>
        </BrowserRouter>
    );
}

export default App;
