import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {Navbar} from './components'
import {CKE,Main,About} from './page'
function App() {

    return (
        <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Main/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/cke" element={<CKE/>}/>
          <Route path="*" element={<Navigate replace to='/about' />}/>
        </Routes>
        </BrowserRouter>
    );
}

export default App;
