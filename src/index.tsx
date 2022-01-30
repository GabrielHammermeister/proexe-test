import { render } from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { EditPage } from "./pages/EditPage/EditPage";
import { HomePage } from "./pages/HomePage/HomePage";

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/home' element={<HomePage/>}/>
      <Route path='/edit' element={<EditPage/>}/>
    </Routes>
  </BrowserRouter>
, rootElement);