import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {Main} from './page/main'
import {Navbar} from './components/header'
import {TinyMce} from './page/mce'
import { CKE } from "./page/ckeditor";
function App() {

    return (
        <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/jodit" element={<Main/>}/>
          <Route path="/mce" element={<TinyMce/>}/>
          <Route path="/cke" element={<CKE/>}/>
          <Route path="/" element={<Navigate replace to='/about' />}/>
        </Routes>
        </BrowserRouter>
    );
}

export default App;
